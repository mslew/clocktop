import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { Common } from "googleapis";
import { auth } from "../../firebase";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";

function Calendar() {
  interface Event{
    startDate: {}
    endDate: {}
    summary: string
  }

  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  async function handleAuthClick() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = GoogleAuthProvider.credential(token);
    await signInWithCredential(auth, credential);
  }

  function handleSignoutClick() {
    auth.signOut();
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

        gapi.client.load("calendar", "v3", () =>
          console.log("loaded calendar")
        );
      });
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getCalendar();
      } else {
        setUser(null);
      }
    });

    async function getCalendar() {
      try {
        const events = await gapi.client.calendar.events.list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        });
        const data = JSON.parse(events.body).items
        for(let i = 0; i < data.length; i++){
          let startDate: {} = data[i].start
          let endDate: {} = data[i].end
          let summary: string = data[i].summary
          let event: Event = {
            startDate: startDate,
            endDate: endDate,
            summary: summary
          }
          console.log(event)
          setEvents((events) => [...events, event]);
        }
      } catch (err) {
        console.log(err)
      }
    }
    initClient();
  }, [user]);

  return (
    <div className="flex flex-col h-full w-full gap-2 justify-center">
      {user ? (
        <button className="border rounded p-1" onClick={handleSignoutClick}>
          Sign Out
        </button>
      ) : (
        <button className="border rounded p-1" onClick={handleAuthClick}>
          Authorize Google Calendar
        </button>
      )}
    </div>
    /** 
    <div className="flex flex-row h-full w-full gap-4 justify-center ">
      <svg
        className="fill-white"
        xmlns="http://www.w3.org/2000/svg"
        height="50"
        width="50"
        viewBox="0 0 448 512"
      >
        <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
      </svg>
      <p className="text-[4vh]">Meeting at 10am</p>
    </div>
    */
  );
}

export default Calendar;
