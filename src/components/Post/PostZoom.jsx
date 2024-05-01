import { useLoaderData } from "react-router-dom";
import styles from "./post.module.css"; 
import Post from "./Post";
import Comments from "./Comments";

function PostZoom() {
    const post=useLoaderData();
    console.log("PostZoom",post);
    return(
        <div className={styles.container1}>
        <Post post={post}/>
        <Comments post_id={post._id}/>
        </div>
    )
}

export default PostZoom;