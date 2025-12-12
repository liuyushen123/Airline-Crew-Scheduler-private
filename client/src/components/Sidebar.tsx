import { useState, useEffect } from 'react';
import { updateRecordService } from "../apiService";
import type { UpdateRecord } from "../types/UpdateRecord";

interface Props {
  refreshTrigger: number;
}

export default function Sidebar({ refreshTrigger }: Props) {
  const [data, setData] = useState<UpdateRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const fetchData = async () => {
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

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime();
    }
    if (sortBy === 'entity') {
      return a.entityName.localeCompare(b.entityName);
    }
    return 0;
  });

  return (
    <div className="w-1/4 h-full bg-[#020617] text-gray-200 border-l border-red-500/40 px-4 py-6 overflow-y-auto">

      <div className="flex justify-between items-center mb-3">
        <div className="text-md font-semibold tracking-[0.25em] text-red-400 uppercase">
          Logs
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#0f172a] text-gray-300 text-xs border border-gray-700 rounded px-2 py-1 focus:outline-none focus:border-red-500/50"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="entity">A-Z</option>
        </select>
      </div>

      <div className="h-px bg-red-500/40 rounded-full mb-4" />

      {loading && data.length === 0 && (
        <div className="text-gray-400 text-sm animate-pulse">Loading…</div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-gray-500 text-sm italic">
          No logs yet.
        </div>
      )}

      {sortedData.length > 0 && (
        <div className="flex flex-col gap-4">
          {sortedData.map((log, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#0f172a] border border-gray-800/60 shadow-sm hover:border-gray-700 transition-colors">
              <p className="text-sm font-semibold text-red-300">{log.entityName}</p>
              <p className="text-xs text-gray-400 mt-0.5">{log.updateType}</p>
              <p className="text-[10px] text-gray-600 font-mono mt-2 text-right">
                {new Date(log.updateTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}