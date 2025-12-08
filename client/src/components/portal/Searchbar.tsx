import { aircraftService, commercialFlightService, crewMemberService } from "../../apiService";
import { useState } from 'react';

export default function Searchbar(
  { searchTerm, setSearchTerm, onCreate }: 
  { searchTerm: 'crew' | 'flight' | 'aircraft', 
    setSearchTerm: (term: 'crew' | 'flight' | 'aircraft') => void,
    onCreate: () => void }) {
  const [creationData, setCreationData] = useState(null);

  function handleSearchTermChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchTerm(event.target.value as 'crew' | 'flight' | 'aircraft');
  }

  const handleCreate = async () => {
    const data: any = creationData;

    if (!data) {
      console.log('breaking from creation, no data');
      return;
    }

    switch (searchTerm) {
      case 'aircraft':
        await aircraftService.createAircraft(data).then(() => {
          console.log('Created aircraft', data.aircraftId);
        }).catch((err: unknown) => {
          console.error('Error updating aircraft: ', err);
        });
        break;
      case 'crew':
        await crewMemberService.createCrewMember(data).then(() => {
          console.log('Created crew', data.crewMemberId);
        }).catch((err: unknown) => {
          console.error('Error updating crew: ', err);
        });
        break;
      case 'flight':
        await commercialFlightService.createCommercialFlight(data).then(() => {
          console.log('Created flight', data.flightId);
        }).catch((err: unknown) => {
          console.error('Error updating flight: ', err);
        });
        break;
    }
  }

  return (
    <div className='w-full h-12 bg-gray-300 flex flex-row items-center justify-between md:px-20 px-4 font-light'>
      <select value={searchTerm} onChange={handleSearchTermChange}>
        <option value="crew">Crew Members</option>
        <option value="flight">Flights</option>
        <option value="aircraft">Aircraft</option>
      </select>


      <button
        onClick={() => handleCreate()}
        className='bg-gray-400 hover:bg-gray-500 rounded-xl py-1 px-4'
      >Create</button>

    </div>
  );
}