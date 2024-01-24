import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { useGapiContext } from "../contexts/GapiContext";
import { useAuthContext } from "../contexts/AuthContext";

function useCalendar() {
  interface Event {
    startDate: {
      dateTime: Date;
      timeZone: string;
    };
    endDate: {
      dateTime: Date;
      timeZone: string;
    };
    summary: string;
  }
  const { user } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const { loaded } = useGapiContext();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setEvents([]);
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
          let startDate: {
            dateTime: Date;
            timeZone: string;
          } = data[i].start;
          let endDate: {
            dateTime: Date;
            timeZone: string;
          } = data[i].end;
          let summary: string = data[i].summary;
          let newEvent: Event = {
            startDate: {
              dateTime: new Date(startDate.dateTime),
              timeZone: startDate.timeZone,
            },
            endDate: {
              dateTime: new Date(endDate.dateTime),
              timeZone: endDate.timeZone,
            },
            summary: summary,
          };
          console.log(newEvent);
          setEvents((events) => [...events, newEvent]);
        }
      } catch (err) {
        setEvents([]);
      }
    }
    if (loaded && user) {
      fetchEvents();
    }
    if(!user){
      setEvents([])
    }
  }, [loaded, user]);

  return {
    events,
  };
}

export default useCalendar;
