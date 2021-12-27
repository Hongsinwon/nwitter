import React from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { useState } from "react/cjs/react.development";

//isOwner는 다이나믹한 props이고 true & false가 될 수 있다.
const Nweet = ({nweetObj, isOwner}) => {
  //editing는 기본적으로 nweet를 수정하고 있는지 아닌지를 뜻한다.
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 nweet을 삭제하시겠습니까?");
    if(ok) {
      const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
      await deleteDoc(NweetTextRef);
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
      <>
        <form onSubmit={onSubmit}>
           <input 
              type="text" 
              placeholder="수정할 내용을 입력해주세요." 
              value={newNweet} 
              onChange={onChange}
              required 
          />
          <input type="submit" value="수정완료" />
          </form>
          <button onClick={toggleEditing}>취소</button>
      </>
      ) :(
      <>
        <h4>{nweetObj.text}</h4>
      {isOwner && (
      <>
        <button onClick={onDeleteClick}>삭제</button> 
        <button onClick={toggleEditing}>수정</button>
     </>
    )}
    </>
      )
    }
  </div>
)
} 

export default Nweet;