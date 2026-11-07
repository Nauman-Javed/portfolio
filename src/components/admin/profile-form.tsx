"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { updateProfile } from "@/actions/profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/lib/validations/profile";
import type { ProfileInput } from "@/lib/validations/profile";
import { Field } from "./field";
import { FormFooter } from "./form-footer";
import { ImageUploader } from "./image-uploader";
import { useUploadSession } from "./use-image-upload";
import { applyFieldErrors, useServerAction } from "./use-server-action";

export function ProfileForm({ initial }: { initial: ProfileInput }) {
  const session = useUploadSession();
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: initial,
  });

  const imageUrl = useWatch({ control, name: "imageUrl" });
  const imagePublicId = useWatch({ control, name: "imagePublicId" });

  const onSubmit = handleSubmit((values) =>
    run(() => updateProfile(values), {
      success: "Profile saved",
      onSuccess: () => session.markSaved(),
      onError: (r) => applyFieldErrors(setError, r.fieldErrors),
    }),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...register("name")} />
        </Field>
        <Field
          label="Headline"
          htmlFor="headline"
          error={errors.headline?.message}
        >
          <Input id="headline" {...register("headline")} />
        </Field>
      </div>
      <Field
        label="Summary"
        htmlFor="summary"
        error={errors.summary?.message}
        hint="Short intro shown in the hero."
      >
        <Textarea id="summary" rows={3} {...register("summary")} />
      </Field>
      <Field label="About" htmlFor="about" error={errors.about?.message}>
        <Textarea id="about" rows={6} {...register("about")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" {...register("email")} />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" {...register("phone")} />
        </Field>
        <Field
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input id="location" {...register("location")} />
        </Field>
        <Field
          label="Availability"
          htmlFor="availability"
          error={errors.availability?.message}
          hint="Leave empty to hide the badge."
        >
          <Input id="availability" {...register("availability")} />
        </Field>
        <Field
          label="Resume URL"
          htmlFor="resumeUrl"
          error={errors.resumeUrl?.message}
        >
          <Input id="resumeUrl" {...register("resumeUrl")} />
        </Field>
      </div>
      <Field
        label="Profile image"
        htmlFor="profileImage"
        error={errors.imageUrl?.message}
      >
        <ImageUploader
          session={session}
          removable
          value={imageUrl ? { url: imageUrl, publicId: imagePublicId } : null}
          onChange={(image) => {
            setValue("imageUrl", image?.url ?? "", { shouldDirty: true });
            setValue("imagePublicId", image?.publicId ?? "", {
              shouldDirty: true,
            });
          }}
        />
      </Field>
      <FormFooter pending={pending} submitLabel="Save profile" />
    </form>
  );
}
