import React, { useState } from "react";

export default function FlightForm() {
  const [takeoffTime, setTakeoffTime] = useState("");

  return (
    <div className="flex flex-col gap-2 p-2 text-sm">

      <label className="flex flex-col">
        Flight ID
        <input className="border p-1" type="text" placeholder="Guid" />
      </label>

      <label className="flex flex-col">
        Aircraft ID
        <input className="border p-1" type="text" placeholder="Aircraft Guid" />
      </label>

      <label className="flex flex-col">
        Origin
        <select className="border p-1">
          <option value="">Select Airport</option>
          <option>Lincoln, Nebraska</option>
          <option>Iowa City, Iowa</option>
          <option>Evanston, Illinois</option>
          <option>West Lafayette, Indiana</option>
        </select>
      </label>

      <label className="flex flex-col">
        Destination
        <select className="border p-1">
          <option value="">Select Airport</option>
          <option>Lincoln, Nebraska</option>
          <option>Iowa City, Iowa</option>
          <option>Evanston, Illinois</option>
          <option>West Lafayette, Indiana</option>
        </select>
      </label>
      
      <label className="flex flex-col">
        Scheduled Takeoff Time
        <input
          className="border p-1"
          type="time"
          value={takeoffTime}
          onChange={(e) => setTakeoffTime(e.target.value)}
        />
      </label>

      <p className="text-xs text-gray-700 mt-1">
        Estimated Landing: <span className="font-bold">____</span>
      </p>

      <button className="bg-black text-white p-1 mt-2">
        Create Flight (does nothing)
      </button>
    </div>
  );
}
