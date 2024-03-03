import Header from "./Header";
import styles from "./post.module.css";
import Menu from "../Menu/Menu.jsx";
import { useState } from "react";
import axios from "axios";

function CommentCard({comment }) {
  const [op, set] = useState("");
  const [state, setstate] = useState(comment.comment);
  const [x, setx] = useState("");

  async function click(option) {
    // const message=await axios.delete("/api/post/delete",{data:{_id}});
    // console.log(message);
    set(option);
    if (option == "Edit") {
      console.log("Edit");
    } else if (option == "Delete") {
      const message = await axios.delete("/api/post/deleteComment", {data:{
        _id: comment._id,
        post_id: comment.post_id,
      }});
      setx("none");
      console.log(message);
    }
  }

  async function save() {
    const message = await axios.put("/api/post/updateComment", {
      _id: comment._id,
      comment: state,
    });
      set("");
    console.log(message);
  }

  return (
    <div style={{display:x}} className={styles.comment}>
      <Header img={comment.photo} />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            height: "2rem",
          }}
        >
          <h2>{comment.username}</h2>
          <Menu data={comment} click={click} />
        </div>
        {op != "Edit" ? (
          <p style={{ position: "relative", zIndex: "5" }}>{state}</p>
        ) : (
          <textarea
            defaultValue={state}
            onChange={(e) => setstate(e.target.value)}
          ></textarea>
        )}
        {op == "Edit" && <button onClick={() => save()}>save</button>}
      </div>
    </div>
  );
}

export default CommentCard;
