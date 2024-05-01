import styles from "./Notification.module.css";
import axios from "axios";

function NotificationCard({ data,delete1 }) {
  async function accept(x) {
    delete1(data._id);
    await axios.delete(`/api/user/deleteNotification`, {
      data: { id: data._id },
    });
    if (x == 1) {
      const response = await axios.post(`/api/user/acceptFriendRequest`, {
        user_id: data.user_id,
        friend_id: data.profile_link,
      });
      console.log(response);
    }
  }
  return (
    <div className={styles.card}>
      <div>
        <img className={styles.img} src={data.photo} alt="" />
      </div>
      <div className={styles.content}>
        <h3>{data.profile_username}</h3>
        <p>{data.content}</p>
      </div>
      {data.type == "friend_request" && (
          <div className={styles.actions}>
            <button onClick={() => accept(1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  color="green"
                  stroke="currentColor"
                  d="m2.75 8.75l3.5 3.5l7-7.5"
                />
              </svg>
              Accept
            </button>
          </div>
        )}
      <button className={styles.cross}  onClick={() => accept(0)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 21 21"
        >
          <path
            fill=""
            color="white"
            stroke="currentColor"
            d="m15.5 15.5l-10-10zm0-10l-10 10"
          />
        </svg>
      </button>
    </div>
  );
}

export default NotificationCard;
