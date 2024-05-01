import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setprofile } from "../../Redux/profileSlice";
function Profile() {
  const { first, last, username, photo, bio } = useSelector(
    (state) => state.profile
  );
  const navigate=useNavigate();
  const dispatch = useDispatch();
  async function handlelogout() {
    console.log("logout");
      await axios.post("/api/user/logout");
      dispatch(setprofile({isAuthenticated:"false",_id: "", username: "", photo: "", email: "",last:"",first:"",phno:"",bio:""}));
      navigate("/app");
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
        <p>{bio}</p>
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
