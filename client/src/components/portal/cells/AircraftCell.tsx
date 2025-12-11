import type { Aircraft } from "../../../types/Aircraft";

interface Props {
  data: Aircraft;
  onUpdate: (data: Aircraft) => void;
  onDelete: (id: string) => void;
}

export default function AircraftCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Aircraft ID: {data.aircraftID}</h2>
          <p className="text-sm text-gray-600 font-mono">{data.aircraftType}</p>
        </div>

        <button 
          onClick={() => onUpdate(data)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(data.aircraftID)}
          className="bg-gray-100 hover:bg-red-300 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition"
        >
          Delete
        </button>
      </div>

      <div className="text-sm text-gray-700 mt-2">
        <p><span className="font-semibold">Capacity:</span> {data.maxCapacity}</p>
        <p><span className="font-semibold">Location:</span> {data.currentLocation}</p>
      </div>

      {data.flights && data.flights.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
           <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active Flights</p>
           <ul className="list-disc list-inside text-sm text-gray-600">
            {data.flights.map((f) =>
              <li key={f.flightGuid}>
                Flight {f.flightGuid}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}