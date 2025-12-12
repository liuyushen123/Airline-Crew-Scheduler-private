import { useState, useEffect } from "react";
import type { CommercialFlight } from "../../types/CommercialFlight";
import type { Aircraft } from "../../types/Aircraft";
import { aircraftService } from "../../apiService";

interface Props {
  initialData?: CommercialFlight | null;
  onSubmit: (data: CommercialFlight) => void;
  onCancel: () => void;
}

export default function FlightForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<CommercialFlight>({
    flightGuid: "",
    aircraftId: "",
    origin: "",
    destination: "",
    schedTakeoff: "",
    estTakeoff: null,
    actTakeoff: null,
    schedTouchdown: null,
    estTouchdown: null,
    actTouchdown: null,
  });
  const [aircraftData, setAircraftData] = useState<Aircraft[]>([]);

  // effect to load aircrafts
  useEffect(() => {
    const load = async () => {
      const { data } = await aircraftService.getAircrafts();
      setAircraftData(data);
    }

    load();
  }, []);

  // effect to set given data for update
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    const payload = { ...formData };

    if (!initialData) {
      delete (payload as any).flightGuid;
    }

    if (payload.aircraftId === "") {
        (payload as any).aircraftId = null;
    }

    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-sm bg-white rounded shadow-md w-full max-w-md">
      <h3 className="font-bold text-lg">{initialData ? "Update" : "Create"} Flight</h3>

      <label className="flex flex-col">
        Origin
        <select 
          className="border p-2 rounded"
          value={formData.origin}
          onChange={(e) => setFormData({...formData, origin: e.target.value})}
        >
          <option value="">Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <label className="flex flex-col">
        Destination
        <select 
          className="border p-2 rounded"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
        >
          <option value="" disabled>Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <label className="flex flex-col">
        Aircraft
        <select 
          className="border p-2 rounded"
          value={formData.aircraftId}
          onChange={(e) => setFormData({...formData, aircraftId: e.target.value})}
        >
          <option value="" disabled>Select Aircraft</option>

          {aircraftData
          .filter((aircraft) => aircraft.currentLocation === formData.origin)
          .map(({ aircraftID, aircraftType }) => {
            return <option key={aircraftID} value={aircraftID}><span className='font-medium' >{aircraftType}&gt;</span> {aircraftID}</option>
          })}
        </select>
      </label>
      
      <label className="flex flex-col">
        Scheduled Takeoff
        <input
          className="border p-2 rounded"
          type="datetime-local"
          value={formData.schedTakeoff || ""}
          onChange={(e) => setFormData({...formData, schedTakeoff: e.target.value})}
        />
      </label>

      <div className="flex gap-2 mt-4">
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button>
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded flex-1">
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}