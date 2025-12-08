import type { CommercialFlight } from "../../../types/CommercialFlight";


const formatTime = (dateString: string | null) => {
  if (!dateString) return <span className="text-gray-400 italic">--:--</span>;
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


export default function FlightCell({ data, onUpdate }: { data: CommercialFlight, onUpdate: (data: CommercialFlight) => void }) {
  return (
    <div className="border-b border-gray-300 p-4 flex flex-col gap-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-blue-900">
            {data.origin} <span className="text-gray-400 mx-2">✈</span> {data.destination}
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Flight {data.flightGuid}</p>
        </div>
        <div className="text-right">
           <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-mono">
             {data.aircraftId}
           </span>
           {data.plane && (
             <p className="text-xs text-gray-500 mt-1">Loc: {data.plane.currentLocation}</p>
           )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-3 rounded-md text-sm">
        <div>
          <h3 className="font-semibold text-gray-600 mb-2 border-b border-gray-300 pb-1">Departure</h3>
          <div className="grid grid-cols-[60px_1fr] gap-y-1">
            <span className="text-gray-500">Sched:</span>
            <span>{formatTime(data.schedTakeoff)}</span>
            
            <span className="text-gray-500">Est:</span>
            <span>{formatTime(data.estTakeoff)}</span>
            
            <span className="text-green-700 font-medium">Act:</span>
            <span className="text-green-700 font-medium">{formatTime(data.actTakeoff)}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-2 border-b border-gray-300 pb-1">Arrival</h3>
          <div className="grid grid-cols-[60px_1fr] gap-y-1">
            <span className="text-gray-500">Sched:</span>
            <span>{formatTime(data.schedTouchdown)}</span>
            
            <span className="text-gray-500">Est:</span>
            <span>{formatTime(data.estTouchdown)}</span>
            
            <span className="text-blue-700 font-medium">Act:</span>
            <span className="text-blue-700 font-medium">{formatTime(data.actTouchdown)}</span>
          </div>
        </div>
      </div>

      {data.crewAssignments && data.crewAssignments.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Crew Manifest</h4>
          <ul className="list-disc list-inside bg-white p-2 border rounded border-gray-100">
            {data.crewAssignments.map((assignment, index) => (
              <li key={index} className="text-sm text-gray-700">
                Crew ID: {assignment.crewMemberId} <span className="text-gray-400">({assignment.roleOnFlight})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}