import { useEffect } from "react";
import styles from "./Notification.module.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";

function Friends(){
    const [data,set]=useState([]);
    const { _id } = useSelector((state) => state.profile);
    useEffect(()=>{
        const ex = async () => {
            const res = await axios.get(`/api/user/getFriends?id=${_id}`);
            set(res.data);
            console.log(res.data);
          };
          ex();
    },[])
    return(
        <div className={styles.Friends}>
            <h2>Messages</h2>
            <div className={styles.chats}>
                {data.map((x) => (
                    <NotificationCard data={x} key={x} />
                ))}
            </div>
        </div>
    )
}

export default Friends;