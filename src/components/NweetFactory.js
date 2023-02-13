import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React,{ useState } from "react";

const NweetFactory = ({userObj}) => {
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
    const {target: {files},} =event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget: {result},} = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment =() => setAttachment("");

  return(
  <form onSubmit={onSubmit}>
    <input value={nweet}
      onChange={onchange}
      type="text"
      placeholder="what's on your mind"
      maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
    <input type="submit" value="Nweet" />
    {attachment &&( <div>
      <img src={attachment} width="50px" height="50px" />
      <button onClick={onClearAttachment}>Clear Photo</button>
      </div>
      )}
  </form>)
}
export default NweetFactory