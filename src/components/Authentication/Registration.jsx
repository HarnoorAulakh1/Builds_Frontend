import { useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
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
const api_name = import.meta.env.VITE_NAME;
const api_url = import.meta.env.VITE_URL;
function Registration({ set }) {
  const [state, setstate] = useState(initialState);
  async function  handlesubmit(e) {
    e.preventDefault();
    var imageUrl;
    const formData = new FormData();
        formData.append("file", state.photo);
        formData.append("upload_preset",api_name);
    const dataRes =await axios.post(
      api_url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    imageUrl = dataRes.data.url;
    axios
    .post("/api/user/register", {...state,photo:imageUrl})
    .then((res) => console.log("hello " + res.data))
    .catch((err) => console.log(err));
    set((x) => !x);
    //console.log(state.photo);
    setstate(initialState);
  }
  return (
    <div className={styles.registration}>
      <h1>Registration</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <label>Username</label>
          <input
            value={state.username}
            onChange={(e) => setstate({ ...state, username: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={state.email}
            onChange={(e) => setstate({ ...state, email: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={state.password}
            onChange={(e) => setstate({ ...state, password: e.target.value })}
            type="password"
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            value={state.first}
            onChange={(e) => setstate({ ...state, first: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={state.last}
            onChange={(e) => setstate({ ...state, last: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <label>Phone No.</label>
          <input
            value={state.phno}
            onChange={(e) => setstate({ ...state, phno: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            value={state.bio}
            onChange={(e) => setstate({ ...state, bio: e.target.value })}
            type="text"
          />
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
        <button className={styles.button} onClick={handlesubmit}>submit</button>
      </form>
      <div onClick={() => set((x) => !x)} className={styles.link}>
        <p>Already have an account?</p>
      </div>
    </div>
  );
}

export default Registration;
