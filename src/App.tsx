//1024x600
import "./App.css";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import DateDisplay from "./components/DateDisplay";
import { DateAndTimeProvider } from "./contexts/DateAndTimeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Calendar from "./components/Calendar";
import { useEffect } from "react";
import { gapi } from "gapi-script";

function App() {
  useEffect(() => {
    gapi.load("client", () => {
      console.log("loaded client");
      gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events.readonly",
      });
      gapi.client.load("calendar", "v3", () => {
        console.log("loaded calendar");
      });
    });
  }, [])

  return (
    <DateAndTimeProvider>
      <AuthProvider>
        <div className="flex flex-col h-screen w-screen justify-center items-center">
          <div className="w-full h-full grid grid-cols-4 grid-rows-6">
            <div className="col-span-3 row-span-5 text-white">
              <Clock />
            </div>
            <div className="row-span-6 text-white">
              <Weather />
            </div>
            <div className="row-span-2 col-span-2 text-white">
              <DateDisplay />
            </div>
            <div className="row-span-2 text-white">
              <Calendar />
            </div>
          </div>
        </div>
      </AuthProvider>
    </DateAndTimeProvider>
  );
}

export default App;
