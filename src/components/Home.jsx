import { useSelector, useDispatch } from "react-redux";
import Auth from "./Authentication/Auth";
import { setprofile } from "../Redux/profileSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
export default function Home() {
  return (
    <>
      <Outlet />
    </>
  );
}
