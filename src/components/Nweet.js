import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

//isOwner는 다이나믹한 props이고 true & false가 될 수 있다.
const Nweet = ({nweetObj, isOwner, userName}) => {

  //editing는 기본적으로 nweet를 수정하고 있는지 아닌지를 뜻한다.
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    //먼저 user를 확인하고 nweet를 지우길 원하는지 확인한다. 
    const ok = window.confirm("정말로 nweet을 삭제하시겠습니까?");
    if(ok) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
    nweetObj.previewUrl &&
    (await deleteObject(ref(storageService, nweetObj.previewUrl)));
    }
  }

const toggleEditing = () =>  setEditing((prev) => !prev);

const onSubmit= async (event) => {
  event.preventDefault();
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  await updateDoc(NweetTextRef, {
    text: newNweet,
    });
    setEditing(false);
}

const onChange = (event) => {
  const {
    target : {value},
  } = event;
  setNewNweet(value);
};

  return (
  <div>
    {
      editing ? (
      <div className="textwarp">
        <div className="textcontent">
        <form onSubmit={onSubmit}  >
           <textarea
            className="correctioninput"
              type="text" 
              placeholder="수정할 내용을 입력해주세요." 
              value={newNweet} 
              onChange={onChange}
              required 
          />
          <div className="setting">
          <input type="submit" value="수정완료" className="complete"/>
          <button onClick={toggleEditing} className="cencebtn">취소</button>
          </div>
          </form>
          </div>
      </div>
      ) :(
      <div className="textwarp">
        <div className="textcontent">
        {nweetObj.attachmentUrl && <img className="contentimg" src={nweetObj.attachmentUrl} />}
        <p className="todaytitle">[ 오늘의 기록 ]  <span className="nickname">{userName}님 작성</span></p>
        <h4 className="text">{nweetObj.text}</h4>
      {isOwner && (
      <div className="setting">
        <button className="correction" onClick={toggleEditing}>수정</button>
        <button className="delete" onClick={onDeleteClick}>삭제</button> 
     </div>
    )}
    </div>
    </div>
      )
    }
  </div>
)
} 

export default Nweet;