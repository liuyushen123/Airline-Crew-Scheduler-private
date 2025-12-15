interface Props {
  searchTerm: 'crew' | 'flight' | 'aircraft';
  setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void;
  onOpenCreate: () => void;
}

export default function Searchbar({ searchTerm, setSearchTerm, onOpenCreate }: Props) {
  return (
    <div className="w-full bg-bg-primary/95 backdrop-blur-sm rounded-xl shadow-sm border border-bg-faded/70 flex flex-row items-center justify-between px-4 sm:px-5 md:px-6 py-3">
      <div className="flex flex-row items-center gap-3 sm:gap-4">
        <label className="text-base sm:text-lg md:text-xl font-semibold text-fg-primary tracking-wide">
          Search For:
        </label>

        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value as any)}
          className="py-2.5 px-4 rounded-lg bg-bg-secondary border border-bg-faded/80 text-fg-primary font-medium text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
        >
          <option value="crew">Crew Members</option>
          <option value="flight">Flights</option>
          <option value="aircraft">Aircraft</option>
        </select>
      </div>

      <button
        onClick={onOpenCreate}
        className="bg-accent-primary hover:bg-accent-secondary text-white rounded-lg transition py-2.5 px-5 sm:px-6 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md active:scale-[0.99]"
      >
        Create
      </button>
    </div>
  );
}
