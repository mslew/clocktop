import { useState, useEffect } from "react";

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
    /**async function fetchEvents() {
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
    }*/
  }, []);

  return {
    listEvents,
  };
}

export default useCalendar;
