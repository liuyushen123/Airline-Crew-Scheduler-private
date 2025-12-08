import { useState } from 'react';
import Searchbar from './Searchbar';
import Bento from './Bento';

export default function Portal() {
  const [searchTerm, setSearchTerm] = useState<'crew' | 'flight' | 'aircraft'>('crew');

  function handleCreate(): void {
    console.log(`Create called on ${searchTerm}`);
  };
  
  return (
    <main className='h-full w-[70%] flex flex-col'>

      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={handleCreate}
      />

      <div className='bg-green-500 h-full w-full flex flex-col'>
        
        <Bento searchTerm={searchTerm} />

      </div>
    </main>
  );
}