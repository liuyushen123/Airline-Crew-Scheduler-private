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

  if (data.length === 0) {
    return (
      <div className="w-1/4 h-full bg-[#111827] text-gray-200 p-4">
        log sidebar
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-1/4 h-full bg-[#111827] text-gray-200 p-4">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-1/4 h-full bg-[#111827] text-gray-200 p-4">
      {data.map((log: UpdateRecord, idx) => {
        return (
          <div key={idx} className='flex flex-col flex-1' >
            <p>{log.entityName}</p>
            <p>{log.updateType}</p>
            <p>{log.updateTime}</p>
          </div>
      )})}
    </div>
  );
}
