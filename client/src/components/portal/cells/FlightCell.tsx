import type { CommercialFlight } from "../../../types/CommercialFlight";
import type { FlightCrew } from "../../../types/FlightCrew";

const formatTime = (dateString: string | null) => {
  if (!dateString) return <span className="text-gray-500 italic">--:--</span>;
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface Props {
  data: CommercialFlight;
  onUpdate: (data: CommercialFlight) => void;
  onDelete: (id: string) => void;
}

export default function FlightCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200/80 rounded-md p-4 bg-slate-800 flex flex-col gap-2 transition-all duration-150 shadow-sm hover:shadow-md">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            {data.origin} <span className="text-gray-400 text-sm">➝</span> {data.destination}
          </h3>
          <p className="text-xs text-gray-400 font-mono">Flight: {data.flightGuid}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-gray-400 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.flightGuid)}
            className="bg-gray-400 hover:bg-red-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-300 mt-2 space-y-1">
        <p>
          <span className="font-semibold text-gray-200">Aircraft:</span> {data.aircraftId}
        </p>
        <p>
          <span className="font-semibold text-gray-200">Departure:</span> {formatTime(data.schedTakeoff)}
          {data.estTakeoff && <span className="text-xs text-gray-400 ml-2">(Est: {formatTime(data.estTakeoff)})</span>}
        </p>
        <p>
          <span className="font-semibold text-gray-200">Arrival:</span> {formatTime(data.schedTouchdown)}
          {data.estTouchdown && <span className="text-xs text-gray-400 ml-2">(Est: {formatTime(data.estTouchdown)})</span>}
        </p>
      </div>

      {data.crewAssignments && data.crewAssignments.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-500/30">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Crew Manifest</p>
          <ul className="list-disc list-inside text-sm text-gray-400">
            {data.crewAssignments.map((crew: FlightCrew, index: number) => (
              <li key={`${crew.crewMemberId}-${index}`}>
                <span className="text-gray-300">{crew.crewMemberId}</span>
                <span className="text-gray-500 text-xs ml-1">({crew.roleOnFlight})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}