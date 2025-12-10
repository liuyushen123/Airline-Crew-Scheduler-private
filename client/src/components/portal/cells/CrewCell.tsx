import type { CrewMember } from "../../../types/CrewMember";

interface Props {
  data: CrewMember;
  onUpdate: (data: CrewMember) => void;
  onDelete: (id: string) => void;
}

export default function CrewCell({ data, onUpdate, onDelete }: Props) {
  const { name, role, location, crewMemberId, jobHistory } = data;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-400 font-mono">ID: {crewMemberId}</p>
        </div>
        <span className='px-2 py-1 rounded text-xs font-semibold border bg-purple-50 text-purple-700 border-purple-200'>
          {role}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="font-medium">Current Location:</span>
        <span>{location}</span>
      </div>

      <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">

        <button 
          onClick={() => onUpdate(data)}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-semibold"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(data.crewMemberId)}
          className="bg-gray-100 hover:bg-red-300 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition"
        >
          Delete
        </button>
        
        {jobHistory && jobHistory.length > 0 ? (
          <div className="text-right">
            <span className="text-lg font-bold text-gray-800">{jobHistory.length}</span>
            <span className="text-xs text-gray-500 ml-1">flights</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">No history</span>
        )}
      </div>
    </div>
  );
}