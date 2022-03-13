import { db } from "../Firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// import { db } from "./Firebase";
import { query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
  
// const numplateCollectionRef = collection(db, "test4");
const q = query(collection(db, "test4"), orderBy("time","desc"));

class NumplateDataService {
  getAllPlates = () => {    
    console.log(getDocs(q))
    return getDocs(q)
  };
}

// class NumplateDataService {
//   getAllPlates = () => {  
//   const cities = [];     
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     // global cities;
//     querySnapshot.forEach((doc) => {
//         cities.push(doc.data());
//     });
//     console.log("Current cities in CA: ", cities.join(", "));
//   });
  
//     // return getDocs(numplateCollectionRef)
//     console.log(cities);
//     return cities;
//   };
// }
export default new NumplateDataService();
