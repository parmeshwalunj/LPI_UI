import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC_8KVF3fo25E4hcFX-AEHKY3k0Sl2muII",
  authDomain: "lip-demo.firebaseapp.com",
  databaseURL: "https://lip-demo-default-rtdb.firebaseio.com",
  projectId: "lip-demo",
  storageBucket: "lip-demo.appspot.com",
  messagingSenderId: "104538977589",
  appId: "1:104538977589:web:dbeb64cc44064b4ba0887c",
  measurementId: "G-XP61FNYFJQ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,app,auth}; 

