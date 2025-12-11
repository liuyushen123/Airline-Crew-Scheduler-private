import React, { useState, useEffect } from "react";
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

  return (
    <div className="flex flex-col gap-4 p-4 text-sm bg-white rounded shadow-md w-full max-w-md">
       <h3 className="font-bold text-lg">{initialData ? "Update" : "Create"} Crew Member</h3>

      <label className="flex flex-col">
        Crew Member ID
        <input 
          className="border p-2 rounded disabled:bg-gray-100" 
          type="text" 
          placeholder="Guid" 
          value={formData.crewMemberId}
          disabled={!!initialData}
          onChange={(e) => setFormData({...formData, crewMemberId: e.target.value})}
        />
      </label>

      <label className="flex flex-col">
        Name
        <input 
          className="border p-2 rounded" 
          type="text" 
          placeholder="Full Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </label>

      <label className="flex flex-col">
        Role
        <select
          className="border p-2 rounded"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="">Select Role</option>
          <option value="Captain">Captain</option>
          <option value="First Officer">First Officer</option>
          <option value="Flight Attendant">Flight Attendant</option>
        </select>
      </label>

      <label className="flex flex-col">
        Location
        <select 
          className="border p-2 rounded"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        >
          <option value="">Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <div className="flex gap-2 mt-4">
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button>
        <button onClick={() => onSubmit(formData)} className="bg-black text-white px-4 py-2 rounded flex-1">
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}