interface Props {
  searchTerm: 'crew' | 'flight' | 'aircraft';
  setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void;
  onOpenCreate: () => void;
}

export default function Searchbar({ searchTerm, setSearchTerm, onOpenCreate }: Props) {
  return (
    <div className="w-full bg-bg-primary rounded-md shadow-xs border border-accent-faded flex flex-row items-center justify-between px-4 md:px-6 py-3">
      
      <div className="flex flex-row items-center gap-3">
        <label className="text-xl font-semibold text-fg-primary tracking-wide">
          Search For:
        </label>
        
        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value as any)}
          className="items-center py-2 px-4 rounded-lg bg-bg-secondary border border-bg-faded text-fg-secondary font-medium text-lg"
        >
          <option value="crew">Crew Members</option>
          <option value="flight">Flights</option>
          <option value="aircraft">Aircraft</option>
        </select>
      </div>

      <button
        onClick={onOpenCreate}
        className="bg-accent-primary hover:bg-accent-secondary text-fg-primary hover:text-fg-secondary rounded-sm transition py-2 px-6 text-lg font-medium tracking-wide"
      >
        Create
      </button>
    </div>
  );
}
