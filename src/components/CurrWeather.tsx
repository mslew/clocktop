import { useState, useEffect } from "react";
import { useGeolocated } from 'react-geolocated';

function CurrWeather() {
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>("");
  const {coords} = useGeolocated({
    positionOptions:{
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_API_KEY_OG
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
        setTemp(Math.round(data.current.temp_f));
        let icon: string = data.current.condition.icon;
        let iconList: string[] = icon.split("/");
        iconList[4] = "128x128";
        icon = iconList.join("/");
        setIcon(icon);
      } else {
        console.log("error fetching weather");
      }
    }
    if(coords != null){
      fetchWeather();
    }
  }, [coords]);

  return (
    <div className="flex flex-col row-span-2 items-center justify-center gap-8">
      <img className="" src={icon} alt="weather icon" />
      <p className="text-[12vh]">{temp}°F</p>
    </div>
  );
}

export default CurrWeather;
