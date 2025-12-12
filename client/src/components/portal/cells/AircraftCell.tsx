import type { Aircraft } from "../../../types/Aircraft";

interface Props {
  data: Aircraft;
  onUpdate: (data: Aircraft) => void;
  onDelete: (id: string) => void;
}

export default function AircraftCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200/80 rounded-md p-4 bg-slate-800 flex flex-col gap-2 transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white">{data.aircraftType}</h3>
          <p className="text-xs text-gray-400 font-mono">ID: {data.aircraftID}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-gray-400 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.aircraftID)}
            className="bg-gray-400 hover:bg-red-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <p><span className="font-semibold">Capacity:</span> {data.maxCapacity}</p>
        <p><span className="font-semibold">Location:</span> {data.currentLocation}</p>
      </div>

      {data.flights?.length !== 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active Flights</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {data.flights?.map((f) => (
              <li key={f.flightGuid}>Flight {f.flightGuid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
