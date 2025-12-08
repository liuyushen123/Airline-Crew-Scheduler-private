import type { Aircraft } from "../../../types/Aircraft";

export default function AircraftCell({ data, onUpdate }: { data: Aircraft, onUpdate: (data: Aircraft) => void }) {
  return (
    <div className="border-b border-gray-300 p-4 flex flex-col">
      <h2 className="text-lg font-semibold">Aircraft ID: {data.aircraftId}</h2>
      <p className="text-sm">Type: {data.aircraftType}</p>
      <p className="text-sm">Capacity: {data.maxCapacity}</p>
      <p className="text-sm">Location: {data.currentLocation}</p>

      {data.flights &&
        <ul className="list-disc list-inside">
          {data.flights.map((f) =>
            <li key={f.flightGuid} className="text-sm">
              Flight ID: {f.flightGuid}
            </li>
          )}
        </ul>
      }
    </div>
  );
}