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
    <div className="w-1/4 h-full bg-bg-primary text-gray-200 border border-accent-faded px-4 py-6 overflow-y-auto rounded-md">

      <div className="flex justify-between items-center mb-3">
        <div className="text-lg font-semibold tracking-[0.25em] text-fg-primary">
          LOGS
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-bg-secondary text-fg-faded text-xl border border-bg-faded rounded-sm px-4 py-2 mr-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="entity">A-Z</option>
        </select>
      </div>

      <div className="h-px bg-accent-faded rounded-full mb-4" />

      {loading && data.length === 0 && (
        <div className="text-fg-faded text-sm animate-pulse">Loading…</div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-fg-faded text-sm italic">
          No logs yet.
        </div>
      )}

      {sortedData.length > 0 && (
        <div className="flex flex-col gap-4">
          {sortedData.map((log, idx) => (
            <div key={idx} className="p-3 rounded-md bg-bg-secondary border border-bg-faded transition-colors">
              <p className="text-sm font-semibold text-fg-secondary">{log.entityName}</p>
              <p className="text-xs text-fg-faded mt-0.5">{log.updateType}</p>
              <p className="text-[10px] text-fg-secondary font-mono mt-2 text-right">
                {new Date(log.updateTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}