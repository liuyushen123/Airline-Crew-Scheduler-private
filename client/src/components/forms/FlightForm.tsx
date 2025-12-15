import { useState, useEffect } from "react";
import type { CommercialFlight } from "../../types/CommercialFlight";
import type { Aircraft } from "../../types/Aircraft";
import type { CrewMember } from "../../types/CrewMember";
import { aircraftService } from "../../apiService";
import { crewMemberService } from "../../apiService";

interface Props {
  initialData?: CommercialFlight | null;
  onSubmit: (data: CommercialFlight) => void;
  onCancel: () => void;
}

interface CrewSelection {
  captainId: string;
  firstOfficerId: string;
  attendantIds: string[];
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
  const [crewMemberData, setCrewMemberData] = useState<CrewMember[]>([]);

  const [crewSelections, setCrewSelections] = useState<CrewSelection>({
    captainId: "",
    firstOfficerId: "",
    attendantIds: []
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await aircraftService.getAircrafts();
        setAircraftData(data);
      } catch (err) {
        console.error("Failed to load aircraft", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await crewMemberService.getCrewMembers();
        setCrewMemberData(data);
      } catch (err) {
        console.error("Failed to load crew members", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);

      if ((initialData as any).flightCrews) {
        const crews = (initialData as any).flightCrews as any[];
        
        const captain = crews.find(c => c.roleOnFlight === "Captain");
        const fo = crews.find(c => c.roleOnFlight === "First Officer");
        const attendants = crews
          .filter(c => c.roleOnFlight === "Flight Attendant")
          .map(c => c.crewMemberId);

        setCrewSelections({
          captainId: captain?.crewMemberId || "",
          firstOfficerId: fo?.crewMemberId || "",
          attendantIds: attendants || []
        });
      }
    }
  }, [initialData]);

  const availableCrew = crewMemberData.filter(c => c.location === formData.origin);
  const availableCaptains = availableCrew.filter(c => c.role === "Captain");
  const availableFirstOfficers = availableCrew.filter(c => c.role === "First Officer");
  const availableAttendants = availableCrew.filter(c => c.role === "Flight Attendant");

  const handleAttendantToggle = (id: string) => {
    setCrewSelections(prev => {
      const exists = prev.attendantIds.includes(id);
      return {
        ...prev,
        attendantIds: exists 
          ? prev.attendantIds.filter(aId => aId !== id)
          : [...prev.attendantIds, id]
      };
    });
  };

  const handleSubmit = () => {
    const payload = { 
      ...formData,
      captainId: crewSelections.captainId || null,
      firstOfficerId: crewSelections.firstOfficerId || null,
      flightAttendantIds: crewSelections.attendantIds
    };

    if (!initialData) {
      delete (payload as any).flightGuid;
    }

    if (payload.aircraftId === "") {
        (payload as any).aircraftId = null;
    }

    onSubmit(payload as any);
  };

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-7 bg-bg-primary/95 border border-bg-faded/70 rounded-2xl shadow-2xl w-full max-w-5xl xl:max-w-6xl max-h-[85vh] overflow-y-auto scrollbar-soft relative">
      <div className="border-b border-bg-faded/70 pb-4 mb-1">
        <h3 className="font-semibold text-xl sm:text-2xl tracking-wide text-fg-primary">
          {initialData ? "Update" : "Create"} Flight
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <label className="flex flex-col gap-2 lg:col-start-1">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Origin</span>
          <select
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.origin}
            onChange={(e) => {
              setFormData({ ...formData, origin: e.target.value, aircraftId: "" });
              setCrewSelections({ captainId: "", firstOfficerId: "", attendantIds: [] });
            }}
          >
            <option value="" disabled className="text-fg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 lg:col-start-1">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Destination</span>
          <select
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          >
            <option value="" disabled className="text-fg-faded">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 lg:col-start-1">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Aircraft Assignment</span>
          <select
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
            value={formData.aircraftId}
            onChange={(e) => setFormData({ ...formData, aircraftId: e.target.value })}
            disabled={!formData.origin}
          >
            <option value="" disabled className="text-fg-faded">
              {formData.origin ? "Select Aircraft" : "Select Origin First"}
            </option>

            {aircraftData
              .filter((aircraft) => aircraft.currentLocation === formData.origin)
              .map(({ aircraftID, aircraftType }) => (
                <option key={aircraftID} value={aircraftID}>
                  {aircraftType} | {aircraftID.substring(0, 8)}...
                </option>
              ))}
          </select>
          {formData.origin && aircraftData.filter(a => a.currentLocation === formData.origin).length === 0 && (
            <span className="text-xs text-accent-primary italic">No aircraft available at {formData.origin}</span>
          )}
        </label>

        <div className="flex flex-col gap-4 p-5 bg-bg-faded/40 rounded-2xl border border-bg-faded/80 lg:col-start-2 lg:row-start-1 lg:row-span-4 self-start">
          <h4 className="font-semibold text-fg-primary border-b border-bg-faded/70 pb-3">
            Flight Crew
          </h4>

          <label className="flex flex-col gap-2 lg:col-start-1">
            <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Captain</span>
            <select
              className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
              value={crewSelections.captainId}
              onChange={(e) => setCrewSelections({ ...crewSelections, captainId: e.target.value })}
              disabled={!formData.origin}
            >
              <option value="">Select Captain</option>
              {availableCaptains.map(c => (
                <option key={c.crewMemberId} value={c.crewMemberId}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 lg:col-start-1">
            <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">First Officer</span>
            <select
              className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition disabled:opacity-60 disabled:cursor-not-allowed"
              value={crewSelections.firstOfficerId}
              onChange={(e) => setCrewSelections({ ...crewSelections, firstOfficerId: e.target.value })}
              disabled={!formData.origin}
            >
              <option value="">Select First Officer</option>
              {availableFirstOfficers.map(c => (
                <option key={c.crewMemberId} value={c.crewMemberId}>{c.name}</option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Flight Attendants</span>

            <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto scrollbar-soft border border-bg-faded/80 p-3 rounded-xl bg-bg-secondary">
              {availableAttendants.length === 0 && (
                <span className="text-xs text-fg-faded italic">No attendants at origin.</span>
              )}

              {availableAttendants.map(c => (
                <label
                  key={c.crewMemberId}
                  className="flex items-center gap-2 cursor-pointer hover:bg-bg-faded/60 transition p-2 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={crewSelections.attendantIds.includes(c.crewMemberId)}
                    onChange={() => handleAttendantToggle(c.crewMemberId)}
                    className="accent-accent-primary"
                  />
                  <span className="text-sm text-fg-primary">{c.name}</span>
                </label>
              ))}
            </div>

            <span className="text-xs text-fg-faded text-right">
              {crewSelections.attendantIds.length} selected
            </span>
          </div>
        </div>

        <label className="flex flex-col gap-2 lg:col-start-1">
          <span className="text-xs font-semibold text-fg-secondary uppercase tracking-wider">Scheduled Takeoff</span>
          <input
            className="w-full p-3 rounded-xl bg-bg-secondary border border-bg-faded/80 text-fg-primary placeholder-fg-faded focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary transition"
            type="datetime-local"
            value={formData.schedTakeoff || ""}
            onChange={(e) => setFormData({ ...formData, schedTakeoff: e.target.value })}
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