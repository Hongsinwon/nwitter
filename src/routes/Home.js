import React, { useEffect } from "react"; 
import { useState } from "react/cjs/react.development";
import Nweet from "components/Nweet"
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Home = ({ userObj }) => {
  //console.log(userObj)
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] =useState([]);

  useEffect(() =>{
    const q = query(collection(dbService, 'nweets'), orderBy("createdAt", "desc"));
    //onSnapshot은 기본적으로 데이터베이스에 무슨일이 있을 때 알림을 받는 것.
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setNweets(nweetArr);
        });
        }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId : userObj.uid,
      });
    setNweet("");
  }

  const onChange = (event) => {
    const {
      target:{value}
    } = event;
    setNweet(value)
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
      value={nweet} 
      onChange={onChange} 
      type="text"
      placeholder="당신의 생각은 어떤가요?" 
      maxLength={140}
      />
      <input type="submit" value="Nweet"/>
    </form>
    <div>
      {nweets.map(nweet => (
      <Nweet 
      key={nweet.id} 
      nweetObj={nweet} 
      isOwner={nweet.creatorId === userObj.uid}
      />
        )
      )}
    </div>
    </>
  )
}

export default Home;