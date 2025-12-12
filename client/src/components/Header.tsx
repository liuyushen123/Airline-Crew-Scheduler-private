import { testApi } from '../apiService';

export default function Header() {
  return (
    <header className="h-[10%] md:px-20 flex flex-row justify-between items-center bg-black text-white border-b border-red-500/50 shadow-[0_2px_0_rgba(248,113,113,0.35)]">
      <img src="/Cornhusker_logo.png" alt="Logo" className="h-full" />
      
      <h1 className="text-4xl pl-4 self-center font-light tracking-wide">
        Cornhusker Airways
      </h1>

      <button 
        className="px-4 py-2 rounded-full border border-red-500 text-red-100 hover:bg-red-500 hover:text-white transition"
        onClick={testApi}
      >
        Test API
      </button>
    </header>
  );
}
