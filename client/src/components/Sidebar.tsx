import { useState, useEffect } from "react";
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
        console.error("Error fetching update logs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <aside className="w-[360px] min-w-[320px] h-full p-6 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold tracking-[0.25em] text-[var(--color-fg-muted)]">
            LOGS
          </p>
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]" />
        </div>
        <p className="text-sm text-[var(--color-fg-secondary)]">Loading...</p>
      </aside>
    );
  }

  if (data.length === 0) {
    return (
      <aside className="w-[360px] min-w-[320px] h-full p-6 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold tracking-[0.25em] text-[var(--color-fg-muted)]">
            LOGS
          </p>
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]" />
        </div>
        <p className="text-sm text-[var(--color-fg-secondary)] italic">No logs yet.</p>
      </aside>
    );
  }

  return (
    <aside className="w-[360px] min-w-[320px] h-full p-6 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-[0.25em] text-[var(--color-fg-muted)]">
          LOGS
        </p>
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]" />
      </div>

      <div className="flex flex-col gap-3">
        {data.map((log: UpdateRecord, idx) => {
          return (
            <div
              key={idx}
              className="rounded-xl border border-[var(--color-border)] bg-white p-3 shadow-sm"
            >
              <p className="text-sm font-semibold text-[var(--color-fg-primary)]">
                {log.entityName}
              </p>
              <p className="text-xs text-[var(--color-fg-secondary)]">
                {log.updateType}
              </p>
              <p className="text-xs text-[var(--color-fg-muted)]">
                {log.updateTime}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
