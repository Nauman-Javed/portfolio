import { RiLoader4Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export function FormFooter({
  pending,
  submitLabel,
  onCancel,
}: {
  pending: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={pending}
        >
          Cancel
        </Button>
      )}
      <Button type="submit" disabled={pending}>
        {pending && <RiLoader4Line className="animate-spin" />}
        {submitLabel}
      </Button>
    </div>
  );
}
