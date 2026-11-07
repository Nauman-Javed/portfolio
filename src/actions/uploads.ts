"use server";

import { requireAdmin } from "@/lib/auth";
import { deleteAssets } from "@/lib/cloudinary";

// Removes an image that was uploaded in the browser but replaced or removed
// before it was ever saved, so it doesn't linger in Cloudinary.
export async function discardUpload(publicId: string) {
  await requireAdmin();
  if (typeof publicId !== "string" || publicId.length > 300) return;
  await deleteAssets([publicId]);
}
