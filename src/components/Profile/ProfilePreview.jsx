import styles from "./profile.module.css";
import { useLoaderData } from "react-router-dom";
import Heading from "./Heading";
import Display from "./Display";

function Profile() {
  const { data1 } = useLoaderData();

  //console.log(data1);
  return (
    <div className={styles.scroll1}>
    <div className={styles.container1}>
      <Heading />
      <div className={styles.scroll}>
        <div className={styles.effect}>
          <Display data={data1} />
        </div>
      </div>
      </div>
    </div>
  );
}
export default Profile;
