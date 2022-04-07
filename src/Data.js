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


function Data({language}) {
  const q = query(collection(db, "test4"), orderBy("time", "desc"));
  
  const [messages] = useCollectionData(q, { idField: 'id' });
  // console.log(messages);
  
  return (
    <>
    {language.isMarathi ? (
    <div>
    <table className="table table-hover" style={{
                      padding: '50px',
                    }}>
    <thead className="table-dark">
      <tr style={{height: '50px'}}>
        {/* <th scope="col">#</th> */}
        <th scope="col" style={{lineHeight:'3'}}>स्थान</th>
        <th scope="col" style={{
                      textAlign:"center",
                      lineHeight:'3'
                    }}>प्रतिमा</th>
        <th scope="col" style={{
                      textAlign:"center",
                      lineHeight:'3'
                    }}>क्रमांक पट्टी</th>
        <th scope="col" style={{
                      textAlign:"right",
                      lineHeight:'3'
                    }}>वेळ</th>
      </tr>
    </thead>
    <tbody>
      {messages && messages.map(msg => 
      <tr>
        {/* <th scope="row">1</th> */}
        <td style={{
                      lineHeight:'4'
                    }}>{msg.location}</td>
        <td style={{
                      textAlign:"center",
                      lineHeight:'4'
                    }}><img src={msg.image} height="70" width="140"/></td>
        <td style={{
                      textAlign:"center",
                      lineHeight:'4'
                    }}>{msg.plate}</td>
        <td style={{
                      textAlign:"right",
                      lineHeight:'4'
                    }}>{msg.time.slice(0,19)}</td>
      </tr>
      )}
    </tbody>
  </table>
  </div>
    ):
    (
    <div>
      <table className="table table-hover" style={{
                        padding: '50px',
                      }}>
      <thead className="table-dark">
        <tr style={{height: '50px'}}>
          {/* <th scope="col">#</th> */}
          <th scope="col" style={{lineHeight:'3'}}>Location</th>
          <th scope="col" style={{
                        textAlign:"center",
                        lineHeight:'3'
                      }}>Images</th>
          <th scope="col" style={{
                        textAlign:"center",
                        lineHeight:'3'
                      }}>Number</th>
          <th scope="col" style={{
                        textAlign:"right",
                        lineHeight:'3'
                      }}>TimeStamp</th>
        </tr>
      </thead>
      <tbody>
        {messages && messages.map(msg => 
        <tr>
          {/* <th scope="row">1</th> */}
          <td style={{
                        lineHeight:'4'
                      }}>{msg.location}</td>
          <td style={{
                        textAlign:"center",
                        lineHeight:'4'
                      }}><img src={msg.image} height="70" width="140"/></td>
          <td style={{
                        textAlign:"center",
                        lineHeight:'4'
                      }}>{msg.plate}</td>
          <td style={{
                        textAlign:"right",
                        lineHeight:'4'
                      }}>{msg.time.slice(0,19)}</td>
        </tr>
        )}
      </tbody>
    </table>
    </div>
    )}
    </>
  );
}

export default Data;
