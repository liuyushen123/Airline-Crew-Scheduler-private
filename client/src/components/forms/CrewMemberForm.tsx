import React, { useState } from "react";

export default function CrewMemberForm() {
  const [role, setRole] = useState("");

  return (
    <div className="flex flex-col gap-2 p-2 text-sm">

      <label className="flex flex-col">
        Crew Member ID
        <input className="border p-1" type="text" placeholder="Guid" />
      </label>

      <label className="flex flex-col">
        Name
        <input className="border p-1" type="text" placeholder="Full Name" />
      </label>

      <label className="flex flex-col">
        Role
        <select
          className="border p-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Captain">Captain</option>
          <option value="First Officer">First Officer</option>
          <option value="Flight Attendant">Flight Attendant</option>
        </select>
      </label>

      <label className="flex flex-col">
        Location
        <select className="border p-1">
          <option value="">Select Airport</option>
          <option value="Lincoln">Lincoln, Nebraska</option>
          <option value="Iowa City">Iowa City, Iowa</option>
          <option value="Evanston">Evanston, Illinois</option>
          <option value="West Lafayette">West Lafayette, Indiana</option>
        </select>
      </label>

      <button className="bg-black text-white p-1 mt-2">
        Create Crew Member (does nothing)
      </button>
    </div>
  );
}
