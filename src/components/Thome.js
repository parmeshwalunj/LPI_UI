import React,{ useState} from "react";
import Data from "../Data";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import axios from "axios";

const apiUrl = "http://localhost:8080/api/tasks";


const Thome = ({email, handleLogout}) => {
  const [language,setLanguage] = useState({});
  const [start, setStart] = useState(false);
  
  function addTask(task) {
    console.log("clicked");
    setStart(!start)
    return axios.post(apiUrl, task);
  }
  // console.log(language);
  return (
      <>
    <section className="hero">
      <nav>
      {language.isMarathi ? (
        <h2>स्वागत {email?(email):("")}</h2>
      ):(
        <h2>Welcome {email?(email):("")}</h2>
        )}
      {start ? (
            <>
              <button>
                <span onClick={()=>setStart(!start)}>Stop</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={()=>addTask({text: "Run the pipeline"})}>
                <span>Start</span>
              </button>
            </>
          )}
        <BootstrapSwitchButton
            width={100} height={40}
            checked={false}
            onlabel='Marathi'
            offlabel='English'
            onChange={(checked: boolean) => {
                setLanguage({ isMarathi: checked })
            }}
        />
        
        {language.isMarathi ? (
        <button onClick={handleLogout}>लॉग आउट</button>
        ):(
        <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </section>
    <Data language={language}/>
      </>
  );
};

export default Thome;
