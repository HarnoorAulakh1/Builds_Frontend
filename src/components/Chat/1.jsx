import { useState } from "react";
import styles from "./Notification.module.css";
import { NavLink, Outlet } from "react-router-dom";

function Chat() {
  const [classname, setClass] = useState(styles.collapse);
  function handleClick() {
    if (classname == styles.collapse) setClass(styles.expand);
    else setClass(styles.collapse);
  }
  return (
    <div className={styles.messagesContainer}>
      <div style={{ height: "100%", width: "3rem", paddingTop: "2rem" }}>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "#0f172a  ",
            border: "0",
            borderTopLeftRadius: ".5rem",
            borderBottomLeftRadius: ".5rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="80"
            viewBox="0 0 20 24"
          >
            <path
              fill="white"
              d="m15.632 12l-4.748-8.968l-1.768.936L13.368 12l-4.252 8.032l1.768.936z"
            />
          </svg>
        </button>
      </div>
      <div className={classname}>
        <div className={styles.nav}>
          <NavLink
            to="friends"
            className={({ isActive }) => {
              return isActive ? styles.isactive : styles.notactive;
            }}
          >
            Friends
          </NavLink>
          <NavLink
            to="search"
            className={({ isActive }) => {
              return isActive ? styles.isactive : styles.notactive;
            }}
          >
            Search
          </NavLink>
          <NavLink
            to="notifications"
            className={({ isActive }) => {
              return isActive ? styles.isactive : styles.notactive;
            }}
          >
            Notification
          </NavLink>
        </div>
        <>
          <Outlet />
        </>
      </div>
    </div>
  );
}

export default Chat;
