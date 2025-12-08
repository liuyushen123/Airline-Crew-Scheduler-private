import { testApi } from '../apiService';

export default function Header() {
  return (
    <header className='h-[10%] md:px-20 flex flex-row justify-between items-center border-b-[1px] border-gray-300 bg-[#1971c2]'>
      <img src="/Cornhusker_logo.png" alt="Logo" className='h-full'/>
      <h1 className='text-4xl pl-4 self-center text-white font-light'>Cornhusker Airways</h1>
      <button className='w-[50px] h-[25px] bg-purple-500' onClick={testApi}>Test API</button>
    </header>
  );
}