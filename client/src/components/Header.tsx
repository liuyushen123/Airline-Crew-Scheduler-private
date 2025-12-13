import { testApi } from "../apiService";

export default function Header() {
  return (
    <header className="h-[72px] px-6 md:px-12 flex items-center justify-between bg-gradient-to-r from-[var(--color-brand-navy)] to-[var(--color-brand-blue)] text-white shadow-sm border-b border-white/10">
      <div className="flex items-center gap-3">
        <img src="/Cornhusker_logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      <h1 className="text-xl md:text-3xl font-light tracking-[0.35em] uppercase text-white/95">
        Cornhusker Airways
      </h1>

      <button
        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition"
        onClick={testApi}
      >
        Test API
      </button>
    </header>
  );
}
