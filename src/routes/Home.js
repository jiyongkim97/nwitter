import { dbService } from "../fbase";
import {addDoc, collection, getDocs, query, onSnapshot, orderBy} from "firebase/firestore"
import React, { useState, useEffect } from "react";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
  const [nweet,setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const q = query(collection(dbService, "nweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    const nweetObj = {
    ...doc.data(),
    id: doc.id,
    
    }
    setNweets(prev => [nweetObj, ...prev]);
    });
    };
    useEffect(() => {
      const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      }));
      setNweets(nweetArray);
      });
      }, []);
      
  const onSubmit = async(event) => {
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
    const {target:{value},
  } = event;
  setNweet(value)
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onchange} type="text" placeholder="what's on your mind" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
         <Nweet 
         key={nweet.id} 
         nweetObj={nweet} 
         isOwner={nweet.creatorId === userObj.uid}/>
        )
        )}
      </div>
    </div>)
}

export default Home