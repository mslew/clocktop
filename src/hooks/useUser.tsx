import { GoogleAuthProvider, User, signInWithCredential } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { gapi } from "gapi-script";

function useUser() {
  const [user, setUser] = useState<User | null>(null);

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("signed in user poggers")
        setUser(user);
      } else {
        console.log("byebye gamer")
        setUser(null);
      }
    });
  }, [user]);

  return {
    user,
    handleAuthClick,
    handleSignoutClick
  }
}

export default useUser;