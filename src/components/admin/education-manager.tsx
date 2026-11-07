"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createEducation,
  deleteEducation,
  moveEducation,
  updateEducation,
} from "@/actions/education";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { educationSchema } from "@/lib/validations/resume";
import type { EducationInput } from "@/lib/validations/resume";
import { DeleteButton } from "./delete-button";
import { Field } from "./field";
import { FormDialog } from "./form-dialog";
import { FormFooter } from "./form-footer";
import { ItemRow } from "./item-row";
import { MoveButtons } from "./move-buttons";
import { applyFieldErrors, useServerAction } from "./use-server-action";

type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  startYear: number;
  endYear: number | null;
};

function EducationForm({
  initial,
  onDone,
}: {
  initial?: EducationItem;
  onDone: () => void;
}) {
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: initial?.institution ?? "",
      degree: initial?.degree ?? "",
      startYear: initial ? String(initial.startYear) : "",
      endYear: initial?.endYear ? String(initial.endYear) : "",
    },
  });

  const onSubmit = handleSubmit((values) =>
    run(
      () =>
        initial ? updateEducation(initial.id, values) : createEducation(values),
      {
        success: initial ? "Education updated" : "Education added",
        onSuccess: onDone,
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Degree" htmlFor="degree" error={errors.degree?.message}>
        <Input id="degree" {...register("degree")} />
      </Field>
      <Field
        label="Institution"
        htmlFor="institution"
        error={errors.institution?.message}
      >
        <Input id="institution" {...register("institution")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Start year"
          htmlFor="startYear"
          error={errors.startYear?.message}
        >
          <Input
            id="startYear"
            inputMode="numeric"
            placeholder="2019"
            {...register("startYear")}
          />
        </Field>
        <Field
          label="End year"
          htmlFor="endYear"
          error={errors.endYear?.message}
          hint="Leave empty if ongoing."
        >
          <Input
            id="endYear"
            inputMode="numeric"
            placeholder="2023"
            {...register("endYear")}
          />
        </Field>
      </div>
      <FormFooter pending={pending} submitLabel="Save" onCancel={onDone} />
    </form>
  );
}

export function EducationManager({ items }: { items: EducationItem[] }) {
  return (
    <div className="space-y-4">
      <FormDialog
        title="Add education"
        trigger={(open) => (
          <Button type="button" onClick={open}>
            <Plus /> Add education
          </Button>
        )}
      >
        {(close) => <EducationForm onDone={close} />}
      </FormDialog>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No education yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <ItemRow
              key={item.id}
              title={item.degree}
              subtitle={`${item.institution} · ${item.startYear} – ${item.endYear ?? "Present"}`}
              actions={
                <>
                  <MoveButtons
                    name={item.degree}
                    isFirst={i === 0}
                    isLast={i === items.length - 1}
                    onMove={(dir) => moveEducation(item.id, dir)}
                  />
                  <FormDialog
                    title="Edit education"
                    trigger={(open) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${item.degree}`}
                        onClick={open}
                      >
                        <Pencil />
                      </Button>
                    )}
                  >
                    {(close) => <EducationForm initial={item} onDone={close} />}
                  </FormDialog>
                  <DeleteButton
                    name={item.degree}
                    onDelete={() => deleteEducation(item.id)}
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
