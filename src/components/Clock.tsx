function Clock({ time }: { time: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="grid grid-cols-7 w-full h-3/4">
        <div className="h-full flex flex-col items-center justify-center font-extrabold">
          {time}
          <p className="text-[30vh]">1</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh]">0</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh] pb-8">:</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh]">3</p>
        </div>
        <div className="flex flex-col items-center justify-center font-extrabold">
          <p className="text-[30vh]">4</p>
        </div>
        <div className="flex flex-col col-span-2 items-center justify-center font-extrabold">
          <p className="rotate-90 text-[30vh]">AM</p>
        </div>
      </div>
    </div>
  );
}

export default Clock;
