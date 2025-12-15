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
      try {
        const { data } = await aircraftService.getAircrafts();
        setAircraftData(data);
      } catch (err) {
        console.error("Failed to load aircraft", err);
      }
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
    <div className="flex flex-col gap-6 p-6 sm:p-7 bg-bg-primary/95 border border-bg-faded/70 rounded-2xl shadow-2xl w-full max-w-md relative">
      <div className="border-b border-bg-faded/70 pb-4 mb-1">
        <h3 className="font-semibold text-xl sm:text-2xl tracking-wide text-fg-primary">
          {initialData ? "Update" : "Create"} Flight
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Origin</span>
          <select 
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.origin}
            onChange={(e) => setFormData({...formData, origin: e.target.value})}
          >
            <option value="" disabled className="text-fg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Destination</span>
          <select 
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
          >
            <option value="" disabled className="text-fg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Aircraft Assignment</span>
          <select 
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.aircraftId}
            onChange={(e) => setFormData({...formData, aircraftId: e.target.value})}
          >
            <option value="" disabled className="text-fg-faded">
              {formData.origin ? "Select Aircraft" : "Select Origin First"}
            </option>

            {aircraftData
            .filter((aircraft) => aircraft.currentLocation === formData.origin)
            .map(({ aircraftID, aircraftType }) => {
              return (
                <option key={aircraftID} value={aircraftID}>
                  {aircraftType} | {aircraftID}
                </option>
              )
            })}
          </select>
          {formData.origin && aircraftData.filter(a => a.currentLocation === formData.origin).length === 0 && (
             <span className="text-xs text-accent-primary italic">No aircraft available at {formData.origin}</span>
          )}
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Scheduled Takeoff</span>
          <input
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary placeholder-fg-faded focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            type="datetime-local"
            value={formData.schedTakeoff || ""}
            onChange={(e) => setFormData({...formData, schedTakeoff: e.target.value})}
          />
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
          {initialData ? "Save Changes" : "Schedule Flight"}
        </button>
      </div>
    </div>
  );
}