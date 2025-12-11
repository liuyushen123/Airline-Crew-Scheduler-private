interface Props {
  searchTerm: 'crew' | 'flight' | 'aircraft';
  setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void;
  onOpenCreate: () => void;
}

export default function Searchbar({ searchTerm, setSearchTerm, onOpenCreate }: Props) {
  return (
    <div className="w-full h-16 bg-[#1A1A1A] flex flex-row items-center justify-between md:px-20 px-4 text-gray-200 shadow">
      
      <div className="flex flex-col">
        <label className="text-xs font-bold text-gray-400">Filter By</label>
        
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value as any)}
          className="p-2 rounded bg-[#2A2A2A] border border-gray-600 text-gray-200"
        >
          <option value="crew">Crew Members</option>
          <option value="flight">Flights</option>
          <option value="aircraft">Aircraft</option>
        </select>
      </div>

      <button
        onClick={onOpenCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white transition rounded-xl py-2 px-6 font-bold"
      >
        + Create New
      </button>
    </div>
  );
}
