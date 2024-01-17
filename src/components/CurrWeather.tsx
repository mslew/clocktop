import { useState, useEffect } from "react";

function CurrWeather() {
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  useEffect(() => {
    function fetchLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            if(lat != 0){
              fetchWeather();
            }
          },
          function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            }
          }
        );
      } else {
        console.error("Geolocation is not available in this browser.");
      }
    }

    async function fetchWeather() {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${lat},${long}`,
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
        console.log(data.current.temp_f);
        setTemp(Math.round(data.current.temp_f));
        setIcon(data.current.condition.icon);
      } else {
        console.log("error fetching weather");
      }
    }
    fetchLocation();
  }, [lat]);

  return (
    <div className="flex flex-col row-span-2 items-center justify-center gap-8">
      <img
      className=""
      src={icon}
      alt="icon"
      />
      <p className="text-[13vh]">{temp}°F</p>
    </div>
  );
}

export default CurrWeather;
