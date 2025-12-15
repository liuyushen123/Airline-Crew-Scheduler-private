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
    <div className="flex flex-col gap-6 p-6 sm:p-7 bg-bg-primary/95 border border-bg-faded/70 rounded-2xl shadow-2xl w-full max-w-md relative">
      <div className="border-b border-bg-faded/70 pb-4 mb-1">
        <h3 className="font-semibold text-xl sm:text-2xl tracking-wide text-fg-primary">
          {initialData ? "Update" : "Create"} Aircraft
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Aircraft Type</span>
          <select
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.aircraftType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="" disabled className="text-fg-faded">Select Type</option>
            <option value="GBR-10">GBR-10 (45 seats)</option>
            <option value="NU-150">NU-150 (75 seats)</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Current Location</span>
          <select 
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.currentLocation}
            onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
          >
            <option value="" disabled className="text-fg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-bg-faded/70">
        <button 
          onClick={onCancel} 
          className="flex-1 px-4 py-2.5 rounded-lg border border-bg-faded/80 text-fg-secondary hover:bg-bg-secondary hover:text-fg-primary transition font-semibold"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit} 
          className="flex-1 px-4 py-2.5 rounded-lg bg-accent-primary text-white hover:bg-accent-secondary transition font-semibold shadow-sm hover:shadow-md active:scale-[0.99]"
        >
          {initialData ? "Save Changes" : "Create Aircraft"}
        </button>
      </div>
    </div>
  );
}
