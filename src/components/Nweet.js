import { dbService } from "../fbase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";


const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`)
  const onDeleteClick = async () => {
    const ok = window.confirm("really delete?");
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false)
  }
  const onChange = (event) => {
    const { target: { value }, } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              placeholder="수정할 내용 입력"
              required
              onChange={onChange}
            />
            <button type="submit" value="Update">완료</button>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet