import { createContext, useState, useEffect, useContext } from "react";
import { gapi } from "gapi-script";

const GapiContext = createContext(false);

export function useGapiContext() {
  return useContext(GapiContext);
}

export function GapiProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState<boolean>(false);

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
        setLoaded(true);
      });
    });
  }, []);
  return <GapiContext.Provider value={loaded}>{children}</GapiContext.Provider>;
}
