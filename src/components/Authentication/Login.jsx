import { useEffect, useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
import { setprofile } from "../../Redux/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Reveal from "/src/components/reveal/Reveal.jsx";
import Reveal1 from "../reveal/Reveal1";
import Reveal2 from "../reveal/Reveal2";

const initial = { username: "", password: "" };
function Login({ set, setRefresh }) {
  const navigate = useNavigate();
  const [state, setstate] = useState(initial);
  const [message, setmessage] = useState("");
  const {_id}=useSelector((state)=>state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (_id) {
      navigate("/app");
    }
  }
  ,[_id,navigate]);
  async function handlesubmit(e) {
    e.preventDefault();
    await axios
      .post("/api/user/login", state)
      .then((res) => {
        if (res.data == "0") {
          setmessage("Invalid Credentials");
        } else {
          setmessage("");
          dispatch(setprofile({ ...res.data, isAuthenticated: true }));
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
      <Reveal keyz>
        <h1>Login</h1>
      </Reveal>
      <div className={styles.message}>
        <p>{message}</p>
      </div>
      <form onSubmit={handlesubmit}>
        <div>
          <Reveal>
            <label>Username</label>
          </Reveal>
          <Reveal1>
            <input
              value={state.username}
              onChange={(e) => setstate({ ...state, username: e.target.value })}
              type="text"
            />
          </Reveal1>
        </div>
        <div>
          <Reveal>
            <label>Password</label>
          </Reveal>
          <Reveal2>
            <input
              value={state.password}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
              type="password"
            />
          </Reveal2>
        </div>
        <Reveal1>
          <button className={styles.button} type="submit">
            submit
          </button>
        </Reveal1>
      </form>
      <Reveal>
        <div onClick={() => set((x) => !x)} className={styles.link}>
          <p>not yet registered?</p>
        </div>
      </Reveal>
    </div>
  );
}

export default Login;
