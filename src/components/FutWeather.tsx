import { useState, useEffect } from "react";
import { useGeolocated } from 'react-geolocated';

function FutWeather() {
    interface Temp{
        date: string
        maxTemp: number
        minTemp: number
        icon: string
    }
    const [temps, setTemps] = useState<Temp[]>([])
    const {coords} = useGeolocated({
        positionOptions:{
          enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
      })

  useEffect(() => {
    async function fetchWeather() {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_API_KEY_OG
          }&q=${coords?.latitude},${coords?.longitude}&days=3`,
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
          console.log(data);
          for (let i = 0; i < 1; i++){
            let date: string = data.forecast.forecastday[i].date
            let maxTemp: number = data.forecast.forecastday[i].day.maxtemp_f
            let minTemp: number = data.forecast.forecastday[i].day.mintemp_f
            let icon: string = data.forecast.forecastday[i].day.condition.icon
            let newTemp: Temp = {
                date: date,
                maxTemp: maxTemp,
                minTemp: minTemp,
                icon: icon
            }
            setTemps(temps => [...temps, newTemp])
          }
        } else {
          console.log("error fetching weather");
        }
      }
      if(coords != null){
        //fetchWeather();
      }
  }, [coords]);

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col items-center pt-2">
        <p className="pb-4">date</p>
        <p className="pt-12">82°F - 82°F</p>
      </div>
    </div>
  );
}

export default FutWeather;
