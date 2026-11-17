
import { NextRequest, NextResponse } from "next/server";

import {
  GALLERY_BATCH_SIZE,
  getGalleryBatch,
} from "@/lib/photo-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const offsetParam =
    request.nextUrl.searchParams.get("offset") ?? "0";

  if (!/^\d+$/.test(offsetParam)) {
    return NextResponse.json(
      { error: "Invalid gallery offset." },
      { status: 400 }
    );
  }

  const offset = Number(offsetParam);

  if (
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return NextResponse.json(
      { error: "Invalid gallery offset." },
      { status: 400 }
    );
  }

  try {
    const result = await getGalleryBatch(
      offset,
      GALLERY_BATCH_SIZE
    );

    return NextResponse.json(result, {
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Gallery batch error:", error);

    return NextResponse.json(
      { error: "Unable to load gallery photos." },
      { status: 500 }
    );
  }
}
