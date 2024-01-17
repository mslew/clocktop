//1024x600
import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import "./App.css";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import DateDisplay from "./components/DateDisplay";
import Calendar from "./components/Calendar";

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  function refreshClock() {
    setDate(new Date());
  }
  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="w-full h-full grid grid-cols-4 grid-rows-6">
          <div className="col-span-3 row-span-5 text-white">
            <Clock time={date} />
          </div>
          <div className="row-span-6 text-white">
            <Weather />
          </div>
          <div className="row-span-2 col-span-2 text-white">
            <DateDisplay
              date={date}
            />
          </div>
          <div className="row-span-2 text-white">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
