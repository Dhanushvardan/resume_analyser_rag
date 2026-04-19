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
      <div className="header"></div>
      <div className="body">
        <h3>Hello, Pls upload your resume</h3>
        <button onClick={triggerBG}>Check Backend</button>
        <input
          type="file"
          onChange={(e) => {
            setFm(e.target.files[0]);
          }}
        ></input>
        <input
          onChange={(e) => {
            setInv(e.target.value);
          }}
        ></input>
        <button onClick={sendAi}>Send to backend</button>
      </div>
      <div className="footer">{ot}</div>
    </div>
  );
}

export default App;
