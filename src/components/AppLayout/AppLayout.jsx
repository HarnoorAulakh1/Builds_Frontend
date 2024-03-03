import { useLoaderData } from "react-router-dom";
import Feed from "../Feed";
import styles from "./appLayout.module.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setprofile } from "../../Redux/profileSlice";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useLoaderData();
  console.log(posts);
  useEffect(() => {
    if (posts == 0) navigate("/auth");
    else
    dispatch(setprofile(posts.user));
  });
  return (
    <>
      {posts != 0 && (
        <div className={styles.container}>
          <div>
            <Navbar />
          </div>
          <div className={styles.app}>
            <Feed posts={posts.posts} />
          </div>
        </div>
      )}
    </>
  );
}

export default AppLayout;
