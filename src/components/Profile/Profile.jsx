import React from "react";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setisAuthenticated } from "../../Redux/profileSlice";
function Profile() {
  const { first, last, username, photo, bio } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  function handlelogout() {
    localStorage.removeItem("profile");
    dispatch(setisAuthenticated(false));
  }
  return (
    <div className={styles.container3}>
      <div className={styles.data}>
        <img src={photo} alt="" />
        <div className={styles.name}>
          <h2>{username}</h2>
          <h3>{first + " " + last}</h3>
          <p>{bio}</p>
          <br />
        </div>
        <div>
          <button onClick={handlelogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
