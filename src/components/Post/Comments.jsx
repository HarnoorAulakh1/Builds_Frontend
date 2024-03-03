import CommentCard from './CommentCard';
import styles from './post.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Comments({post_id}) {
    const [state, setstate] = useState("");
    const [comments, setComments] = useState([]);
    const {username,photo,_id} =useSelector((state)=>state.profile);
     async function handleSubmit(e) {
        e.preventDefault();
        const data={
            post_id:post_id,
            user_id:_id,
            username:username,
            photo:photo,
            comment:state
        }
        console.log (data);
        await axios.post("/api/post/addcomments",data)
        .then(res=>{
          console.log(res.data);
          setComments([...comments,res.data]);
        })
        .catch(err=>console.log(err));
        setstate("");
    }
    useEffect(() => {
        axios.get(`/api/post/getcomments/:${post_id}`)
        .then(res=>setComments(res.data))
        .catch(err=>console.log(err));
    },[])
  return (
    <div className={styles.comments}>
        <div>
        <form className={styles.account} onSubmit={handleSubmit}>
            <textarea value={state} onChange={(e)=>setstate(()=>e.target.value)} type="text" />
            <button className={styles.btn}>Post</button>
        </form>
        </div>
      <div className={styles.comments}>
        {comments.map((comment)=><CommentCard setComments={setComments} comment={comment} key={comment._id}/>)}
      </div>
    </div>
  );
}

export default Comments;
