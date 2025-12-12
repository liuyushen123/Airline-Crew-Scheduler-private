import type { Aircraft } from "../../../types/Aircraft";

interface Props {
  data: Aircraft;
  onUpdate: (data: Aircraft) => void;
  onDelete: (id: string) => void;
}

export default function AircraftCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-bg-faded rounded-md p-4 bg-bg-secondary flex flex-col gap-2 transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg-primary">{data.aircraftType}</h3>
          <p className="text-xs text-fg-faded font-mono">ID: {data.aircraftID}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-fg-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.aircraftID)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-accent-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-fg-secondary mt-2">
        <p><span className="font-semibold">Capacity:</span> {data.maxCapacity}</p>
        <p><span className="font-semibold">Location:</span> {data.currentLocation}</p>
      </div>

      {data.flights?.length !== 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-fg-primary uppercase mb-1">Active Flights</p>
          <ul className="list-disc list-inside text-sm text-fg-secondary">
            {data.flights?.map((f) => (
              <li key={f.flightGuid}>Flight {f.flightGuid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
