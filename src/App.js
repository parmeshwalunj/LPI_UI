import "./App.css";
import { app, auth } from "./Firebase";
import Login from "./components/Login";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import Thome from "./components/Thome";
import useGeoLocation from "./hooks/useGeoLocation";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const location = useGeoLocation();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    clearErrors();
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-login":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
  };
  // const handleLogin = () => {
  //   clearErrors();
  //   app
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "auth/invalid-login":
  //         case "auth/user-disabled":
  //         case "auth/user-not-found":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/wrong-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };

  // const handleSignup = () => {
  //   clearErrors();
  //   app
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "auth/email-already-in-use":
  //         case "auth/invalid-email":
  //           setEmailError(err.message);
  //           break;
  //         case "auth/weak-password":
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };
  const handleSignup = () => {
    clearErrors();
    createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    });
  };
  const handleLogout = () => {
    signOut(auth);
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      clearInputs();
      setUser(user);
    } else {
      setUser("");
    }
  });
  // const authListener = () => {
  //   app.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser("");
  //     }
  //   });
  // };
  // useEffect(() => {
  //   authListener();
  // }, []);
  return (
    <div className="App">
      {
        location.loaded ? (
          user ? (
            <>
            {/* <marquee>{JSON.stringify(location)}</marquee> */}
            <Thome email={user.email} handleLogout={handleLogout} />
            </>
          ) : (
            <>
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
            </>
          )
        ):(
          <h1>To proceed Allow location access.</h1>
        )
      }
    </div>
  );
};

export default App;
