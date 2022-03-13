import "./App.css";
import React from "react";
import ResultsTable from "./components/Table";
import { db } from "./Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
  
function App() {
  const q = query(collection(db, "test4"), orderBy("time", "desc"));
  
  const [messages] = useCollectionData(q, { idField: 'id' });
  console.log(messages);
  
  return (
    <>
      <table class="table">
      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col">Images</th>
          <th scope="col">Number</th>
          <th scope="col">TimeStamp</th>
        </tr>
      </thead>
      <tbody>
        {messages && messages.map(msg => 
        <tr>
          {/* <th scope="row">1</th> */}
          <td><img src={msg.image} /></td>
          <td>{msg.plate}</td>
          <td>{msg.time}</td>
        </tr>
        )}
      </tbody>
    </table>
    </>
  );
}

export default App;
