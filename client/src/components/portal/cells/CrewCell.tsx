import type { CrewMember } from "../../../types/CrewMember";

interface Props {
  data: CrewMember;
  onUpdate: (data: CrewMember) => void;
  onDelete: (id: string) => void;
}

export default function CrewCell({ data, onUpdate, onDelete }: Props) {
  return (
    <div className="border border-bg-faded rounded-md p-4 bg-bg-secondary flex flex-col gap-3 transition-all duration-150">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg-primary">{data.name}</h3>
          <p className="text-xs text-fg-faded font-mono">ID: {data.crewMemberId}</p>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onUpdate(data)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-fg-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(data.crewMemberId)}
            className="bg-bg-secondary text-fg-secondary hover:text-fg-primary border-2 border-bg-faded hover:border-accent-faded px-3 py-1 rounded-full text-xs font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-fg-secondary mt-2">
        <p><span className="font-semibold">Current Location:</span> {data.location}</p>
        <p><span className="font-semibold">Current Role:</span> {data.role}</p>
      </div>
        
        {data.jobHistory && data.jobHistory.length > 0 && (
          <div className="text-right">
            <span className="text-lg font-bold text-fg-secondary">{data.jobHistory.length}</span>
            <span className="text-xs text-fg-faded ml-1">flights</span>
          </div>
        )}
      </div>
  );
}
