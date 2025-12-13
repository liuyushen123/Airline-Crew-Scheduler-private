import React, { useState, useEffect } from "react";
import type { CommercialFlight } from "../../types/CommercialFlight";

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

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  return (
    <div className="w-[560px] max-w-[92vw] rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-xl font-semibold">{initialData ? "Update" : "Create"} Flight</h3>
      </div>

      <div className="px-6 py-5 space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Flight ID
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50"
            type="text"
            placeholder="Guid"
            value={formData.flightGuid}
            disabled={!!initialData}
            onChange={(e) => setFormData({ ...formData, flightGuid: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Aircraft ID
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            placeholder="Aircraft Guid"
            value={formData.aircraftId}
            onChange={(e) => setFormData({ ...formData, aircraftId: e.target.value })}
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
              Origin
            </span>
            <select
              className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            >
              <option value="">Select Airport</option>
              <option value="Lincoln">Lincoln, Nebraska</option>
              <option value="Iowa City">Iowa City, Iowa</option>
              <option value="Evanston">Evanston, Illinois</option>
              <option value="West Lafayette">West Lafayette, Indiana</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
              Destination
            </span>
            <select
              className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            >
              <option value="">Select Airport</option>
              <option value="Lincoln">Lincoln, Nebraska</option>
              <option value="Iowa City">Iowa City, Iowa</option>
              <option value="Evanston">Evanston, Illinois</option>
              <option value="West Lafayette">West Lafayette, Indiana</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase">
            Scheduled Takeoff
          </span>
          <input
            className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="datetime-local"
            value={formData.schedTakeoff || ""}
            onChange={(e) => setFormData({ ...formData, schedTakeoff: e.target.value })}
          />
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
