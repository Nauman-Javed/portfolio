"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiPencilLine, RiAddLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import {
  createExperience,
  deleteExperience,
  moveExperience,
  updateExperience,
} from "@/actions/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EMPLOYMENT_TYPES, experienceSchema } from "@/lib/validations/resume";
import type { ExperienceInput } from "@/lib/validations/resume";
import { DeleteButton } from "./delete-button";
import { Field, selectClass } from "./field";
import { FormDialog } from "./form-dialog";
import { FormFooter } from "./form-footer";
import { ItemRow } from "./item-row";
import { MoveButtons } from "./move-buttons";
import { swapNeighbour, useOptimisticList } from "./use-optimistic-list";
import { applyFieldErrors, useServerAction } from "./use-server-action";

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  bullets: string[];
};

const dateInput = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");
const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function ExperienceForm({
  initial,
  onDone,
}: {
  initial?: ExperienceItem;
  onDone: () => void;
}) {
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: initial?.company ?? "",
      role: initial?.role ?? "",
      employmentType: (EMPLOYMENT_TYPES as readonly string[]).includes(
        initial?.employmentType ?? "",
      )
        ? (initial!.employmentType as ExperienceInput["employmentType"])
        : "Full-time",
      location: initial?.location ?? "",
      startDate: dateInput(initial?.startDate ?? null),
      endDate: dateInput(initial?.endDate ?? null),
      bullets: initial?.bullets.join("\n") ?? "",
    },
  });

  const onSubmit = handleSubmit((values) =>
    run(
      () =>
        initial
          ? updateExperience(initial.id, values)
          : createExperience(values),
      {
        success: initial ? "Experience updated" : "Experience added",
        onSuccess: onDone,
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Role" htmlFor="role" error={errors.role?.message}>
        <Input id="role" {...register("role")} />
      </Field>
      <Field label="Company" htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Type"
          htmlFor="employmentType"
          error={errors.employmentType?.message}
        >
          <select
            id="employmentType"
            className={selectClass}
            {...register("employmentType")}
          >
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
          hint="City or Remote"
        >
          <Input id="location" {...register("location")} />
        </Field>
        <Field
          label="Start date"
          htmlFor="startDate"
          error={errors.startDate?.message}
        >
          <Input id="startDate" type="date" {...register("startDate")} />
        </Field>
        <Field
          label="End date"
          htmlFor="endDate"
          error={errors.endDate?.message}
          hint="Leave empty if current."
        >
          <Input id="endDate" type="date" {...register("endDate")} />
        </Field>
      </div>
      <Field
        label="Highlights"
        htmlFor="bullets"
        error={errors.bullets?.message}
        hint="One bullet point per line."
      >
        <Textarea id="bullets" rows={5} {...register("bullets")} />
      </Field>
      <FormFooter pending={pending} submitLabel="Save" onCancel={onDone} />
    </form>
  );
}

export function ExperienceManager({ items }: { items: ExperienceItem[] }) {
  const [rows, setRows] = useOptimisticList(items);
  return (
    <div className="space-y-4">
      <FormDialog
        title="Add experience"
        trigger={(open) => (
          <Button type="button" onClick={open}>
            <RiAddLine /> Add experience
          </Button>
        )}
      >
        {(close) => <ExperienceForm onDone={close} />}
      </FormDialog>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No experience yet.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((item, i) => (
            <ItemRow
              key={item.id}
              title={`${item.role} · ${item.company}`}
              subtitle={`${monthYear.format(item.startDate)} – ${item.endDate ? monthYear.format(item.endDate) : "Present"} · ${item.employmentType}`}
              actions={
                <>
                  <MoveButtons
                    name={item.role}
                    isFirst={i === 0}
                    isLast={i === rows.length - 1}
                    onOptimistic={(dir) =>
                      setRows((r) => swapNeighbour(r, item.id, dir))
                    }
                    onMove={(dir) => moveExperience(item.id, dir)}
                  />
                  <FormDialog
                    title="Edit experience"
                    trigger={(open) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${item.role}`}
                        onClick={open}
                      >
                        <RiPencilLine />
                      </Button>
                    )}
                  >
                    {(close) => (
                      <ExperienceForm initial={item} onDone={close} />
                    )}
                  </FormDialog>
                  <DeleteButton
                    name={item.role}
                    onDelete={() => deleteExperience(item.id)}
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
