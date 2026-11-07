"use client";

import { Pencil } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { deleteProject, moveProject, setProjectFlag } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DeleteButton } from "./delete-button";
import { MoveButtons } from "./move-buttons";
import { swapNeighbour, useOptimisticList } from "./use-optimistic-list";
import { useServerAction } from "./use-server-action";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  featured: boolean;
  published: boolean;
};

function FlagSwitch({
  id,
  flag,
  checked,
  label,
}: {
  id: string;
  flag: "featured" | "published";
  checked: boolean;
  label: string;
}) {
  const { run, pending } = useServerAction();

  return (
    <label className="flex items-center gap-2 text-xs">
      <Switch
        size="sm"
        checked={checked}
        disabled={pending}
        onCheckedChange={(value) =>
          run(() => setProjectFlag(id, flag, value), {
            success: `${label} ${value ? "on" : "off"}`,
          })
        }
      />
      {label}
    </label>
  );
}

export function ProjectsManager({ projects }: { projects: ProjectRow[] }) {
  const [rows, setRows] = useOptimisticList(projects);
  if (projects.length === 0) {
    return <p className="text-muted-foreground text-sm">No projects yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {rows.map((p, i) => (
        <li
          key={p.id}
          className="border-border bg-card flex flex-wrap items-center gap-4 rounded-xl border p-3"
        >
          <div className="bg-muted relative h-14 w-20 shrink-0 overflow-hidden rounded-md">
            <SafeImage
              src={p.coverImageUrl}
              alt=""
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{p.title}</p>
            <p className="text-muted-foreground truncate font-mono text-xs">
              /projects/{p.slug}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FlagSwitch
              id={p.id}
              flag="published"
              checked={p.published}
              label="Published"
            />
            <FlagSwitch
              id={p.id}
              flag="featured"
              checked={p.featured}
              label="Featured"
            />
          </div>
          <div className="flex items-center gap-0.5">
            <MoveButtons
              name={p.title}
              isFirst={i === 0}
              isLast={i === rows.length - 1}
              onOptimistic={(dir) =>
                setRows((r) => swapNeighbour(r, p.id, dir))
              }
              onMove={(dir) => moveProject(p.id, dir)}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${p.title}`}
              nativeButton={false}
              render={<Link href={`/manage/projects/${p.id}`} />}
            >
              <Pencil />
            </Button>
            <DeleteButton name={p.title} onDelete={() => deleteProject(p.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
