import type { Aircraft } from "../../../types/Aircraft";

interface Props {
  data: Aircraft;
  onUpdate: (data: Aircraft) => void;
  onDelete: (id: string) => void;
}

export default function AircraftCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200/80 rounded-xl p-4 bg-white/95 shadow-md flex flex-col gap-2 hover:shadow-lg hover:-translate-y-[1px] hover:bg-white transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Aircraft ID: {data.aircraftId}
          </h2>
          <p className="text-sm text-gray-500 font-mono">{data.aircraftType}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.aircraftId)}
            className="bg-gray-100 hover:bg-red-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 mt-2">
        <p><span className="font-semibold">Capacity:</span> {data.maxCapacity}</p>
        <p><span className="font-semibold">Location:</span> {data.currentLocation}</p>
      </div>

      {data.flights?.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active Flights</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {data.flights.map((f) => (
              <li key={f.flightGuid}>Flight {f.flightGuid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
