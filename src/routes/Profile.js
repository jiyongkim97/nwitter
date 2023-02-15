import { dbService } from "fbase";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = (userObj) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", `${userObj.uid}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, [])
  return (
    <button onClick={onLogOutClick} className="profileRogout">
      로그아웃
    </button>
  );
};

export default Profile;