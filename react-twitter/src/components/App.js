import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from '../fBase';

function App() {
  // authService.currentUser -> 유저를 가져와서 로그인 여부를 판단하도록 씀
  //console.log(authService.currentUser); // null를 반환함
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ?<AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;

// 초기화 됐다가 로그인 페이지를 보여줌
// {init ?<AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}