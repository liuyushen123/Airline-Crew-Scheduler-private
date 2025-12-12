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
    <div className="border border-bg-faded rounded-md p-4 bg-bg-secondary flex flex-col gap-2 transition-all duration-150 shadow-xs hover:shadow-md">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg-primary flex items-center gap-2">
            {data.origin} <span className="text-fg-faded text-sm"> - </span> {data.destination}
          </h3>
          <p className="text-xs text-fg-faded font-mono">Flight: {data.flightGuid}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-fg-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.flightGuid)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-accent-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-fg-secondary mt-2 space-y-1">
        <p>
          <span className="font-semibold text-fg-primary">Aircraft:</span> {data.aircraftId}
        </p>
        <p>
          <span className="font-semibold text-fg-primary">Departure:</span> {formatTime(data.schedTakeoff)}
          {data.estTakeoff && <span className="text-xs text-secondary ml-2">(Est: {formatTime(data.estTakeoff)})</span>}
        </p>
        <p>
          <span className="font-semibold text-fg-primary">Arrival:</span> {formatTime(data.schedTouchdown)}
          {data.estTouchdown && <span className="text-xs text-fg-secondary ml-2">(Est: {formatTime(data.estTouchdown)})</span>}
        </p>
      </div>

      {data.crewAssignments && data.crewAssignments.length > 0 && (
        <div className="mt-2 pt-2 border-t border-bg-faded">
          <p className="text-xs font-bold text-fg-secondary uppercase mb-1">Crew Manifest</p>
          <ul className="list-disc list-inside text-sm text-fg-faded">
            {data.crewAssignments.map((crew: FlightCrew, index: number) => (
              <li key={`${crew.crewMemberId}-${index}`}>
                <span>{crew.crewMemberId}</span>
                <span className="text-bg-secondary text-xs ml-1">({crew.roleOnFlight})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}