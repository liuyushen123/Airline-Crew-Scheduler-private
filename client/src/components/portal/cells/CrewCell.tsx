import type { CrewMember } from "../../../types/CrewMember";

interface Props {
  data: CrewMember;
  onUpdate: (data: CrewMember) => void;
  onDelete: (id: string) => void;
}

export default function CrewCell({ data, onUpdate, onDelete }: Props) {
  const { name, role, location, crewMemberId, jobHistory } = data;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-fg-primary)]">{name}</h3>
          <p className="text-xs text-[var(--color-fg-muted)] font-mono">ID: {crewMemberId}</p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          {role}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-[var(--color-fg-secondary)]">
        <span className="font-semibold text-[var(--color-fg-primary)]">Current Location:</span>
        <span>{location}</span>
      </div>

      <div className="pt-3 border-t border-[var(--color-border)] flex justify-between items-center">
        <button
          onClick={() => onUpdate(data)}
          className="text-sm font-semibold text-[var(--color-accent-primary)] hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(data.crewMemberId)}
          className="h-9 px-4 rounded-full text-xs font-semibold bg-white text-red-700 border border-red-200 hover:bg-red-50 transition"
        >
          Delete
        </button>

        {jobHistory && jobHistory.length > 0 ? (
          <div className="text-right">
            <span className="text-lg font-bold text-[var(--color-fg-primary)]">{jobHistory.length}</span>
            <span className="text-xs text-[var(--color-fg-muted)] ml-1">flights</span>
          </div>
        ) : (
          <span className="text-xs text-[var(--color-fg-muted)] italic">No history</span>
        )}
      </div>
    </div>
  );
}
