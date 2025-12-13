import React, { useState, useEffect } from "react";
import type { Aircraft } from "../../types/Aircraft";

interface Props {
  initialData?: Aircraft | null;
  onSubmit: (data: Aircraft) => void;
  onCancel: () => void;
}

export default function AircraftForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<Aircraft>({
    aircraftId: "",
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

  return (
    <div className="w-[560px] max-w-[92vw] rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-xl font-semibold">{initialData ? "Update" : "Create"} Aircraft</h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Aircraft ID
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50"
            type="text"
            placeholder="Guid"
            value={formData.aircraftId}
            disabled={!!initialData}
            onChange={(e) => setFormData({ ...formData, aircraftId: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Aircraft Type
          </span>
          <select
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={formData.aircraftType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="GBR-10">GBR-10 (45 seats)</option>
            <option value="NU-150">NU-150 (75 seats)</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Current Location
          </span>
          <select
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={formData.currentLocation}
            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
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
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
