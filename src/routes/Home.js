import { dbService, storageService } from "../fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore"
import React, { useState, useEffect } from "react";
import Nweet from "../components/Nweet";
import {ref, uploadString } from "@firebase/storage"
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
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

 
  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div className="hello">
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid} 
           />
        )
        )}
      </div>
    </div>)
}

export default Home