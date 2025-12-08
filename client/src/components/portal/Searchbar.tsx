export default function Searchbar(
  { searchTerm, setSearchTerm, onCreate }: 
  { searchTerm: 'crew' | 'flight' | 'aircraft', 
    setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void,
    onCreate: () => void }) {

  function handleSearchTermChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchTerm(event.target.value as 'crew' | 'flight' | 'aircraft');
  }

  function handleCreate() {
    
  }

  return (
    <div className='w-full h-12 bg-gray-300 flex flex-row items-center justify-between md:px-20 px-4 font-light'>
      <select value={searchTerm} onChange={handleSearchTermChange}>
        <option value="crew">Crew Members</option>
        <option value="flight">Flights</option>
        <option value="aircraft">Aircraft</option>
        <option value="flightCrew">Flight Crew Assignments</option>
      </select>


      <button
        onClick={() => handleCreate()}
        className='bg-gray-400 hover:bg-gray-500 rounded-xl py-1 px-4'
      >Create</button>

    </div>
  );
}