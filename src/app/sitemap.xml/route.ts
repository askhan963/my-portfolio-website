import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo/site";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(
  loc: string,
  lastmod: Date | string,
  changefreq: string,
  priority: string
): string {
  const modified =
    lastmod instanceof Date ? lastmod.toISOString() : new Date(lastmod).toISOString();

  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${modified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const projects = await prisma.project.findMany({
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const entries = [
    urlEntry(SITE_URL, new Date(), "weekly", "1.0"),
    ...projects.map((project) =>
      urlEntry(
        `${SITE_URL}/projects/${project.id}`,
        project.updatedAt,
        "monthly",
        "0.7"
      )
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
