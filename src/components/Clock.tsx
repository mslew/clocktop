import { useDateAndTime } from "../contexts/DateAndTimeContext";

function Clock() {
  const { hour, minute, ampm } = useDateAndTime();

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
