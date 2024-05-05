import styles from "./profile.module.css";
import { useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { setprofile } from "../../Redux/profileSlice";
import { useLoaderData, useNavigate } from "react-router-dom";

function Heading() {
  const dispatch=useDispatch();
  const {data,data1}=useLoaderData();
  const user=useSelector((state)=>state.profile);
  const {_id,first,last,username,photo,bio}=data[0];
  const navigate=useNavigate();
  async function handlelogout() {
      await axios.post("/api/user/logout");
      dispatch(setprofile({isAuthenticated:"false",_id: "", username: "", photo: "", email: "",last:"",first:"",phno:"",bio:""}));
      navigate("/auth");
    }
  function addPost() {
    navigate("/app/addpost");
  }
  async function addFriend() {
    console.log("Add Friend");
    const response=await axios.post(`/api/user/addFriendRequest`, { user_id:_id, profile_link:user._id,type:"friend_request",content:`Friend request from ${user.username}`,photo:user.photo,profile_username:user.username})
    console.log(response);
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
      {_id==user._id && <button onClick={()=>handlelogout()} className={styles.addpost}>Logout</button>}
      </div>
      </div>
      <div className={styles.stats}>
        <div>
          <h3>Posts</h3>
          <h3>Likes</h3>
        </div>
        <div>
          <p>{data1.length}</p>
          <p>---</p>
          </div>
      </div>
      <div className={styles.actions}>
        {_id==user._id && <button onClick={addPost}>Add Post</button>}
        {_id!=user._id && <button onClick={addFriend}>Add Friend</button>}
      </div>
    </div>
  );
}
export default Heading;
