import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cv = await prisma.resume.findUnique({
      where: { id },
    });

    if (!cv) {
      return NextResponse.json(
        { success: false, error: "CV not found" },
        { status: 404 }
      );
    }

    const fileResponse = await fetch(cv.downloadLink);

    if (!fileResponse.ok || !fileResponse.body) {
      return NextResponse.json(
        { success: false, error: "Unable to download CV file" },
        { status: 502 }
      );
    }

    const fileName = cv.fileName || `${cv.title.replace(/[^\w.-]+/g, "_")}.pdf`;
    const contentType =
      cv.fileType || fileResponse.headers.get("content-type") || "application/octet-stream";
    const contentLength = fileResponse.headers.get("content-length");

    return new Response(fileResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName.replace(/"/g, "")}"`,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
      },
    });
  } catch (error) {
    console.error("Error downloading CV:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download CV" },
      { status: 500 }
    );
  }
}
