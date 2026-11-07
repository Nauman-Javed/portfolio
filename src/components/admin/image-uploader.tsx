"use client";

import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "./use-image-upload";
import type { UploadSession, UploadedImage } from "./use-image-upload";

const RASTER_TYPES = "image/jpeg,image/png,image/webp,image/avif,image/gif";

export function ImageUploader({
  session,
  value,
  onChange,
  removable = false,
  invalid = false,
  compact = false,
  allowSvg = false,
}: {
  session: UploadSession;
  value: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
  removable?: boolean;
  invalid?: boolean;
  /** A small square preview, for icons rather than screenshots. */
  compact?: boolean;
  /** Accept SVG files too (used for logos and icons). */
  allowSvg?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, discard, progress, uploading } = useImageUpload(session, {
    svg: allowSvg,
  });

  async function onFile(file: File | undefined) {
    if (!file) return;
    const image = await upload(file);
    if (image) {
      if (value?.publicId) discard(value.publicId);
      onChange(image);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      <div
        className={`bg-muted relative overflow-hidden rounded-xl border ${
          compact ? "size-24" : "aspect-16/10 w-full max-w-sm"
        } ${invalid ? "border-destructive" : "border-border"}`}
      >
        {value ? (
          compact ? (
            // A plain <img>: icons are tiny and often SVG, which the Next.js
            // image optimizer doesn't serve.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value.url}
              alt="Icon preview"
              className="size-full object-contain p-3"
            />
          ) : (
            <SafeImage
              src={value.url}
              alt="Preview"
              sizes="384px"
              className="object-cover object-top"
            />
          )
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            No image
          </div>
        )}
        {uploading && (
          <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm">
            <Loader2 className="size-5 animate-spin" />
            {progress}%
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={allowSvg ? `${RASTER_TYPES},image/svg+xml` : RASTER_TYPES}
          className="sr-only"
          disabled={uploading}
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus /> {value ? "Replace image" : "Upload image"}
        </Button>
        {removable && value && (
          <Button
            type="button"
            variant="ghost"
            disabled={uploading}
            onClick={() => {
              if (value.publicId) discard(value.publicId);
              onChange(null);
            }}
          >
            <Trash2 /> Remove
          </Button>
        )}
      </div>
    </div>
  );
}
