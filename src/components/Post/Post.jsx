import Comments from "./Comments";
import Header from "./Header";
import styles from "./post.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const [state, setstate] = useState(false);
  const [like, setlike] = useState();
  const [option, set] = useState("");
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.profile);
  const { username } = useSelector((state) => state.profile);
  useEffect(() => {
    axios
      .post("/api/post/checklike", { post_id: post._id, user_id: _id })
      .then((res) => {
        setlike(res.data);
      });
  });
  function showComments() {
    console.log("post1=", post._id);
    navigate(`/app/post/${post._id}`);
  }

  async function click(x) {
    if (x == "Delete") {
      set("Delete");
      const result = await axios.delete("api/post/deletePost", {
        data: { ...post },
      });
      console.log(result);
    }
  }

  async function likes() {
    console.log(like);
    var inc = like ? -1 : 1;
    await axios
      .put("/api/post/like", {
        inc: inc,
        id: post._id,
        username: username,
        post: post,
      })
      .then((res) => console.log(res.data));
    setlike(!like);
  }

  return (
    <>
      {!option && (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header1}>
            <Header img={post.photo} name={post.username} />
            </div>
            <div className={styles.menu}>
              {" "}
              <Menu data={post} click={click} />
            </div>
          </div>
          <br />
          <div className={styles.post}>
            <img src={post.image} alt="" />
            <div className={styles.likes}>
              <div className={styles.features}>
                <div onClick={likes}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill={like ? "#F44336" : "white"}
                      d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12"
                    />
                  </svg>
                </div>
                <div onClick={showComments}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32m0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160"
                    />
                  </svg>
                </div>
              </div>
            <p>{post.caption}</p>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}
export default Post;
