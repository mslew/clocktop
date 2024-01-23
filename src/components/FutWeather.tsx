import { useState, useEffect } from "react";
import { useGeolocation } from "react-use";
import date from "date-and-time";

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
  const [temps, setTemps] = useState<Temp[]>([]);
  const [timer, setTimer] = useState<boolean>(false);
  const coords  = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 1000 * 60 * 30,
  });

  useEffect(() => {
    setInterval(async () => {
      //trigger API call once midnight is reached to update future days
      setTemps([])
      setTimer(!timer);
    }, msUntilMidnight() + 30000); //adding 30 seconds here after midnight for API to update

    function msUntilMidnight() {
      let midnight = new Date();
      midnight.setHours(24);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);
      return midnight.getTime() - new Date().getTime();
    }

    async function fetchWeather() {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${coords?.latitude},${coords?.longitude}&days=4`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTemps([])
        const data = await response.json();
        for (let i = 1; i < 4; i++) {
          let date: Date = new Date(data.forecast.forecastday[i].date);
          date = new Date(date.getTime() + date.getTimezoneOffset() * 60000); //this gives correct dates
          let maxTemp: number = data.forecast.forecastday[i].day.maxtemp_f;
          let minTemp: number = data.forecast.forecastday[i].day.mintemp_f;
          let icon: string = data.forecast.forecastday[i].day.condition.icon;
          let newTemp: Temp = {
            date: date,
            maxTemp: maxTemp,
            minTemp: minTemp,
            icon: icon,
          };
          setTemps((temps) => [...temps, newTemp]);
        }
      } else {
        console.log("error fetching weather");
      }
    }
    if (coords != null) {
      fetchWeather();
    }
  }, [coords, timer]);

  return (
    <div className="grid grid-cols-3">
      {temps.map((temp, index) => (
        <FutWeatherDay temp={temp} key={index} />
      ))}
    </div>
  );
}

export default FutWeather;
