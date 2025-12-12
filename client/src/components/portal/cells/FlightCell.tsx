import type { CommercialFlight } from "../../../types/CommercialFlight";

const formatTime = (dateString: string | null) => {
  if (!dateString) return <span className="text-gray-400 italic">--:--</span>;
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface Props {
  data: CommercialFlight;
  onUpdate: (data: CommercialFlight) => void;
  onDelete: (id: string) => void;
}

export default function FlightCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200/80 rounded-xl p-4 bg-white/95 shadow-md flex flex-col gap-4 hover:shadow-lg hover:-translate-y-[1px] hover:bg-white transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-blue-900 flex items-center gap-2">
            {data.origin} <span className="text-gray-400 text-sm">✈</span> {data.destination}
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Flight {data.flightGuid}
          </p>
        </div>

        <div className="flex flex-col gap-1 items-end">
          <button
            onClick={() => onUpdate(data)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.flightGuid)}
            className="bg-gray-100 hover:bg-red-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>

          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-mono">
            {data.aircraftId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-md text-sm border border-gray-100">
        <div>
          <h3 className="font-semibold text-gray-600 mb-2 border-b border-gray-200 pb-1">
            Departure
          </h3>
          <div className="grid grid-cols-[50px_1fr] gap-y-1">
            <span className="text-gray-400 text-xs uppercase">Sched</span>
            <span>{formatTime(data.schedTakeoff)}</span>

            <span className="text-gray-400 text-xs uppercase">Est</span>
            <span>{formatTime(data.estTakeoff)}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-2 border-b border-gray-200 pb-1">
            Arrival
          </h3>
          <div className="grid grid-cols-[50px_1fr] gap-y-1">
            <span className="text-gray-400 text-xs uppercase">Sched</span>
            <span>{formatTime(data.schedTouchdown)}</span>

            <span className="text-gray-400 text-xs uppercase">Est</span>
            <span>{formatTime(data.estTouchdown)}</span>
          </div>
        </div>
      </div>

      {data.crewAssignments?.length > 0 && (
        <div className="mt-1">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Crew Manifest</h4>
          <ul className="grid grid-cols-2 gap-2">
            {data.crewAssignments.map((assignment, index) => (
              <li key={index} className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700 truncate">
                {assignment.crewMemberId}
                <span className="text-gray-400 ml-1">({assignment.roleOnFlight})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
