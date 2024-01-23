import { createContext, useState, useEffect, useContext } from "react";
import {
  GoogleAuthProvider,
  User,
  signInWithCredential,
} from "firebase/auth/cordova";
import { auth } from "../../firebase";
import { gapi } from "gapi-script";

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContextDefaultValues: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(AuthContextDefaultValues);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
        console.log("signed in user poggers");
        setUser(user);
      } else {
        console.log("byebye gamer");
        setUser(null);
      }
    });
  }, [user]);

  const AuthData: AuthContextType = {
    user: user,
    login: handleAuthClick,
    logout: handleSignoutClick,
  };

  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
}
