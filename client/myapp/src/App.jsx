import "./App.scss";
import { useState } from "react";
import axios from "axios";

function App() {
  const [inv, setInv] = useState("");
  const [fm, setFm] = useState(null);
  const [ot, setOt] = useState("");

  const triggerBG = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const sendAi = async () => {
    const form = new FormData();
    form.append("file", fm);
    try {
      const res = await axios.post("http://127.0.0.1:8000/form", form);
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/qs", {
        qs: inv,
      });
      setOt(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <div className="left">LANGGRAPH-RAG-AI based Resume Analyser</div>
      <div className="right">
        <div className="header">Upload your resume and Ask Qs</div>
        <div className="body">
          {/* <div className="chBut">
            <button onClick={triggerBG}>Check Backend</button>
          </div> */}
          <div className="fileIn">
            <input
              type="file"
              onChange={(e) => {
                setFm(e.target.files[0]);
              }}
            ></input>
          </div>
          <div className="Innn">
            <label>Enter your Question - </label>
            <input
              onChange={(e) => {
                setInv(e.target.value);
              }}
            ></input>
          </div>
          <div className="end">
            <button className="btt" onClick={sendAi}>
              Send to backend
            </button>
          </div>
        </div>
        <div className="footer">
          <label>{ot}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
