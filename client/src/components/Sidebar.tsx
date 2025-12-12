import { useState, useEffect } from 'react';
import { updateRecordService } from "../apiService";
import type { UpdateRecord } from "../types/UpdateRecord";

interface Props {
  refreshTrigger: number;
}

export default function Sidebar({ refreshTrigger }: Props) {
  const [data, setData] = useState<UpdateRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      setLoading(true);

      try {
        const response = await updateRecordService.getUpdateRecords();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching update logs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="w-[260px] h-full bg-[#020617] text-gray-200 border-l border-red-500/40 px-4 py-6 overflow-y-auto">

      <div className="text-xs font-semibold tracking-[0.25em] text-red-400 mb-3">
        LOG SIDEBAR
      </div>

      <div className="h-px bg-red-500/40 rounded-full mb-4" />

      {loading && (
        <div className="text-gray-400 text-sm">Loading…</div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-gray-500 text-sm italic">
          No logs yet.
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="flex flex-col gap-4">
          {data.map((log, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-[#0f172a] border border-gray-700">
              <p className="text-sm font-semibold text-red-300">{log.entityName}</p>
              <p className="text-xs text-gray-400">{log.updateType}</p>
              <p className="text-[10px] text-gray-500">{log.updateTime}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
