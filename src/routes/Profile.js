import React from "react"; 
import { auth } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
      auth.signOut();
      navigate("/");
  };

   return (
   <>
   <button onClick={onLogOutClick}>로그아웃</button>
   </>
   );
};   

export default Profile;