import type { Aircraft } from "../../../types/Aircraft";

interface Props {
  data: Aircraft;
  onUpdate: (data: Aircraft) => void;
  onDelete: (id: string) => void;
}

export default function AircraftCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-fg-primary)]">
            Aircraft ID: {data.aircraftId}
          </h2>
          <p className="text-sm text-[var(--color-fg-secondary)] font-mono">{data.aircraftType}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(data)}
            className="h-9 px-4 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(data.aircraftId)}
            className="h-9 px-4 rounded-full text-xs font-semibold bg-white text-red-700 border border-red-200 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-[var(--color-fg-secondary)]">
        <p>
          <span className="font-semibold text-[var(--color-fg-primary)]">Capacity:</span> {data.maxCapacity}
        </p>
        <p>
          <span className="font-semibold text-[var(--color-fg-primary)]">Location:</span> {data.currentLocation}
        </p>
      </div>

      {data.flights && data.flights.length > 0 && (
        <div className="pt-3 border-t border-[var(--color-border)]">
          <p className="text-xs font-bold tracking-wider text-[var(--color-fg-muted)] uppercase mb-2">
            Active Flights
          </p>
          <ul className="list-disc list-inside text-sm text-[var(--color-fg-secondary)]">
            {data.flights.map((f) => (
              <li key={f.flightGuid}>Flight {f.flightGuid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
