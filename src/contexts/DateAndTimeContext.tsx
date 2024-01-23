import { createContext, useState, useEffect, useContext } from "react";

type DataAndTimeContextType = {
  date: Date;
  hour: string | number;
  minute: string | number;
  ampm: string;
};

const DateAndTimeContextDefaultValues: DataAndTimeContextType = {
  date: new Date(),
  hour: "",
  minute: "",
  ampm: "",
};

const DateAndTimeContext = createContext(DateAndTimeContextDefaultValues);

export function useDateAndTime() {
  return useContext(DateAndTimeContext);
}

export function DateAndTimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [hour, setHour] = useState<string | number>("");
  const [minute, setMinute] = useState<string | number>("");
  const [ampm, setAmpm] = useState<string>("");

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [date]);

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setHour(hours);
    setMinute(minutes);
    setAmpm(ampm);
  }, [date]);

  const dateAndTimeData: DataAndTimeContextType = {
    date: date,
    hour: hour,
    minute: minute,
    ampm: ampm,
  };

  return (
    <DateAndTimeContext.Provider value={dateAndTimeData}>
      {children}
    </DateAndTimeContext.Provider>
  );
}
