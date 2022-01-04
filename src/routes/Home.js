import React, { useEffect } from "react"; 
import { useState } from "react/cjs/react.development";
import Nweet from "components/Nweet"
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

const Home = ({ userObj }) => {
  //console.log(userObj)
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] =useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl ="";
    if(attachment !== "") {
    //파일 경로 참조 만들기
    const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    //storage 참조 경로로 파일 업로드 하기
    const response = await uploadString(attachmentRef, attachment, "data_url");
    console.log(response);
    //storage에 있는 파일 URL로 다운로드 받기
     attachmentUrl = await getDownloadURL(response.ref);
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId : userObj.uid,
      attachmentUrl
    }
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet(""); 
    setAttachment("");
  }

  const onChange = (event) => {
    const {
      target:{value}
    } = event;
    setNweet(value)
  }

  const onFileChange = (event) => {
    const {
      target:{ files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment= () => setAttachment("")

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
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet"/>
      {attachment && (
      <div>
        <img src={attachment} width="50px" height="50px"/>
        <button onClick={onClearAttachment}>Clear</button>
      </div>
      )}
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