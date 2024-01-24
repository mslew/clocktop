import { useAuthContext } from "../contexts/AuthContext";
import useCalendar from "../hooks/useCalendar";

type HourAmPm = {
  hour: number;
  ampm: string;
};

function Calendar() {
  const { user, login, logout } = useAuthContext();
  const { events } = useCalendar();

  function convertTime(hours: number): HourAmPm {
    let time: HourAmPm = {
      hour: 0,
      ampm: "",
    };
    let newHours: number = hours;
    let newFormat: string = hours >= 12 ? "PM" : "AM";
    newHours = newHours % 12;
    newHours = newHours === 0 ? 12 : newHours;
    time = {
      hour: newHours,
      ampm: newFormat,
    };
    console.log(time);
    return time;
  }

  return (
    <div className="flex flex-col-reverse h-full w-full gap-2 justify-center">
      {user ? (
        <button className="border rounded p-1" onClick={logout}>
          Sign Out
        </button>
      ) : (
        <button className="border rounded p-1" onClick={login}>
          Authorize Google Calendar
        </button>
      )}
      <div className="flex flex-row gap-4">
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          height="50"
          width="50"
          viewBox="0 0 448 512"
        >
          <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
        </svg>
        {events.slice(0, 1).map((event, index) => (
          <div className="flex flex-col" key={index}>
            <p className="text-[4vh]">
              {convertTime(event.startDate.dateTime.getHours()).hour}{" "}
              {convertTime(event.startDate.dateTime.getHours()).ampm} {" - "}
              {convertTime(event.endDate.dateTime.getHours()).hour}{" "}
              {convertTime(event.endDate.dateTime.getHours()).ampm}
            </p>
            <p className="text-[3vh]">{event.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
