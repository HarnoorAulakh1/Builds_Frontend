import Login from "./Login";
import Registration from "./Registration";
import { useEffect, useState } from "react";
import styles from "./auth.module.css";

function Auth() {
  const [clicked, set] = useState(false);
  return (
    <div className={styles.white}>
        <p>Builds</p>
      <div className={styles.expand}>
          <img src="/5.jpg" alt="" />
        <div className={clicked ? styles.expand1 : styles.auth}>
          {clicked ? <Registration set={set} /> : <Login set={set}/>}
        </div>
      </div>
    </div>
  );
}
export default Auth;
