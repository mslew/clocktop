import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

function useCalendar() {
  interface Event {
    startDate: {};
    endDate: {};
    summary: string;
  }
  const [events, setEvents] = useState<Event[]>([]);

  function listEvents() {
    return events;
  }

  useEffect(() => {
    function initClient() {
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
          fetchEvents();
        });
      });
    }
    async function fetchEvents() {
      try {
        const eventsFromCalendar = await gapi.client.calendar.events.list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        });
        const data = JSON.parse(eventsFromCalendar.body).items;
        for (let i = 0; i < data.length; i++) {
          let startDate: {} = data[i].start;
          let endDate: {} = data[i].end;
          let summary: string = data[i].summary;
          let newEvent: Event = {
            startDate: startDate,
            endDate: endDate,
            summary: summary,
          };
          setEvents((events) => [...events, newEvent]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    initClient();
  }, []);

  return {
    listEvents,
  };
}

export default useCalendar;
