import { Outlet} from "react-router-dom";

export default function Home() {
  return <>
  <Outlet />
  </>;
}

// export default function Home() {
//   const islogedin=useLoaderData();
//   console.log("Home",islogedin);
//   return <>{islogedin? <Outlet /> : <Navigate to="/auth" />}</>;
// }
