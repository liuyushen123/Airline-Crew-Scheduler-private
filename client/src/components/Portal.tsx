import Sidebar from './Sidebar';
import { testApi } from '../apiService';

export default function Portal() {
  return (
    <main className='h-[80%] w-full flex flex-row'>

      {/* flights */}
      <div className='bg-green-500 h-full w-[70%] flex flex-col'>
        
        <div className='flex flex-row w-full h-1/2'>
          {/* top left corner */}
          <div className='bg-yellow-300 w-1/2 h-full'>
            top left
            <button className='w-[50px] h-[25px] bg-purple-500' onClick={testApi}>Test API</button>
          </div>
          
          {/* top right corner */}
          <div className='bg-yellow-600 w-1/2 h-full'>
            top right
          </div>
        </div>

        <div className='flex flex-row w-full h-1/2'>
          {/* bottom left corner */}
          <div className='bg-yellow-600 w-1/2 h-full'>
            top left
          </div>
          
          {/* bottom right corner */}
          <div className='bg-yellow-300 w-1/2 h-full'>
            top right
          </div>
        </div>

      </div>

      <Sidebar />
    </main>
  );
}