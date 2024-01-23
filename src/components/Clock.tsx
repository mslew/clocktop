import { useState, useEffect } from "react";

function Clock() {
    const [hour, setHour] = useState<number | null>(null);
    const [minute, setMinute] = useState<number | string | null>(null);
    const [ampm, setAmpm] = useState<string | null>(null);
    
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-row justify-center w-full h-3/4">
        <div className="h-full flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh]">{hour}</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh] pb-8">:</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh]">{minute}</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="rotate-90 text-[30vh]">{ampm}</p>
        </div>
      </div>
    </div>
  );
}

export default Clock;
