import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { signUpload } from "@/lib/cloudinary";

export async function POST() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(signUpload(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Uploads are not configured" },
      { status: 500 },
    );
  }
}
