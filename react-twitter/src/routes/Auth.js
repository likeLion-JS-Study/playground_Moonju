import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService, firebaseInstance } from "../fBase";

const Auth = () =>{
                                    // 기본값은 비어있다
                                    // Hook
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  // useState 초기값 false
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: {name, value},
    } = event;
    if (name === "email"){
      setEmail(value);
    }else if (name === "password"){
      setPassword(value);
    }
  };
  // preventDefault -> 내가 컨트롤 시킴.
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // newAccount의 이전 값을 가져와서 그 값에 반대되는 것을 리턴
  const toggleAccount = () => setNewAccount((prev) => !prev); 

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder='Email' 
          required value={email} 
          onChange={onChange}
        />
        <input 
          name="password" 
          type="password" 
          placeholder='Password' 
          required value={password} 
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        { error }
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;

// input -> 1. onChange 이벤트를 가지고 있다. 2. vaule 값도 갖고 있다.
// input을 변경할 때마다 onChange function을 호출함.
// onChange function은 input에 입력한 값들을 토대로 저장시킨다.
// input의 value는 state에 저장 됌.
// input이 바뀌는 순간마다 state도 바뀐다.

// 계정 생성, 로그인
// 팝업 