import {HashRouter, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
  return (
    <HashRouter base="/">
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Routes>
        {isLoggedIn ? (
        <>
          <Route exact path="/" element={<Home userObj={userObj}/>}></Route>
          <Route exact path="/Profile" element={<Profile  userObj={userObj} refreshUser={refreshUser}/>}></Route>
        </> 
        ) : (
        <>
          <Route exact path="/" element={<Auth />}></Route>
        </>
        )}
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;