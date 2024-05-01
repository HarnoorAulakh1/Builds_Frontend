import { useNavigate } from "react-router-dom";
import styles from "./Messages.module.css";

function Card1({data}) {
    const navigate=useNavigate();
    return (
        <div className={styles.container1} onClick={()=>navigate(`chat/${data._id}`)}>
            <img src={data.photo} alt="" />
        <p>{data.username}</p>
        </div>
    );
}

export default Card1;
