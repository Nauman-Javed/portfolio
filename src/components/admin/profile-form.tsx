"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/actions/profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HERO_PHRASE_MAX_LENGTH,
  HERO_PHRASES_MAX,
  profileSchema,
} from "@/lib/validations/profile";
import type { ProfileInput } from "@/lib/validations/profile";
import { arabicInput, Bilingual, BilingualHeader, Field } from "./field";
import { FormFooter } from "./form-footer";
import { applyFieldErrors, useServerAction } from "./use-server-action";

export function ProfileForm({ initial }: { initial: ProfileInput }) {
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: initial,
  });

  const onSubmit = handleSubmit((values) =>
    run(() => updateProfile(values), {
      success: "Profile saved",
      onError: (r) => applyFieldErrors(setError, r.fieldErrors),
    }),
  );

  const phrasesHint = `One phrase per line, up to ${HERO_PHRASES_MAX}, each ${HERO_PHRASE_MAX_LENGTH} characters or fewer so it fits. A single phrase shows without rotating.`;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <BilingualHeader />
      <Bilingual>
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...register("name")} />
        </Field>
        <Field
          label="Name (Arabic)"
          htmlFor="name_ar"
          error={errors.name_ar?.message}
        >
          <Input id="name_ar" {...arabicInput} {...register("name_ar")} />
        </Field>
        <Field
          label="Headline"
          htmlFor="headline"
          error={errors.headline?.message}
        >
          <Input id="headline" {...register("headline")} />
        </Field>
        <Field
          label="Headline (Arabic)"
          htmlFor="headline_ar"
          error={errors.headline_ar?.message}
        >
          <Input
            id="headline_ar"
            {...arabicInput}
            {...register("headline_ar")}
          />
        </Field>
      </Bilingual>

      <section className="border-border space-y-5 rounded-xl border p-5">
        <div>
          <h2 className="text-lg">Hero headline</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            The big text at the top of the home page: a fixed first line, then a
            second line that rotates through your phrases.
          </p>
        </div>
        <Bilingual>
          <Field
            label="First line"
            htmlFor="heroLead"
            error={errors.heroLead?.message}
            hint="Fixed text, for example “I engineer”. Leave empty to show only the rotating line."
          >
            <Input id="heroLead" {...register("heroLead")} />
          </Field>
          <Field
            label="First line (Arabic)"
            htmlFor="heroLead_ar"
            error={errors.heroLead_ar?.message}
          >
            <Input
              id="heroLead_ar"
              {...arabicInput}
              {...register("heroLead_ar")}
            />
          </Field>
          <Field
            label="Rotating line"
            htmlFor="heroPhrases"
            error={errors.heroPhrases?.message}
            hint={phrasesHint}
          >
            <Textarea id="heroPhrases" rows={5} {...register("heroPhrases")} />
          </Field>
          <Field
            label="Rotating line (Arabic)"
            htmlFor="heroPhrases_ar"
            error={errors.heroPhrases_ar?.message}
          >
            <Textarea
              id="heroPhrases_ar"
              rows={5}
              {...arabicInput}
              {...register("heroPhrases_ar")}
            />
          </Field>
        </Bilingual>
      </section>

      <Bilingual>
        <Field
          label="Summary"
          htmlFor="summary"
          error={errors.summary?.message}
          hint="Short intro shown in the hero."
        >
          <Textarea id="summary" rows={4} {...register("summary")} />
        </Field>
        <Field
          label="Summary (Arabic)"
          htmlFor="summary_ar"
          error={errors.summary_ar?.message}
        >
          <Textarea
            id="summary_ar"
            rows={4}
            {...arabicInput}
            {...register("summary_ar")}
          />
        </Field>
        <Field label="About" htmlFor="about" error={errors.about?.message}>
          <Textarea id="about" rows={8} {...register("about")} />
        </Field>
        <Field
          label="About (Arabic)"
          htmlFor="about_ar"
          error={errors.about_ar?.message}
        >
          <Textarea
            id="about_ar"
            rows={8}
            {...arabicInput}
            {...register("about_ar")}
          />
        </Field>
        <Field
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input id="location" {...register("location")} />
        </Field>
        <Field
          label="Location (Arabic)"
          htmlFor="location_ar"
          error={errors.location_ar?.message}
        >
          <Input
            id="location_ar"
            {...arabicInput}
            {...register("location_ar")}
          />
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
          label="Availability (Arabic)"
          htmlFor="availability_ar"
          error={errors.availability_ar?.message}
        >
          <Input
            id="availability_ar"
            {...arabicInput}
            {...register("availability_ar")}
          />
        </Field>
      </Bilingual>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" {...register("email")} />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone"
          error={errors.phone?.message}
          hint="Shown in the hero's code window. Leave empty to hide it."
        >
          <Input id="phone" {...register("phone")} />
        </Field>
        <Field
          label="Resume URL"
          htmlFor="resumeUrl"
          error={errors.resumeUrl?.message}
        >
          <Input id="resumeUrl" {...register("resumeUrl")} />
        </Field>
      </div>
      <FormFooter pending={pending} submitLabel="Save profile" />
    </form>
  );
}
