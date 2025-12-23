
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pathname, country, userAgent, referrer } = body;

    // Parse User-Agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    await prisma.analyticsVisit.create({
      data: {
        pathname,
        country: country || "Unknown",
        deviceType: result.device.type || "desktop", // Default to desktop if undefined (common for PCs)
        browser: result.browser.name,
        os: result.os.name,
        referrer: referrer || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
