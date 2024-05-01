import styles from "./Navbar1.module.css";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setprofile } from "../../Redux/profileSlice";
import axios from "axios";

function Navbar1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {_id}=useSelector((state)=>state.profile);
  async function handlelogout() {
    await axios.post("/api/user/logout");
    dispatch(setprofile({isAuthenticated:"false",_id: "", username: "", photo: "", email: "",last:"",first:"",phno:"",bio:""}));
    navigate("/auth");
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Builds</h1>
      </div>
      <div className={styles.links}>
        <div onClick={() => navigate("/app")}><AiFillHome size="2rem"/><p>Home</p></div>
        <div onClick={() => navigate("notifications")}><IoNotificationsOutline size="2rem"/><p>Notifications</p></div>
        <div onClick={() => navigate("search")}><AiOutlineSearch size="2rem"/><p>Search</p></div>
        <div onClick={() => navigate("messages")}><AiOutlineMail size="2rem"/><p>Messages</p></div>
        <div onClick={() => navigate(`profile/${_id}`)}><AiOutlineUser size="2rem"/><p>Profile</p></div>
        <div onClick={() => navigate("settings")}><IoSettingsOutline size="2rem"/><p>Settings</p></div>
      </div>
      <div className={styles.addpost} onClick={() => navigate("addpost")}><p>Add Post</p></div>
      <button onClick={()=>handlelogout()} className={styles.addpost}>Logout</button>
    </div>
  );
}

export default Navbar1;
