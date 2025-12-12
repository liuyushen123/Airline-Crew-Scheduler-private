// import { testApi } from '../apiService';

export default function Header() {
  return (
    <header className="h-[12.5%] md:px-20 flex flex-row justify-between items-center bg-bg-secondary shadow-md">
      <img src="/Cornhusker_logo.png" alt="Logo" className="h-full" />
      
      <div className='items-center mr-40'>
        <h1 className="text-5xl self-center font-mediums tracking-[0.2em] text-fg-primary">
          Cornhusker Airways
        </h1>
      </div>

      {/* <button 
        className="px-4 py-2 rounded-full border border-red-500 text-red-100 hover:bg-red-500 hover:text-white transition"
        onClick={testApi}
      >
        Test API
      </button> */}
    </header>
  );
}
