import React, { useState } from "react";

export default function AircraftForm() {
  const [aircraftType, setAircraftType] = useState("");

  return (
    <div className="flex flex-col gap-2 p-2 text-sm">

      <label className="flex flex-col">
        Aircraft ID
        <input className="border p-1" type="text" placeholder="Guid" />
      </label>

      <label className="flex flex-col">
        Aircraft Type
        <select
          className="border p-1"
          value={aircraftType}
          onChange={(e) => setAircraftType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="GBR-10">GBR-10 (45 seats)</option>
          <option value="NU-150">NU-150 (75 seats)</option>
        </select>
      </label>

      <label className="flex flex-col">
        Current Location
        <select className="border p-1">
          <option value="">Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <button className="bg-black text-white p-1 mt-2">
        Create Aircraft (this does nothin)
      </button>
    </div>
  );
}
