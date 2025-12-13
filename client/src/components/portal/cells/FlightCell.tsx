import type { CommercialFlight } from "../../../types/CommercialFlight";

const formatTime = (dateString: string | null) => {
  if (!dateString) return <span className="text-[var(--color-fg-muted)] italic">--:--</span>;
  return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

interface Props {
  data: CommercialFlight;
  onUpdate: (data: CommercialFlight) => void;
  onDelete: (id: string) => void;
}

export default function FlightCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col gap-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-brand-blue)] flex items-center gap-2">
            {data.origin} <span className="text-[var(--color-fg-muted)] text-sm">✈</span> {data.destination}
          </h2>
          <p className="text-xs text-[var(--color-fg-muted)] uppercase tracking-wider">
            Flight {data.flightGuid}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate(data)}
              className="h-9 px-4 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(data.flightGuid)}
              className="h-9 px-4 rounded-full text-xs font-semibold bg-white text-red-700 border border-red-200 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
            {data.aircraftId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-[var(--color-bg-muted)] p-3 rounded-xl text-sm border border-[var(--color-border)]">
        <div>
          <h3 className="font-semibold text-[var(--color-fg-secondary)] mb-2 border-b border-[var(--color-border)] pb-1">
            Departure
          </h3>
          <div className="grid grid-cols-[50px_1fr] gap-y-1">
            <span className="text-[var(--color-fg-muted)] text-xs uppercase">Sched</span>
            <span>{formatTime(data.schedTakeoff)}</span>

            <span className="text-[var(--color-fg-muted)] text-xs uppercase">Est</span>
            <span>{formatTime(data.estTakeoff)}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-fg-secondary)] mb-2 border-b border-[var(--color-border)] pb-1">
            Arrival
          </h3>
          <div className="grid grid-cols-[50px_1fr] gap-y-1">
            <span className="text-[var(--color-fg-muted)] text-xs uppercase">Sched</span>
            <span>{formatTime(data.schedTouchdown)}</span>

            <span className="text-[var(--color-fg-muted)] text-xs uppercase">Est</span>
            <span>{formatTime(data.estTouchdown)}</span>
          </div>
        </div>
      </div>

      {data.crewAssignments && data.crewAssignments.length > 0 && (
        <div className="mt-1">
          <h4 className="text-xs font-bold text-[var(--color-fg-muted)] uppercase tracking-wider mb-2">
            Crew Manifest
          </h4>
          <ul className="grid grid-cols-2 gap-2">
            {data.crewAssignments.map((assignment, index) => (
              <li
                key={index}
                className="text-xs bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-lg px-2 py-1 text-[var(--color-fg-secondary)] truncate"
              >
                {assignment.crewMemberId}{" "}
                <span className="text-[var(--color-fg-muted)] ml-1">({assignment.roleOnFlight})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
