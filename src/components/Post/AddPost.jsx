import { useState } from "react";
import style from "./post.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  username: "",
  caption: "",
  first: "",
  last: "",
  email: "",
  photo: "",
  image: "",
};
function AddPost() {
  const navigate = useNavigate();
  const { _id,username, email, last, first, photo } = useSelector(
    (state) => state.profile
  );
  const [state, set] = useState(initialState);
  const [loading, setloading] = useState(false);
  async function handle(e) {
    e.preventDefault();
    setloading(true);
    console.log(state.image);
    // const formData = new FormData();
    // formData.append("file", state.image);
    // formData.append("upload_preset", api_name);
    // const dataRes = await axios.post(api_url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // imageUrl = dataRes.data.url;
    axios
      .post(
        "/api/post/addpost",
        {
          ...state,
          user_id: _id,
          username: username,
          last: last,
          first: first,
          email: email,
          photo: photo,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setloading(false);
        navigate("/app");
      })
      .catch((err) => console.log(err));
    set(initialState);
  }
  return (
    <div className={style.container2}>
      <h1>Add Post</h1>
      <form onSubmit={handle}>
        <div>
          <label>Caption</label>
          <textarea
            onChange={(e) => set({ ...state, caption: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label className={style.image}>
            Image
            <input
              onChange={(e) => set({ ...state, image: e.target.files[0] })}
              type="file"
              accept="image/*"
            />
          </label>
        </div>
        <div>
          <button disabled={loading} style={{backgroundColor:loading?"grey":""}} className={style.btn}>
            {loading?"Loading...":"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPost;
