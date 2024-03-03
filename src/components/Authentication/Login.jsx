import { useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
import { setprofile } from "../../Redux/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initial = { username: "", password: "" };
function Login({ set }) {
  const navigate = useNavigate();
  const [state, setstate] = useState(initial);
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();
  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("/api/user/login", state)
      .then((res) => {
        console.log(typeof res.data);
        if (res.data == "0") {
          setmessage("Invalid Credentials");
        } else {
          setmessage("");
          console.log(res.data);
          dispatch(setprofile(res.data));
          navigate("/app");
          //localStorage.setItem("profile", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setstate(initial);
  }
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <div className={styles.message}>
        <p>{message}</p>
      </div>
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
          <label>Password</label>
          <input
            value={state.password}
            onChange={(e) => setstate({ ...state, password: e.target.value })}
            type="password"
          />
        </div>
        <button className={styles.button} type="submit">
          submit
        </button>
      </form>
      <div onClick={() => set((x) => !x)} className={styles.link}>
        <p>not yet registered?</p>
      </div>
    </div>
  );
}

export default Login;
