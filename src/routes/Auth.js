
import { authService } from "../fbase";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const auth = getAuth();
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target: {name,value}} = event;
    if(name ==="email"){
      setEmail(value)
    } else if(name === "password"){
      setPassword(value)
    }
   }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
    target: { name },
    } = event;
    let provider;
    try {
    if (name === "google") {
    provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    } else if (name === "github") {
    provider = new GithubAuthProvider();
    const result = await signInWithPopup(authService, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    }
    } catch (error) {
    console.log(error);
    }
    };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
        name="email"
          type="text"
          placeholder="Email"
          required
          value={email} 
          onChange={onChange}/>
        <input
        name="password"
          type="password"
          placeholder="Password"
          required
          value={password} 
          onChange={onChange}/>
        <input
          type="submit"
          value={newAccount ? "create new account" : "log in"} />
          {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sing in" : "Create Account"}
      </span>
      <button name="google" onClick={onSocialClick}>continue with google</button>
      <button name="github" onClick={onSocialClick}>continue with github</button>
    </div>
  )

}
export default Auth;