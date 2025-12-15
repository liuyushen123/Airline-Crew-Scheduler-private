export default function Header() {
  return (
    <header className="relative h-[12.5%] min-h-18 px-4 sm:px-6 md:px-10 flex items-center justify-center bg-accent-secondary shadow-sm border-b border-bg-faded/60">
      <img
        src="/Cornhusker_logo.png"
        alt="Logo"
        className="absolute left-4 sm:left-6 md:left-10 h-10 sm:h-12 md:h-14 w-auto drop-shadow-sm"
      />

      <div className="flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.18em] text-white text-center">
          Cornhusker Airways
        </h1>
      </div>
    </header>
  );
}
