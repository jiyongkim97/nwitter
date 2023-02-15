import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
  };
  const onchange = (event) => {
    const { target: { value },
    } = event;
    setNweet(value)
  };
  const onFileChange = (event) => {
    const { target: { files }, } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result }, } = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <div className="nweetToday">오늘 당신의 목표는 무엇인가요?</div>
      <input value={nweet}
        onChange={onchange}
        type="text"
        placeholder=""
        maxLength={120}
        className="nweetInput" />
      {/* <input type="file" 
      accept="image/*" 
      onChange={onFileChange} 
     className="nweetChooseImg"/>
    <input type="submit" value="등록하기" />
    {attachment &&( <div>
      <img src={attachment} width="100px" height="100px" padding-left="40%" />
      <button onClick={onClearAttachment}>Clear Photo</button>
      </div>
      )} */}
    </form>)
}
export default NweetFactory