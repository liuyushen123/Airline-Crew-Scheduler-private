import { testApi } from '../apiService';

export default function Header() {
  return (
    <header className="h-[10%] md:px-20 flex flex-row justify-between items-center bg-black text-white shadow-md">
      <img src="/Cornhusker_logo.png" alt="Logo" className="h-full" />
      
      <h1 className="text-4xl pl-4 self-center font-light">
        Cornhusker Airways
      </h1>

      {/* <button 
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
        onClick={testApi}
      >
        Test API
      </button> */}
    </header>
  );
}
