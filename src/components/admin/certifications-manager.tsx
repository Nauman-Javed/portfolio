"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createCertification,
  deleteCertification,
  moveCertification,
  updateCertification,
} from "@/actions/certifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { certificationSchema } from "@/lib/validations/resume";
import type { CertificationInput } from "@/lib/validations/resume";
import { DeleteButton } from "./delete-button";
import { Field } from "./field";
import { FormDialog } from "./form-dialog";
import { FormFooter } from "./form-footer";
import { ItemRow } from "./item-row";
import { MoveButtons } from "./move-buttons";
import { applyFieldErrors, useServerAction } from "./use-server-action";

type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  date: Date | null;
  url: string | null;
};

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function CertificationForm({
  initial,
  onDone,
}: {
  initial?: CertificationItem;
  onDone: () => void;
}) {
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CertificationInput>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: initial?.name ?? "",
      issuer: initial?.issuer ?? "",
      date: initial?.date ? initial.date.toISOString().slice(0, 10) : "",
      url: initial?.url ?? "",
    },
  });

  const onSubmit = handleSubmit((values) =>
    run(
      () =>
        initial
          ? updateCertification(initial.id, values)
          : createCertification(values),
      {
        success: initial ? "Certification updated" : "Certification added",
        onSuccess: onDone,
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} />
      </Field>
      <Field label="Issuer" htmlFor="issuer" error={errors.issuer?.message}>
        <Input id="issuer" {...register("issuer")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date" htmlFor="date" error={errors.date?.message}>
          <Input id="date" type="date" {...register("date")} />
        </Field>
        <Field label="Credential URL" htmlFor="url" error={errors.url?.message}>
          <Input id="url" placeholder="https://" {...register("url")} />
        </Field>
      </div>
      <FormFooter pending={pending} submitLabel="Save" onCancel={onDone} />
    </form>
  );
}

export function CertificationsManager({
  items,
}: {
  items: CertificationItem[];
}) {
  return (
    <div className="space-y-4">
      <FormDialog
        title="Add certification"
        trigger={(open) => (
          <Button type="button" onClick={open}>
            <Plus /> Add certification
          </Button>
        )}
      >
        {(close) => <CertificationForm onDone={close} />}
      </FormDialog>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No certifications yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <ItemRow
              key={item.id}
              title={item.name}
              subtitle={`${item.issuer}${item.date ? ` · ${monthYear.format(item.date)}` : ""}`}
              actions={
                <>
                  <MoveButtons
                    name={item.name}
                    isFirst={i === 0}
                    isLast={i === items.length - 1}
                    onMove={(dir) => moveCertification(item.id, dir)}
                  />
                  <FormDialog
                    title="Edit certification"
                    trigger={(open) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${item.name}`}
                        onClick={open}
                      >
                        <Pencil />
                      </Button>
                    )}
                  >
                    {(close) => (
                      <CertificationForm initial={item} onDone={close} />
                    )}
                  </FormDialog>
                  <DeleteButton
                    name={item.name}
                    onDelete={() => deleteCertification(item.id)}
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
