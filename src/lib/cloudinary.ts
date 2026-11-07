import { v2 as cloudinary } from "cloudinary";

// Everything this app uploads lives under one folder, which also scopes what
// deleteAssets is allowed to remove.
export const UPLOAD_FOLDER = "portfolio";
export const ALLOWED_FORMATS = "jpg,jpeg,png,webp,avif,gif";

function config() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are not set");
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return { cloudName, apiKey, apiSecret };
}

/** Parameters for a direct browser upload. The secret never leaves the server. */
export function signUpload() {
  const { cloudName, apiKey, apiSecret } = config();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER, allowed_formats: ALLOWED_FORMATS },
    apiSecret,
  );
  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: UPLOAD_FOLDER,
    allowedFormats: ALLOWED_FORMATS,
  };
}

/**
 * Deletes uploaded images by public ID. Empty IDs (seeded local images) and
 * anything outside our folder are ignored. Failures are logged, not thrown:
 * a leftover file must never fail the database change that preceded it.
 */
export async function deleteAssets(
  publicIds: ReadonlyArray<string | null | undefined>,
) {
  const ids = [
    ...new Set(
      publicIds.filter(
        (id): id is string => !!id && id.startsWith(`${UPLOAD_FOLDER}/`),
      ),
    ),
  ];
  if (ids.length === 0) return;

  try {
    config();
    const results = await Promise.allSettled(
      ids.map((id) => cloudinary.uploader.destroy(id, { invalidate: true })),
    );
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Cloudinary delete failed for ${ids[i]}`, result.reason);
      }
    });
  } catch (error) {
    console.error("Cloudinary delete failed", error);
  }
}
