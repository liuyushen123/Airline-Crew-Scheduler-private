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
    <div className="w-[560px] max-w-[92vw] rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-xl font-semibold">
          {initialData ? "Update" : "Create"} Crew Member
        </h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Crew Member ID
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50"
            type="text"
            placeholder="Guid"
            value={formData.crewMemberId}
            disabled={!!initialData}
            onChange={(e) => setFormData({ ...formData, crewMemberId: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Full Name
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            placeholder="e.g. Nolan Stewart"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Role
          </span>
          <select
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Captain">Captain</option>
            <option value="First Officer">First Officer</option>
            <option value="Flight Attendant">Flight Attendant</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Base Location
          </span>
          <select
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          >
            <option value="">Select Airport</option>
            <option value="Lincoln">Lincoln, Nebraska</option>
            <option value="Iowa City">Iowa City, Iowa</option>
            <option value="Evanston">Evanston, Illinois</option>
            <option value="West Lafayette">West Lafayette, Indiana</option>
          </select>
        </label>
      </div>

      <div className="px-6 py-5 border-t border-slate-200 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 h-10 rounded-xl font-semibold bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(formData)}
          className="flex-1 h-10 rounded-xl font-semibold text-white bg-[var(--color-accent-primary)] hover:brightness-110 transition shadow-sm"
        >
          {initialData ? "Update" : "Create"} Member
        </button>
      </div>
    </div>
  );
}
