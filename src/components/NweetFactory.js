import React,{ useState }  from "react";
import { dbService, storageService } from "fbase";
import {v4 as uuidv4} from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";


const NweerFactory = ({userObj}) => {
const [nweet, setNweet] = useState("");
const [attachment, setAttachment] = useState("");

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
 )
}

export default NweerFactory