import Post from "./Post/Post";
import styles from "./AppLayout/appLayout.module.css";

function Feed({ posts }) {
  return (
     <div className={styles.feed}>
      <div className={styles.scroll}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
     </div>
  );
}
export default Feed;
