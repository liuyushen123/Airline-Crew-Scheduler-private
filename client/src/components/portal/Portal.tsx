import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Searchbar from './Searchbar';
import Bento from './Bento';
import AircraftForm from '../forms/AircraftForm';
import CrewMemberForm from '../forms/CrewMemberForm';
import FlightForm from '../forms/FlightForm';
import { aircraftService, commercialFlightService, crewMemberService } from '../../apiService';

type SearchType = 'crew' | 'flight' | 'aircraft';

interface Props {
  triggerSidebarRefresh: Dispatch<SetStateAction<number>>;
}

export default function Portal({ triggerSidebarRefresh }: Props) {
  const [searchTerm, setSearchTerm] = useState<SearchType>('crew');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshState = () => {
    setRefreshTrigger(prev => prev + 1);
    triggerSidebarRefresh(prev => prev + 1);
  };

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
    try {
      if (searchTerm === 'crew') {
        await crewMemberService.deleteCrewMember(id);
      } else if (searchTerm === 'flight') {
        await commercialFlightService.deleteCommercialFlight(id);
      } else {
        await aircraftService.deleteAircraft(id);
      }
      refreshState();
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const isUpdate = !!editingItem;

      if (searchTerm === 'aircraft') {
        const id = isUpdate ? editingItem.aircraftId : undefined;
        isUpdate
          ? await aircraftService.updateAircraft(id, data)
          : await aircraftService.createAircraft(data);

      } else if (searchTerm === 'crew') {
        const id = isUpdate ? editingItem.crewMemberId : undefined;
        isUpdate
          ? await crewMemberService.updateCrewMember(id, data)
          : await crewMemberService.createCrewMember(data);

      } else {
        const id = isUpdate ? editingItem.flightGuid : undefined;
        isUpdate
          ? await commercialFlightService.updateCommercialFlight(id, data)
          : await commercialFlightService.createCommercialFlight(data);
      }

      handleCloseModal();
      refreshState();
    } catch (e) {
      console.error("Error submitting form", e);
    }
  };

  const renderActiveForm = () => {
    const props = { initialData: editingItem, onSubmit: handleFormSubmit, onCancel: handleCloseModal };

    if (searchTerm === 'aircraft') return <AircraftForm {...props} />;
    if (searchTerm === 'crew') return <CrewMemberForm {...props} />;
    if (searchTerm === 'flight') return <FlightForm {...props} />;
    return null;
  };

  return (
    <main className="h-full w-3/4 flex flex-col relative bg-bg-secondary pr-4">
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onOpenCreate={handleOpenCreate} />

      <div className="flex-1 overflow-hidden mt-3">
        <Bento
          searchTerm={searchTerm}
          refreshTrigger={refreshTrigger}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-xs">
          {renderActiveForm()}
        </div>
      )}
    </main>
  );
}
