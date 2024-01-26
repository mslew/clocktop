import date from "date-and-time";
import useWeather from "../hooks/useWeather";

interface Temp {
  date: Date;
  maxTemp: number;
  minTemp: number;
  icon: string;
}

function FutWeatherDay({ temp }: { temp: Temp }) {
  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <p className="pb-1">{date.format(temp.date, "ddd")}</p>
      <img className="" src={temp.icon} alt="weather icon" />
      <p className="pt-6 text-center">{Math.round(temp.minTemp)}°F</p>
      <p className="text-center">{Math.round(temp.maxTemp)}°F</p>
    </div>
  );
}

function FutWeather() {
  const { futureTemps } = useWeather();
  return (
    <div className="grid grid-cols-3">
      {futureTemps.map((temp, index) => (
        <FutWeatherDay temp={temp} key={index} />
      ))}
    </div>
  );
}

export default FutWeather;
