import { NextResponse } from "next/server";
import { getProject } from "@/lib/store";
import { kitToMarkdown } from "@/lib/export";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const project = getProject(params.id);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const markdown = kitToMarkdown(project);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${project.id}-starter-kit.md"`,
    },
  });
}
