import Post from "./Post/Post";
import styles from "./AppLayout/appLayout.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import { useLoaderData, useLocation } from "react-router-dom";

function Feed() {
  const [sent, set] = useState(false);
  const locaion=useLocation();
  const [postData,setData]=useState([]);
  const [x,setter]=useState(0);
  async function handle(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    if (scrollRatio + 0.1 >= 1 && !sent) {
      set(true);
      const newData=await axios
      .get(`/api/post/getpost?pageLimit=3&n=${x}`);
      setData([...postData,...newData.data.posts]);
      setter(x+1);
      set(false);
    }
  }
  useEffect(()=>{
    handle({target:{scrollTop:2,scrollHeight:1,clientHeight:0}});
  },[]);
  return (
    <div style={{zIndex:"1"}} className={styles.feed} onScroll={handle} key={locaion}>
      <div className={styles.scroll}>
        {postData.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default Feed;
