"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { createProject, updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/lib/validations/project";
import type { ProjectInput } from "@/lib/validations/project";
import { Field } from "./field";
import { FormFooter } from "./form-footer";
import { GalleryEditor } from "./gallery-editor";
import { ImageUploader } from "./image-uploader";
import { applyFieldErrors, useServerAction } from "./use-server-action";
import { useUploadSession } from "./use-image-upload";

const EMPTY: ProjectInput = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  techStack: "",
  coverImageUrl: "",
  coverImageId: "",
  gallery: [],
  liveUrl: "",
  githubUrl: "",
  featured: false,
  published: true,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function ProjectForm({
  projectId,
  initial,
}: {
  projectId?: string;
  initial?: ProjectInput;
}) {
  const router = useRouter();
  const session = useUploadSession();
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial ?? EMPTY,
  });

  const coverUrl = useWatch({ control, name: "coverImageUrl" });
  const coverId = useWatch({ control, name: "coverImageId" });

  const onSubmit = handleSubmit((values) =>
    run(
      () =>
        projectId ? updateProject(projectId, values) : createProject(values),
      {
        success: projectId ? "Project saved" : "Project created",
        onSuccess: () => {
          session.markSaved();
          if (!projectId) router.push("/manage/projects");
        },
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  const titleField = register("title");

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" error={errors.title?.message}>
          <Input
            id="title"
            {...titleField}
            onChange={(e) => {
              void titleField.onChange(e);
              // Suggest a slug until the slug has been edited by hand.
              if (!projectId && !dirtyFields.slug) {
                setValue("slug", slugify(e.target.value));
              }
            }}
          />
        </Field>
        <Field
          label="Slug"
          htmlFor="slug"
          error={errors.slug?.message}
          hint="Used in the URL: /projects/your-slug"
        >
          <Input id="slug" {...register("slug")} />
        </Field>
      </div>
      <Field
        label="Short description"
        htmlFor="shortDescription"
        error={errors.shortDescription?.message}
      >
        <Textarea
          id="shortDescription"
          rows={2}
          {...register("shortDescription")}
        />
      </Field>
      <Field
        label="Description"
        htmlFor="description"
        error={errors.description?.message}
        hint="Shown on the project page."
      >
        <Textarea id="description" rows={7} {...register("description")} />
      </Field>
      <Field
        label="Tech stack"
        htmlFor="techStack"
        error={errors.techStack?.message}
        hint="Comma separated: Next.js, TypeScript, Tailwind CSS"
      >
        <Input id="techStack" {...register("techStack")} />
      </Field>

      <Field
        label="Cover image"
        htmlFor="coverImage"
        error={errors.coverImageUrl?.message}
      >
        <ImageUploader
          session={session}
          invalid={!!errors.coverImageUrl}
          value={coverUrl ? { url: coverUrl, publicId: coverId } : null}
          onChange={(image) => {
            setValue("coverImageUrl", image?.url ?? "", {
              shouldDirty: true,
              shouldValidate: true,
            });
            setValue("coverImageId", image?.publicId ?? "", {
              shouldDirty: true,
            });
          }}
        />
      </Field>

      <Controller
        control={control}
        name="gallery"
        render={({ field }) => (
          <Field
            label="Gallery (optional)"
            htmlFor="gallery"
            error={errors.gallery?.message}
          >
            <GalleryEditor
              session={session}
              value={field.value}
              onChange={field.onChange}
            />
          </Field>
        )}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Live URL"
          htmlFor="liveUrl"
          error={errors.liveUrl?.message}
        >
          <Input id="liveUrl" placeholder="https://" {...register("liveUrl")} />
        </Field>
        <Field
          label="GitHub URL"
          htmlFor="githubUrl"
          error={errors.githubUrl?.message}
        >
          <Input
            id="githubUrl"
            placeholder="https://github.com/"
            {...register("githubUrl")}
          />
        </Field>
      </div>
      <div className="flex flex-wrap gap-8">
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <label className="flex items-center gap-3 text-sm">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              Published
            </label>
          )}
        />
        <Controller
          control={control}
          name="featured"
          render={({ field }) => (
            <label className="flex items-center gap-3 text-sm">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              Featured on home page
            </label>
          )}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/manage/projects" />}
        >
          Back to projects
        </Button>
        <FormFooter
          pending={pending}
          submitLabel={projectId ? "Save project" : "Create project"}
        />
      </div>
    </form>
  );
}
