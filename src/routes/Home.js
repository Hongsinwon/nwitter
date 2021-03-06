import React, { useEffect } from "react"; 
import { useState } from "react";
import Nweet from "components/Nweet"
import NweetFactory from "components/NweetFactory"
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Home = ({ userObj }) => {
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

  return (
    <>
    <div className="home">
      <NweetFactory userObj={userObj} />
      {nweets.map(nweet => (
      <div className="content">
      <Nweet 
      key={nweet.id} 
      userName={userObj.displayName}
      nweetObj={nweet} 
      isOwner={nweet.creatorId === userObj.uid}
      />
      </div>
        )
      )}
    </div>
    <address> &copy; Copyright 2022 , Hong sinwon . All Rights Rexerved</address>
    </>
  )
}

export default Home;