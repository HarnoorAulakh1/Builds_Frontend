import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setisAuthenticated } from "../../Redux/profileSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const {first,last,username,photo}=useSelector((state) => state.profile);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  function handlelogout() {
    localStorage.removeItem("profile");
    dispatch(setisAuthenticated(false));
    }
  function addPost() {
    navigate("/addpost");
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={photo} alt="" />
        <div>
        <h2>{username}</h2>
        <p>{first} {last}</p><br />
        <p>Tiet 26</p>
        <p>Full Stack Web Developer</p>
      </div>
      <div>
      <button onClick={handlelogout} className={styles.logout}>Logout</button>
      </div>
      </div>
      <div className={styles.stats}>
        <div>
          <h3>Posts</h3>
          <h3>Likes</h3>
        </div>
        <div>
          <p>100</p>
          <p>100</p>
          </div>
      </div>
      <div className={styles.actions}>
        <button onClick={addPost}>Add Post</button>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}
export default Profile;
