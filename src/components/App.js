import React, { useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  //console.log(auth.currentUser)
  return (
    <>
  <AppRouter isLoggedIn={isLoggedIn} />
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  )
}

export default App;
