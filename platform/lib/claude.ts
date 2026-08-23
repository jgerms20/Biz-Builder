import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod/v4";

export const MODEL = "claude-opus-5";

let cached: Anthropic | null = null;

export function getClient(): Anthropic {
  if (!cached) {
    cached = new Anthropic();
  }
  return cached;
}

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

/* ============================================================
   OPERATING DOCTRINE
   This is the stable prefix — it never varies per request, so it
   sits ahead of the cache breakpoint and is billed at cache-read
   rates on every generation after the first.
   ============================================================ */

export const DOCTRINE = `You are the generation engine inside Biz Builder — an operating platform that takes a business idea and produces the concrete artifacts needed to actually start it.

The operator is a founder-operator who builds real businesses for real people: family members, local tradespeople, food truck owners, private chefs, bookkeepers. The output you produce gets used. Someone files it, prints it, spends money against it. Write accordingly.

## The six-phase framework

Every business the platform builds moves through six phases. Know where your output sits.

1. CONCEPT — Define what this actually is. One-sentence description, target customer, mission, the three problems solved. Deliverable: a clear written definition.
2. FORMATION — Make it official. Structure selection, name registration, EIN, business bank account, permits. Deliverable: a legally registered entity.
3. IDENTITY — Build the brand. Name, colors, typography, voice, logo direction. Deliverable: a complete, consistent brand identity.
4. DIGITAL — Get online. Domain, business email, five core website pages, social handles, Google Business Profile. Deliverable: a live web presence.
5. OPERATIONS — Run it. Pricing, payment processing, scheduling, client intake, bookkeeping. Deliverable: repeatable systems.
6. GROWTH — Get customers. Channels, content, referrals, reviews, local partnerships. Deliverable: a working acquisition motion.

## How to write

Be specific and operational. "Register your LLC" is useless; "File Articles of Organization with the SC Secretary of State at sos.sc.gov, \\$110, processing in 1–2 business days" is usable. Name real filing offices, real URLs, real dollar amounts, real timeframes. If you are not certain of a current fee or requirement, give your best figure and mark it clearly as needing verification rather than omitting it.

Default to the practical path a solo founder can actually execute, not the theoretically optimal corporate structure. Most first-time founders should form an LLC, not an S-Corp. Most should use Mercury or a local credit union, not a Big Four bank. Most should launch on a \\$12/year domain, not a rebrand.

Prices reflect current small-business market rates for the region given. When a region is not specified, assume South Carolina and the broader Southeast, and say so.

Be honest about what requires a human. Entity filings need a signature. EIN applications need a responsible party with an SSN or ITIN. Bank accounts need in-person or video KYC. Where a step cannot be automated, mark it plainly rather than implying it can be handled for the founder.

Do not pad. No filler sections, no restating the request back, no "in today's competitive landscape." Every line either tells the founder something they did not know or tells them to do something specific.

Keep responses focused. Disclaimers stay brief; the substance carries the response.

Deliver the scope asked for. Do not quietly narrow, widen, or transform it. If you think the ask is mistaken, say so in one sentence and keep going with the task as given.`;

/* ============================================================
   Generation primitive.
   Stable doctrine is cached; the per-business brief follows it.
   ============================================================ */

export interface GenerateOptions<T extends z.ZodType> {
  schema: T;
  /** Task-specific instruction. Appended after the cached doctrine. */
  instruction: string;
  /** The business brief — the volatile part. */
  brief: string;
  maxTokens?: number;
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
  /** Override the model — lets the factory route cheap work to a cheap tier. */
  model?: string;
}

export async function generate<T extends z.ZodType>({
  schema,
  instruction,
  brief,
  maxTokens = 16000,
  effort = "high",
  model = MODEL,
}: GenerateOptions<T>): Promise<z.infer<T>> {
  const client = getClient();

  const response = await client.messages.parse({
    model,
    max_tokens: maxTokens,
    // Cache breakpoint on the doctrine: identical on every call, so every
    // generation after the first reads it at ~0.1x instead of full price.
    system: [
      {
        type: "text",
        text: DOCTRINE,
        cache_control: { type: "ephemeral" },
      },
    ],
    output_config: {
      effort,
      format: zodOutputFormat(schema),
    },
    messages: [
      {
        role: "user",
        content: `${instruction}\n\n---\n\nBUSINESS BRIEF:\n\n${brief}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Generation was declined. Try rephrasing the business description.");
  }

  const parsed = response.parsed_output;
  if (!parsed) {
    throw new Error("Generation returned no structured output. Try again.");
  }

  return parsed as z.infer<T>;
}

/* ============================================================
   Research primitive — used by the opportunity scanner.
   Runs the server-side web search tool so gap-finding is grounded
   in real signal rather than the model's recall.
   ============================================================ */

export async function research(
  query: string,
  maxTokens = 16000,
  model: string = MODEL
): Promise<string> {
  const client = getClient();

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: [
      {
        type: "text",
        text: DOCTRINE,
        cache_control: { type: "ephemeral" },
      },
    ],
    output_config: { effort: "high" },
    tools: [
      { type: "web_search_20260209", name: "web_search", max_uses: 8 },
      { type: "web_fetch_20260209", name: "web_fetch", max_uses: 5 },
    ],
    messages: [{ role: "user", content: query }],
  });

  // Server-side tools can pause the turn at the iteration limit; resume.
  let current = response;
  let guard = 0;
  const history: Anthropic.MessageParam[] = [
    { role: "user", content: query },
  ];

  while (current.stop_reason === "pause_turn" && guard < 4) {
    history.push({ role: "assistant", content: current.content });
    current = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: [
        { type: "text", text: DOCTRINE, cache_control: { type: "ephemeral" } },
      ],
      output_config: { effort: "high" },
      tools: [
        { type: "web_search_20260209", name: "web_search", max_uses: 8 },
        { type: "web_fetch_20260209", name: "web_fetch", max_uses: 5 },
      ],
      messages: history,
    });
    guard += 1;
  }

  if (current.stop_reason === "refusal") {
    throw new Error("Research request was declined.");
  }

  return current.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}
