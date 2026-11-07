"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import {
  createSkill,
  deleteSkill,
  moveSkill,
  updateSkill,
} from "@/actions/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { groupSkills } from "@/data/site-content";
import { skillSchema } from "@/lib/validations/resume";
import type { SkillInput } from "@/lib/validations/resume";
import { DeleteButton } from "./delete-button";
import { Field } from "./field";
import { FormDialog } from "./form-dialog";
import { FormFooter } from "./form-footer";
import { ImageUploader } from "./image-uploader";
import { SkillIcon } from "@/components/public/skill-icon";
import { useUploadSession } from "./use-image-upload";
import { ItemRow } from "./item-row";
import { MoveButtons } from "./move-buttons";
import { applyFieldErrors, useServerAction } from "./use-server-action";

type SkillItem = {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
  iconPublicId: string | null;
  order: number;
};

function SkillForm({
  initial,
  categories,
  onDone,
}: {
  initial?: SkillItem;
  categories: string[];
  onDone: () => void;
}) {
  const session = useUploadSession();
  const { run, pending } = useServerAction();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initial?.name ?? "",
      category: initial?.category ?? "",
      iconUrl: initial?.iconUrl ?? "",
      iconPublicId: initial?.iconPublicId ?? "",
    },
  });

  const iconUrl = useWatch({ control, name: "iconUrl" });
  const iconPublicId = useWatch({ control, name: "iconPublicId" });

  const onSubmit = handleSubmit((values) =>
    run(
      () => (initial ? updateSkill(initial.id, values) : createSkill(values)),
      {
        success: initial ? "Skill updated" : "Skill added",
        onSuccess: () => {
          session.markSaved();
          onDone();
        },
        onError: (r) => applyFieldErrors(setError, r.fieldErrors),
      },
    ),
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} />
      </Field>
      <Field
        label="Category"
        htmlFor="category"
        error={errors.category?.message}
        hint="Pick an existing category or type a new one."
      >
        <Input
          id="category"
          list="skill-categories"
          {...register("category")}
        />
        <datalist id="skill-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>
      <Field
        label="Icon (optional)"
        htmlFor="icon"
        error={errors.iconUrl?.message}
        hint="A small logo, ideally a square SVG or PNG. Shown next to the skill name. Without one, a two-letter mark is used."
      >
        <ImageUploader
          session={session}
          compact
          allowSvg
          removable
          value={iconUrl ? { url: iconUrl, publicId: iconPublicId } : null}
          onChange={(image) => {
            setValue("iconUrl", image?.url ?? "", { shouldDirty: true });
            setValue("iconPublicId", image?.publicId ?? "", {
              shouldDirty: true,
            });
          }}
        />
      </Field>
      <FormFooter pending={pending} submitLabel="Save" onCancel={onDone} />
    </form>
  );
}

export function SkillsManager({ skills }: { skills: SkillItem[] }) {
  const groups = groupSkills(skills);
  const categories = groups.map(([category]) => category);

  return (
    <div className="space-y-8">
      <FormDialog
        title="Add skill"
        trigger={(open) => (
          <Button type="button" onClick={open}>
            <Plus /> Add skill
          </Button>
        )}
      >
        {(close) => <SkillForm categories={categories} onDone={close} />}
      </FormDialog>

      {categories.length === 0 && (
        <p className="text-muted-foreground text-sm">No skills yet.</p>
      )}

      {groups.map(([category, items]) => (
        <section key={category}>
          <h2 className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
            {category}
          </h2>
          <ul className="space-y-2">
            {items.map((skill, i) => (
              <ItemRow
                key={skill.id}
                title={
                  <span className="flex items-center gap-3">
                    <SkillIcon
                      name={skill.name}
                      iconUrl={skill.iconUrl}
                      size={22}
                    />
                    {skill.name}
                  </span>
                }
                actions={
                  <>
                    <MoveButtons
                      name={skill.name}
                      isFirst={i === 0}
                      isLast={i === items.length - 1}
                      onMove={(dir) => moveSkill(skill.id, dir)}
                    />
                    <FormDialog
                      title="Edit skill"
                      trigger={(open) => (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${skill.name}`}
                          onClick={open}
                        >
                          <Pencil />
                        </Button>
                      )}
                    >
                      {(close) => (
                        <SkillForm
                          initial={skill}
                          categories={categories}
                          onDone={close}
                        />
                      )}
                    </FormDialog>
                    <DeleteButton
                      name={skill.name}
                      onDelete={() => deleteSkill(skill.id)}
                    />
                  </>
                }
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
