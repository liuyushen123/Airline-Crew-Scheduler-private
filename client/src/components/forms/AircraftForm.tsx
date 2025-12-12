import { useState, useEffect } from "react";
import type { Aircraft } from "../../types/Aircraft";

interface Props {
  initialData?: Aircraft | null;
  onSubmit: (data: Aircraft) => void;
  onCancel: () => void;
}

export default function AircraftForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<Aircraft>({
    aircraftID: "",
    aircraftType: "",
    maxCapacity: 0,
    currentLocation: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleTypeChange = (type: string) => {
    let cap = 0;
    if (type === "GBR-10") cap = 45;
    if (type === "NU-150") cap = 75;
    
    setFormData({ ...formData, aircraftType: type, maxCapacity: cap });
  };

  const handleSubmit = () => {
    const payload = { ...formData };

    if (!initialData) {
      delete (payload as any).aircraftID;
    }

    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-sm bg-white rounded shadow-md w-full max-w-md">
      <h3 className="font-bold text-lg">{initialData ? "Update" : "Create"} Aircraft</h3>
      
      <label className="flex flex-col">
        Aircraft Type
        <select
          className="border p-2 rounded"
          value={formData.aircraftType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="" disabled>Select Type</option>
          <option value="GBR-10">GBR-10 (45 seats)</option>
          <option value="NU-150">NU-150 (75 seats)</option>
        </select>
      </label>

      <label className="flex flex-col">
        Current Location
        <select 
          className="border p-2 rounded"
          value={formData.currentLocation}
          onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
        >
          <option value="" disabled>Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <div className="flex gap-2 mt-4">
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button>
        <button 
          onClick={handleSubmit} 
          className="bg-black text-white px-4 py-2 rounded flex-1"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}