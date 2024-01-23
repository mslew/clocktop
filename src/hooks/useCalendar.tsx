import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { useGapiContext } from "../contexts/GapiContext";

function useCalendar() {
  interface Event {
    startDate: {};
    endDate: {};
    summary: string;
  }
  const [events, setEvents] = useState<Event[]>([]);
  const { loaded } = useGapiContext();

  function listEvents() {
    return events;
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        setEvents([])
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
    if (loaded) {
      fetchEvents();
    }
  }, [loaded]);

  return {
    listEvents,
  };
}

export default useCalendar;
