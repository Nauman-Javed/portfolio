"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MAX_GALLERY_IMAGES } from "@/lib/validations/project";
import { useImageUpload } from "./use-image-upload";
import type { UploadSession, UploadedImage } from "./use-image-upload";

export function GalleryEditor({
  session,
  value,
  onChange,
}: {
  session: UploadSession;
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, discard, progress, uploading } = useImageUpload(session);

  async function onFiles(files: FileList | null) {
    if (!files) return;
    let next = value;
    for (const file of Array.from(files).slice(
      0,
      MAX_GALLERY_IMAGES - value.length,
    )) {
      const image = await upload(file);
      if (image) {
        next = [...next, image];
        onChange(next);
      }
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((image) => (
            <li
              key={image.publicId || image.url}
              className="bg-muted border-border relative aspect-16/10 overflow-hidden rounded-lg border"
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="200px"
                className="object-cover object-top"
              />
              <button
                type="button"
                aria-label="Remove image"
                disabled={uploading}
                onClick={() => {
                  if (image.publicId) discard(image.publicId);
                  onChange(value.filter((i) => i !== image));
                }}
                className="bg-background/90 hover:bg-background absolute top-1.5 right-1.5 rounded-full p-1"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        disabled={uploading}
        onChange={(e) => void onFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        disabled={uploading || value.length >= MAX_GALLERY_IMAGES}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
        {uploading ? `Uploading ${progress}%` : "Add images"}
      </Button>
      <p className="text-muted-foreground text-xs">
        Up to {MAX_GALLERY_IMAGES} images, 8 MB each.
      </p>
    </div>
  );
}
