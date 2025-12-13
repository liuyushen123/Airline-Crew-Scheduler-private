interface Props {
  searchTerm: "crew" | "flight" | "aircraft";
  setSearchTerm: (term: "crew" | "flight" | "aircraft") => void;
  onOpenCreate: () => void;
}

export default function Searchbar({ searchTerm, setSearchTerm, onOpenCreate }: Props) {
  return (
    <div className="w-full rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-sm px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-[var(--color-fg-secondary)]">
          Search For:
        </label>

        <select
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value as any)}
          className="h-11 px-4 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-fg-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-sky)]/25"
        >
          <option value="crew">Crew Members</option>
          <option value="flight">Flights</option>
          <option value="aircraft">Aircraft</option>
        </select>
      </div>

      <button
        onClick={onOpenCreate}
        className="h-11 px-6 rounded-xl font-semibold text-white bg-[var(--color-accent-primary)] hover:brightness-110 transition shadow-sm"
      >
        Create
      </button>
    </div>
  );
}
