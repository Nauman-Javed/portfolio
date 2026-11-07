"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { discardUpload } from "@/actions/uploads";

export type UploadedImage = { url: string; publicId: string };

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];
const SVG_TYPE = "image/svg+xml";
const MAX_BYTES = 8 * 1024 * 1024;

// Cloudinary classifies a bare <svg> file as "raw" and rejects it; an XML
// declaration makes it recognise the file as an image.
async function withXmlDeclaration(file: File) {
  const text = (await file.text()).replace(/^\uFEFF/, "");
  if (/^\s*<\?xml/i.test(text)) return file;
  return new File(
    ['<?xml version="1.0" encoding="UTF-8"?>\n' + text],
    file.name,
    {
      type: file.type,
    },
  );
}

type SignedParams = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  allowedFormats: string;
};

function sendToCloudinary(
  file: File,
  signed: SignedParams,
  onProgress: (percent: number) => void,
) {
  return new Promise<UploadedImage>((resolve, reject) => {
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", signed.apiKey);
    body.append("timestamp", String(signed.timestamp));
    body.append("signature", signed.signature);
    body.append("folder", signed.folder);
    body.append("allowed_formats", signed.allowedFormats);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
    );
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ url: data.secure_url, publicId: data.public_id });
        } else {
          reject(new Error(data?.error?.message ?? "Upload failed"));
        }
      } catch {
        reject(new Error("Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(body);
  });
}

/**
 * Tracks images uploaded in one form and not yet saved. If one is replaced or
 * removed it is deleted straight away instead of being orphaned. Call
 * markSaved() after a successful save so saved images are never deleted by a
 * later, unsaved edit.
 */
export function useUploadSession() {
  const unsaved = useRef(new Set<string>());
  const markSaved = useCallback(() => unsaved.current.clear(), []);
  return { unsaved, markSaved };
}

export type UploadSession = ReturnType<typeof useUploadSession>;

export function useImageUpload(
  session: UploadSession,
  options: { svg?: boolean } = {},
) {
  const allowSvg = options.svg ?? false;
  const [progress, setProgress] = useState<number | null>(null);
  const { unsaved } = session;

  const upload = useCallback(
    async (file: File): Promise<UploadedImage | null> => {
      const accepted = allowSvg
        ? [...ACCEPTED_TYPES, SVG_TYPE]
        : ACCEPTED_TYPES;
      if (!accepted.includes(file.type)) {
        toast.error(
          allowSvg
            ? "Choose a JPG, PNG, WebP, AVIF, GIF or SVG image."
            : "Choose a JPG, PNG, WebP, AVIF or GIF image.",
        );
        return null;
      }
      if (file.size > MAX_BYTES) {
        toast.error("That image is larger than 8 MB.");
        return null;
      }

      setProgress(0);
      try {
        const response = await fetch("/api/cloudinary/sign", {
          method: "POST",
        });
        if (!response.ok) throw new Error("Could not start the upload");
        const signed = (await response.json()) as SignedParams;

        const toSend =
          file.type === SVG_TYPE ? await withXmlDeclaration(file) : file;
        const image = await sendToCloudinary(toSend, signed, setProgress);
        unsaved.current.add(image.publicId);
        return image;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed");
        return null;
      } finally {
        setProgress(null);
      }
    },
    [unsaved, allowSvg],
  );

  const discard = useCallback(
    (publicId: string) => {
      if (unsaved.current.delete(publicId)) void discardUpload(publicId);
    },
    [unsaved],
  );

  return { upload, discard, progress, uploading: progress !== null };
}
