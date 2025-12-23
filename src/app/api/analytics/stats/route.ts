
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "7d"; // 24h, 7d, 30d, all

  const now = new Date();
  let fromDate = new Date();

  if (range === "24h") fromDate.setDate(now.getDate() - 1);
  else if (range === "7d") fromDate.setDate(now.getDate() - 7);
  else if (range === "30d") fromDate.setDate(now.getDate() - 30);
  else fromDate = new Date(0); // All time

  try {
    const visits = await prisma.analyticsVisit.findMany({
      where: {
        createdAt: {
          gte: fromDate,
        },
      },
      select: {
        pathname: true,
        country: true,
        deviceType: true,
        createdAt: true,
      },
    });

    // Aggregations
    const totalVisits = visits.length;
    
    // Visits by Country
    const byCountry: Record<string, number> = {};
    visits.forEach((v) => {
      const c = v.country || "Unknown";
      byCountry[c] = (byCountry[c] || 0) + 1;
    });

    // Top Pages
    const byPage: Record<string, number> = {};
    visits.forEach((v) => {
      byPage[v.pathname] = (byPage[v.pathname] || 0) + 1;
    });

    // Device Breakdown
    const byDevice: Record<string, number> = {};
    visits.forEach((v) => {
      const d = v.deviceType || "desktop";
      byDevice[d] = (byDevice[d] || 0) + 1;
    });

    // Visits Over Time (for chart)
    const visitsOverTime: Record<string, number> = {};
    visits.forEach((v) => {
        const date = v.createdAt.toISOString().split('T')[0];
        visitsOverTime[date] = (visitsOverTime[date] || 0) + 1;
    });

    return NextResponse.json({
      totalVisits,
      byCountry: Object.entries(byCountry).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value),
      byPage: Object.entries(byPage).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 10),
      byDevice: Object.entries(byDevice).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value),
      visitsOverTime: Object.entries(visitsOverTime).map(([date, value]) => ({ date, value })).sort((a,b) => a.date.localeCompare(b.date))
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
