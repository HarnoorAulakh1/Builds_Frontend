import { useSelector } from "react-redux";
import { useState } from "react";
import List from "./List";

function Menu({ data ,click}) {
  const menu = ["Edit", "Delete"];
  const { _id ,username} = useSelector((state) => state.profile);
const [display, set] = useState(false);
  function expand() {
    set(!display);
  }
  return (
    <>
      {data.username == username ? (
        <div onClick={expand}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 21 21"
          >
            <g fill="currentColor">
              <circle cx="10.5" cy="10.5" r="1" />
              <circle cx="10.5" cy="5.5" r="1" />
              <circle cx="10.5" cy="15.5" r="1" />
            </g>
          </svg>
          <div style={{transition:".2s",borderRadius:".5rem",padding:display?".3rem":"0",position:"relative",height:display?"2rem":"0",zIndex:"10",backgroundColor:"black",overflow:"hidden"}}>
          <div style={{display:"flex",flexDirection:"column"}}>
            {menu.map((item) => (
              <List item={item} click={click} key={item}/>
            ))}
          </div>
          </div>
        </div>
      ):<div>    </div>}
    </>
  );
}

export default Menu;
