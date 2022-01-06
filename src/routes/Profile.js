import React, { useEffect, useState  }  from "react"; 
import { auth } from "fbase";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";



const Profile = ({refreshUser, userObj}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    
    const onLogOutClick = () => {
      auth.signOut();
      navigate("/");
      
  };

  const getMyNweets = async() => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      }); 
  };

  useEffect(() => {getMyNweets()}, [])
  

  const onChange = (event) => {
    const {
      target : {value},
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(await auth.currentUser, {
    displayName: newDisplayName,
    });
    refreshUser();
    }

   return (
   <>
   <form onSubmit={onSubmit}>
     <input 
     value={newDisplayName}
     onChange={onChange}
     type="text" 
     placeholder="새 닉네임을 적어주세요."
     />
     <input type="submit" value="저장" />
   </form>
   <button onClick={onLogOutClick}>로그아웃</button>
   </>
   );
};   

export default Profile;