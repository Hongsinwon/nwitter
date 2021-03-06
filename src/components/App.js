import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(user) {
        setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
         // date: date.toString();
        });
      } else {
        setUserObj(null);
      }
      setInit(true);

    })
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  //<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  return (
    <>
  {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : <p className="Initializing">Initializing... ...</p>}
  </>
  )
}

export default App;
