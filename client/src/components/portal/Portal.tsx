import { useState } from 'react';
import Searchbar from './Searchbar';
import Bento from './Bento';
import AircraftForm from '../forms/AircraftForm';
import CrewMemberForm from '../forms/CrewMemberForm';
import FlightForm from '../forms/FlightForm';
import { aircraftService, commercialFlightService, crewMemberService } from '../../apiService';
// import { aircraftService, commercialFlightService, crewMemberService } from '../../testApiService';

type SearchType = 'crew' | 'flight' | 'aircraft';

export default function Portal() {
  const [searchTerm, setSearchTerm] = useState<SearchType>('crew');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    switch (searchTerm) {
      case 'crew':
        await crewMemberService.deleteCrewMember(id).then(() => {
          console.log('Deleted crew member', id);
        }).catch((err: unknown) => {
          console.error('Error deleting crew member', err);
        });
        break;
      case 'flight':
        await commercialFlightService.deleteCommercialFlight(id).then(() => {
          console.log('Deleted flight', id);
        }).catch((err: unknown) => {
          console.error('Error deleting flight', err);
        });
        break;
      case 'aircraft':
        await aircraftService.deleteAircraft(id).then(() => {
          console.log('Deleted aircraft', id);
        }).catch((err: unknown) => {
          console.error('Error deleting aircraft', err);
        });
        break;
    }
    setRefreshTrigger(prev => prev + 1);
  }

  const handleFormSubmit = async (data: any) => {
    try {
      const isUpdate = !!editingItem;

      if (searchTerm === 'aircraft') {
        if (isUpdate) await aircraftService.updateAircraft(data.aircraftId, data);
        else await aircraftService.createAircraft(data);
      } 
      else if (searchTerm === 'crew') {
        if (isUpdate) await crewMemberService.updateCrewMember(data.crewMemberId, data);
        else await crewMemberService.createCrewMember(data);
      } 
      else if (searchTerm === 'flight') {
        if (isUpdate) await commercialFlightService.updateCommercialFlight(data.flightGuid, data);
        else await commercialFlightService.createCommercialFlight(data);
      }

      handleCloseModal();
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to submit form", error);
      alert("Error submitting data. Check console.");
    }
  };

  const renderActiveForm = () => {
    const commonProps = {
      initialData: editingItem,
      onSubmit: handleFormSubmit,
      onCancel: handleCloseModal
    };

    switch (searchTerm) {
      case 'aircraft': return <AircraftForm {...commonProps} />;
      case 'crew': return <CrewMemberForm {...commonProps} />;
      case 'flight': return <FlightForm {...commonProps} />;
      default: return null;
    }
  };

  return (
    <main className='h-full w-full flex flex-col relative'>
      
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCreate={handleOpenCreate}
      />

      <div className='flex-1 overflow-hidden bg-slate-50'>
        <Bento 
          searchTerm={searchTerm} 
          refreshTrigger={refreshTrigger}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          {renderActiveForm()}
        </div>
      )}

    </main>
  );
}