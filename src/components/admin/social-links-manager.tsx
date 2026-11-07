"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createSocialLink,
  deleteSocialLink,
  moveSocialLink,
  updateSocialLink,
} from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socialLinkSchema } from "@/lib/validations/profile";
import type { SocialLinkInput } from "@/lib/validations/profile";
import { DeleteButton } from "./delete-button";
import { Field } from "./field";
import { FormDialog } from "./form-dialog";
import { FormFooter } from "./form-footer";
import { ItemRow } from "./item-row";
import { MoveButtons } from "./move-buttons";
import { applyFieldErrors, useServerAction } from "./use-server-action";

type SocialLink = { id: string; label: string; url: string };

function SocialLinkForm({
  initial,
  onDone,
}: {
  initial?: SocialLink;
  onDone: () => void;
}) {
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SocialLinkInput>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: { label: initial?.label ?? "", url: initial?.url ?? "" },
  });

  const onSubmit = handleSubmit((values) =>
    run(
      () =>
        initial
          ? updateSocialLink(initial.id, values)
          : createSocialLink(values),
      {
        success: initial ? "Link updated" : "Link added",
        onSuccess: onDone,
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field
        label="Label"
        htmlFor="label"
        error={errors.label?.message}
        hint="For example GitHub or LinkedIn."
      >
        <Input id="label" {...register("label")} />
      </Field>
      <Field label="URL" htmlFor="url" error={errors.url?.message}>
        <Input id="url" placeholder="https://" {...register("url")} />
      </Field>
      <FormFooter pending={pending} submitLabel="Save" onCancel={onDone} />
    </form>
  );
}

export function SocialLinksManager({ links }: { links: SocialLink[] }) {
  return (
    <div className="space-y-4">
      <FormDialog
        title="Add social link"
        trigger={(open) => (
          <Button type="button" variant="outline" onClick={open}>
            <Plus /> Add link
          </Button>
        )}
      >
        {(close) => <SocialLinkForm onDone={close} />}
      </FormDialog>

      {links.length === 0 ? (
        <p className="text-muted-foreground text-sm">No links yet.</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link, i) => (
            <ItemRow
              key={link.id}
              title={link.label}
              subtitle={link.url}
              actions={
                <>
                  <MoveButtons
                    name={link.label}
                    isFirst={i === 0}
                    isLast={i === links.length - 1}
                    onMove={(dir) => moveSocialLink(link.id, dir)}
                  />
                  <FormDialog
                    title="Edit social link"
                    trigger={(open) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${link.label}`}
                        onClick={open}
                      >
                        <Pencil />
                      </Button>
                    )}
                  >
                    {(close) => (
                      <SocialLinkForm initial={link} onDone={close} />
                    )}
                  </FormDialog>
                  <DeleteButton
                    name={link.label}
                    onDelete={() => deleteSocialLink(link.id)}
                  />
                </>
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
