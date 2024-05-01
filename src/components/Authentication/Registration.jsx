import { useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
import Reveal from "/src/components/reveal/Reveal.jsx";
import Reveal1 from "../reveal/Reveal1";
import Reveal2 from "../reveal/Reveal2";
const initialState = {
  username: "",
  email: "",
  password: "",
  first: "",
  last: "",
  phno: "",
  photo: "",
  bio: "",
};
// const api_name = import.meta.env.VITE_NAME;
// const api_url = import.meta.env.VITE_URL;
function Registration({ set }) {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState(initialState);
  async function handlesubmit(e) {
    e.preventDefault();
    if (
      state.username == "" ||
      state.email == "" ||
      state.password == "" ||
      state.first == "" ||
      state.last == "" ||
      state.phno == "" ||
      state.bio == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post(
        "/api/user/register",
        { ...state },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => alert(res.data))
      .catch((err) => alert(err.message));
    set((x) => !x);
    setloading(false);
    setstate(initialState);
  }
  return (
    <div className={styles.registration}>
        <h1>Registration</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <div>
            <Reveal>
              <label>Username*</label>
            </Reveal>
            <Reveal2><input
              value={state.username}
              onChange={(e) => setstate({ ...state, username: e.target.value })}
              type="text"
            /></Reveal2>
            
          </div>
          <div>
            <Reveal>
              <label>Email*</label>
            </Reveal>
            <Reveal1> <input
              value={state.email}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
              type="text"
            /></Reveal1>
           
          </div>
          <div>
            <Reveal>
              <label>Password*</label>
            </Reveal>
            <Reveal2> <input
              value={state.password}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
              type="password"
            /></Reveal2>
           
          </div>
          <div>
            <Reveal>
              <label>First Name*</label>
            </Reveal>
            <Reveal1><input
              value={state.first}
              onChange={(e) => setstate({ ...state, first: e.target.value })}
              type="text"
            /></Reveal1>
            
          </div>
          <div>
            <Reveal>
              <label>Last Name*</label>
            </Reveal>
            <Reveal2><input
              value={state.last}
              onChange={(e) => setstate({ ...state, last: e.target.value })}
              type="text"
            /></Reveal2>
            
          </div>
          <div>
            <Reveal>
              <label>Phone No.*</label>
            </Reveal>
            <Reveal1><input
              value={state.phno}
              onChange={(e) => setstate({ ...state, phno: e.target.value })}
              type="text"
            /></Reveal1>
            
          </div>
          <div>
            <Reveal>
              <label>Bio*</label>
            </Reveal>
            <Reveal2><input
              value={state.bio}
              onChange={(e) => setstate({ ...state, bio: e.target.value })}
              type="text"
            /></Reveal2>
            
          </div>
        </div>
        <div>
          <label className={styles["custom-file-upload"]}>
            Profile Photo
            <input
              onChange={(e) => setstate({ ...state, photo: e.target.files[0] })}
              type="file"
              accept="image/*"
            />
          </label>
        </div>
        <button
          className={loading ? styles["loading-button"] : styles.button}
          onClick={handlesubmit}
          disabled={loading}
        >
          {loading ? "wait.." : "submit"}
        </button>
      </form>
      <div onClick={() => set((x) => !x)} className={styles.link}>
        <p>Already have an account?</p>
      </div>
    </div>
  );
}

export default Registration;
