import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

function Calendar() {
  const [user, setUser] = useState<User | null>(null);

  function handleAuthClick() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function handleSignoutClick() {
    auth.signOut();
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    });
    console.log(user);
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
