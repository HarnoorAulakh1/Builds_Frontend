import { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";

function Notification() {
  const [data, set] = useState([]);
  const { _id } = useSelector((state) => state.profile);
  useEffect(() => {
    let x;
    const ex = async () => {
      const res = await axios.get(`/api/user/getNotification?id=${_id}`);
      set(res.data);
    };
    if(_id=="") return;
    x=setTimeout(ex, 3000);
    return ()=>clearTimeout(x);
  });
  function delete1(_id){
    console.log(_id,"deleted");
    set(data.filter((x)=>x._id!==_id));
  }
  return (
    <div className={styles.container}>
      <h1>Notifications</h1>
      {data.map((x) => (
        <NotificationCard delete1={delete1} data={x} key={x} />
      ))}
    </div>
  );
}

export default Notification;
