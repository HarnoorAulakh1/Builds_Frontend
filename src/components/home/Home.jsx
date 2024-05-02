import { useLoaderData } from "react-router-dom";
import styles from "./Home.module.css";
import { LampDemo } from "../reveal/Lamp";
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const islogedin = useLoaderData();
  const navigate = useNavigate();
  console.log("Home", islogedin);
  return (
    <>
      {islogedin ? (
        <Outlet/>
      ) : (
        <div className={styles.home}>
          <LampDemo/>
        </div>
      )}
    </>
  );
}

// export default function Home() {
//   const islogedin=useLoaderData();
//   console.log("Home",islogedin);
//   return <>{islogedin? <Outlet /> : <Navigate to="/auth" />}</>;
// }