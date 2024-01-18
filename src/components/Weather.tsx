import CurrWeather from "./CurrWeather";
import FutWeather from "./FutWeather";

function Weather() {
    return (
      <div className="grid grid-rows-3 w-full h-full">
        <CurrWeather />
        <FutWeather />
      </div>
    );
  }

export default Weather;