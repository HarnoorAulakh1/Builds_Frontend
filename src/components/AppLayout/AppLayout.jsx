import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./appLayout.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setprofile } from "../../Redux/profileSlice";
import Navbar1 from "../navigattion/Navbar1";
import { useState } from "react";
import Reveal3 from "../reveal/Reveal3";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [class1, setclass] = useState(styles.loading);
  const [visible, setVisible] = useState(false);
  const posts = useLoaderData();
  function handle() {
    setVisible(!visible);
  }
  useEffect(() => {
    if (posts == 0) navigate("/auth");
    else dispatch(setprofile({ ...posts.user, isAuthenticated: true }));
  }, [posts]);
  useEffect(() => {
    const x = setTimeout(() => {
      setclass(styles.loadingHide);
    }, 4000);
    return () => {
      clearTimeout(x);
    };
  }, []);
  return (
    <>
      {posts != 0 && (
        <> <div className={class1}>
        <Reveal3></Reveal3>
      </div>
        <div className={styles.container}>
          {/* <div className={styles.nav}>
            <Navbar />
          </div> */}
          <div className={styles.app}>
            <div className={styles.visible}>
              <Navbar1 />
            </div>
            <div className={styles.menudiv} onClick={handle}>
              <IoMenuOutline className={styles.menu} />
            </div>
            <div className={visible ? styles.navbar : styles.contract}>
              <RxCross1
                onClick={handle}
                className={visible ? styles.crosscr : styles.crossar}
                style={{ width: "2rem", height: "2rem", color: "white" }}
              />

              <br />
              <Navbar1 />
            </div>
            <div className={styles.outlet}><Outlet /></div>
            
          </div>
        </div></>
       
      )}
    </>
  );
}

export default AppLayout;