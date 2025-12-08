import type { CrewMember } from "../../../types/CrewMember";

export default function CrewCell({ data, onUpdate }: { data: CrewMember, onUpdate: (data: CrewMember) => void }) {
  const { name, role, location, crewMemberId, jobHistory } = data;

  const isPilot = role.toLowerCase().includes("pilot");

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-400 font-mono">ID: {crewMemberId}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-semibold border ${
          isPilot 
            ? 'bg-blue-50 text-blue-700 border-blue-200' 
            : 'bg-purple-50 text-purple-700 border-purple-200'
        }`}>
          {role}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="font-medium">Current Location:</span>
        <span>{location}</span>
      </div>

      <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
          Flight Log
        </span>
        
        {jobHistory && jobHistory.length > 0 ? (
          <div className="text-right">
            <span className="text-lg font-bold text-gray-800">{jobHistory.length}</span>
            <span className="text-xs text-gray-500 ml-1">flights on record</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">No flight history</span>
        )}
      </div>
        
    </div>
  );
}