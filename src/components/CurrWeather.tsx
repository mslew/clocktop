import useWeather from "../hooks/useWeather";


function CurrWeather() {
  const {currTemp} = useWeather()
  return (
    <div className="flex flex-col row-span-2 items-center justify-center gap-8">
      <img className="" src={currTemp.icon} alt="weather icon" />
      <p className="text-[12vh]">{currTemp.temp}°F</p>
    </div>
  );
}

export default CurrWeather;
