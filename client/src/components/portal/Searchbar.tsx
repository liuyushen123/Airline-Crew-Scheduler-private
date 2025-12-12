interface Props {
  searchTerm: 'crew' | 'flight' | 'aircraft';
  setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void;
  onOpenCreate: () => void;
}

export default function Searchbar({ searchTerm, setSearchTerm, onOpenCreate }: Props) {
  return (
    <div className="w-full bg-[#050816] rounded-xl shadow-sm border border-red-500/25 flex flex-row items-center justify-between px-4 md:px-6 py-3 text-gray-100">
      
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-400 tracking-wide">
          Filter By
        </label>
        
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value as any)}
          className="mt-1 p-2 rounded-lg bg-[#020617] border border-gray-600 text-gray-100 text-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="crew">Crew Members</option>
          <option value="flight">Flights</option>
          <option value="aircraft">Aircraft</option>
        </select>
      </div>

      <button
        onClick={onOpenCreate}
        className="bg-red-600 hover:bg-red-700 text-white transition rounded-full py-2 px-6 text-sm font-semibold shadow-sm"
      >
        + Create New
      </button>
    </div>
  );
}
