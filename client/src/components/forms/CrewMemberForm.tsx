import { useState, useEffect } from "react";
import type { CrewMember } from "../../types/CrewMember";

interface Props {
  initialData?: CrewMember | null;
  onSubmit: (data: CrewMember) => void;
  onCancel: () => void;
}

export default function CrewMemberForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<CrewMember>({
    crewMemberId: "",
    name: "",
    role: "",
    location: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    const payload = { ...formData };
    
    if (!initialData) {
      delete (payload as any).crewMemberId;
    }

    onSubmit(payload);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-bg-primary border border-accent-faded rounded-md shadow-lg w-full max-w-md relative">
       
       <div className="border-b border-bg-faded pb-4 mb-2">
         <h3 className="font-semibold text-2xl tracking-wide text-fg-primary">
           {initialData ? "Update" : "Create"} Crew Member
         </h3>
       </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary uppercase tracking-wider">Full Name</span>
          <input 
            className="w-full p-3 rounded-lg bg-bg-secondary border border-bg-faded text-fg-primary placeholder-fg-faded focus:outline-none focus:border-accent-primary transition-colors" 
            type="text" 
            placeholder="e.g. Nolan Stewart" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary uppercase tracking-wider">Role</span>
          <select
            className="w-full p-3 rounded-lg bg-bg-secondary border border-bg-faded text-fg-secondary focus:outline-none focus:border-accent-primary transition-colors"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="" disabled className="text-fg-faded">Select Role</option>
            <option value="Captain">Captain</option>
            <option value="First Officer">First Officer</option>
            <option value="Flight Attendant">Flight Attendant</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary uppercase tracking-wider">Base Location</span>
          <select 
            className="w-full p-3 rounded-lg bg-bg-secondary border border-bg-faded text-fg-secondary focus:outline-none focus:border-accent-primary transition-colors"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
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
          {initialData ? "Save Changes" : "Create Member"}
        </button>
      </div>
    </div>
  );
}