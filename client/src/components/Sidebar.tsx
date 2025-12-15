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
    <div className="w-1/4 h-full bg-bg-primary/95 border border-bg-faded/70 px-4 sm:px-5 py-5 overflow-y-auto rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-3 gap-3">
        <div className="text-sm sm:text-base font-semibold tracking-[0.35em] text-fg-primary uppercase">
          LOGS
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-bg-secondary text-fg-primary text-sm sm:text-base border border-bg-faded/80 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary/35 focus:border-accent-primary transition"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="entity">A-Z</option>
        </select>
      </div>

      <div className="h-px bg-bg-faded/80 rounded-full mb-4" />

      {loading && data.length === 0 && (
        <div className="text-fg-faded text-sm animate-pulse">Loading…</div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-fg-faded text-sm italic">
          No logs yet.
        </div>
      )}

      {sortedData.length > 0 && (
        <div className="flex flex-col gap-3">
          {sortedData.map((log, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-bg-secondary border border-bg-faded/70 shadow-xs hover:shadow-sm transition"
            >
              <p className="text-sm font-semibold text-fg-primary">{log.entityName}</p>
              <p className="text-xs text-fg-faded mt-1">{log.updateType}</p>
              <p className="text-[11px] text-fg-secondary font-mono mt-3 text-right">
                {new Date(log.updateTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}