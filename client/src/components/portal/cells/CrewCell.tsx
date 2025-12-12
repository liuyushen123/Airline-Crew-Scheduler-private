import type { CrewMember } from "../../../types/CrewMember";

interface Props {
  data: CrewMember;
  onUpdate: (data: CrewMember) => void;
  onDelete: (id: string) => void;
}

export default function CrewCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-gray-200/80 rounded-md p-4 bg-slate-800 flex flex-col gap-3 transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white">{data.name}</h3>
          <p className="text-xs text-gray-400 font-mono">ID: {data.crewMemberId}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-gray-400 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.crewMemberId)}
            className="bg-gray-400 hover:bg-red-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-300 mt-2">
        <p><span className="font-semibold">Current Location:</span> {data.location}</p>
        <p><span className="font-semibold">Current Role:</span> {data.role}</p>
      </div>
        
        {data.jobHistory && data.jobHistory.length > 0 && (
          <div className="text-right">
            <span className="text-lg font-bold text-gray-800">{data.jobHistory.length}</span>
            <span className="text-xs text-gray-500 ml-1">flights</span>
          </div>
        )}
      </div>
  );
}
