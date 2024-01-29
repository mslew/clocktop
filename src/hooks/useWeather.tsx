import { useEffect, useState } from "react";
import { useGeolocation } from "react-use";

type FutureTemp = {
  date: Date;
  maxTemp: number;
  minTemp: number;
  icon: string;
};

type CurrTemp = {
  temp: number;
  icon: string;
};

function useWeather() {
  const [futureTemps, setFutureTemps] = useState<FutureTemp[]>([]);
  const [currTemp, setCurrTemp] = useState<CurrTemp>({ temp: 0, icon: "" });
  const [futTimer, setFutTimer] = useState<boolean>(false);
  const [currTimer, setCurrTimer] = useState<boolean>(false);
  const coords = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
  });
  console.log(coords);
  //TODO: Fix Coordinates needing a double re-render to load? Most likely rewrite this to be better... :)
  /**useEffect(() => {
    setInterval(() => {
      //timer to pull weather data every 30 mins
      setCurrTimer(!currTimer);
    }, 1000 * 60 * 30);

    async function fetchWeather() {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${coords?.latitude},${coords?.longitude}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        let icon: string = data.current.condition.icon;
        let iconList: string[] = icon.split("/");
        iconList[4] = "128x128";
        icon = iconList.join("/");
        setCurrTemp({
          temp: Math.round(data.current.temp_f),
          icon: icon,
        });
      } else {
        console.log("error fetching weather");
      }
    }
    if (!coords.loading) {
      fetchWeather();
    }
  }, [currTimer, coords]);

  useEffect(() => {
    setInterval(() => {
      //trigger API call once midnight is reached to update future days
      setFutureTemps([]);
      setFutTimer(!futTimer);
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

      if (response.ok && coords !== null) {
        setFutureTemps([]);
        const data = await response.json();
        for (let i = 1; i < 4; i++) {
          let date: Date = new Date(data.forecast.forecastday[i].date);
          date = new Date(date.getTime() + date.getTimezoneOffset() * 60000); //this gives correct dates
          let maxTemp: number = data.forecast.forecastday[i].day.maxtemp_f;
          let minTemp: number = data.forecast.forecastday[i].day.mintemp_f;
          let icon: string = data.forecast.forecastday[i].day.condition.icon;
          let newTemp: FutureTemp = {
            date: date,
            maxTemp: maxTemp,
            minTemp: minTemp,
            icon: icon,
          };
          setFutureTemps((temps) => [...temps, newTemp]);
        }
      } else {
        console.log("error fetching weather");
      }
    }
    if (!coords.loading) {
      fetchWeather();
    }
  }, [futTimer, coords]);*/

  return {
    futureTemps,
    currTemp,
  };
}

export default useWeather;
