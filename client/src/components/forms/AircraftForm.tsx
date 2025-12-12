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
    <div className="flex flex-col gap-6 p-6 bg-bg-primary border border-accent-faded rounded-md shadow-lg w-full max-w-md relative">
  
      <div className="border-b border-bg-faded pb-4 mb-2">
        <h3 className="font-semibold text-2xl tracking-wider text-fg-primary">
          {initialData ? "Update" : "Create"} Aircraft
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary uppercase tracking-wider">Aircraft Type</span>
          <select
            className="w-full p-3 rounded-lg bg-bg-secondary border border-bg-faded text-fg-secondary focus:outline-none focus:border-accent-primary transition-colors"
            value={formData.aircraftType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="" disabled className="text-fg-faded">Select Type</option>
            <option value="GBR-10">GBR-10 (45 seats)</option>
            <option value="NU-150">NU-150 (75 seats)</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
           <span className="text-sm font-medium text-fg-secondary uppercase tracking-wider">Current Location</span>
          <select 
            className="w-full p-3 rounded-lg bg-bg-secondary border border-bg-faded text-fg-secondary focus:outline-none focus:border-accent-primary transition-colors"
            value={formData.currentLocation}
            onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
          >
            <option value="" disabled className="text-bg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-bg-faded">
        <button 
          onClick={onCancel} 
          className="flex-1 px-4 py-2 rounded-sm border border-bg-faded text-fg-secondary hover:bg-bg-secondary hover:text-fg-primary transition-colors font-medium"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit} 
          className="flex-1 px-4 py-2 rounded-sm bg-accent-primary text-fg-primary hover:bg-accent-secondary hover:text-fg-secondary transition-colors font-medium shadow-sm"
        >
          {initialData ? "Save Changes" : "Create Aircraft"}
        </button>
      </div>
    </div>
  );
}