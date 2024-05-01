import { useSelector } from "react-redux";
import styles from "./Messages.module.css";

function Message({ message, data }) {
  const { photo, username, _id } = useSelector((state) => state.profile);
  return (
    <>
      {message.senderId == _id ? (
        <div className={styles.container3}>
          <div className={styles.header3}>
            <img  src={photo} alt="" />
            <p>{username}</p>
          </div>
          <div>{message.message}</div>
        </div>
      ) : (
        <div className={styles.container4}>
          <div className={styles.header4}>
            <img src={data[0].photo} alt="" />
            <p>{data[0].username}</p>
          </div>
          <div>{message.message}</div>
        </div>
      )}
    </>
  );
}
export default Message;
