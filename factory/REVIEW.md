# Review Standards

What "good" looks like, per artifact. This is the bar the agents build to and
the checklist the operator (and the judging council) reviews against. A ticket
does not reach `review` until its artifact clears the relevant section here.

## The house rule: no generic AI aesthetic

This applies to every visual artifact — sites, logos, cards, social, and the hub
itself. It is a hard requirement, not a finishing touch.

**Banned by default** (allowed only with a specific, defended reason):

- Inter / Roboto / Arial / system-font-only typography.
- Purple-to-blue gradients on white or near-black.
- Centered-hero → three-feature-cards → CTA-band, in that generic order.
- Emoji as iconography.
- Rounded-everything with soft drop shadows and no point of view.
- Stock-y abstract blobs and gradient meshes standing in for real imagery.

**Required:**

- A real point of view chosen by an art director for *this* business — type,
  color, and layout that suit the actual customer, not a template.
- Color decisions with intent (a defended palette), not a hue picked at random.
- Type pairing that means something (why this heading face, why this body).
- At least one unexpected, considered move per business — a layout idea, a
  type treatment, a motion detail — that a template would never produce.

If a reviewer's first reaction is "this looks AI-generated," it fails. Send it
back with `changes_requested`.

## Website

- `npm run build` passes clean. `npx tsc --noEmit` clean. No console errors.
- Mobile-first: legible and usable at 375px wide; nothing overflows horizontally.
- The three fixed pages exist and are real: home, about, and one conversion page
  (book / contact / inquire / order) wired to a working API route.
- Offerings are concrete — real services, real prices where the business shows
  them — not lorem placeholders.
- Every page has its own `metadata` (title + description). OpenGraph set.
- Design tokens are **role-named** in `tailwind.config.ts` (`brand`, `accent`,
  `surface`, `ink`, `line`), never color-named. A rebrand must be a config edit,
  not a find-and-replace across JSX.
- The anti-generic-AI bar above is met.

## Copy

- Written to the brand voice defined in the business's brand system (3 adjectives,
  do/don't). Consistent across site, cards, and social.
- No filler, no "in today's competitive landscape," no hedging on real claims.
- Specific: names the real customer, the real problem, the real offer.
- Business-card copy fits a card — name, one line of what they do, the contact
  method that actually works, nothing crammed.

## Logo

- Delivered as SVG (vector, scalable) plus a rendered PNG.
- Works in one color and in reverse (on dark and on light).
- Legible at favicon size (16px) and on a sign.
- A real idea, not a generated wordmark in a default font.

## Business-card mockup

- Front and back, at real card proportions (3.5 × 2 in, with bleed noted).
- Uses the business's actual logo, palette, and type.
- Delivered as a renderable file (SVG/HTML) that exports to print-ready PDF.
- Contact details are real and correct.

## Social

- Sized for the platforms that fit *this* business (skip the ones that don't).
- On-brand with the site and cards — same voice, same visual system.
- Copy is postable as-is, not a description of what to post.

## Formation documents

- Real, usable drafts — entity-type recommendation with reasoning, articles of
  incorporation, ownership/member docs.
- **Every page watermarked UNFILED DRAFT.**
- State-specific: correct filing office, correct fee, correct process for the
  business's actual location.
- Routed through the `file` gate. Never presented as filed or file-ready without
  the operator taking it to an actual filing.

## Whole-business (the judging council's view)

Before a business is called ready, the council asks:

- Is the offer real and is there evidence someone wants it?
- Does the funnel hang together — site, copy, cards, social all one brand?
- Is the money path honest — is there a plausible way this makes money, priced to
  market?
- What would make this fail, and is that addressed or at least named?
- Would a stranger landing on the site understand what it is in five seconds?

A go/no-go, with reasons. "No" is a valid and useful verdict — most ideas should
die at judging, not after a build.
