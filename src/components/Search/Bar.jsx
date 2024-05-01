import styles from "./Search.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import View from "./View";

function Bar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate=useNavigate();

  function clicked(x){
    navigate(`/app/profile/${x._id}`);
  }

  useEffect(() => {
    async function fetchData() {
      if (search.length > 0) {
        const x = await axios.get(`/api/user/getUser/${search}`);
        setData(x.data);
      }
      else{
        setData([]);
      }
    }
    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <input
        className={styles.bar}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {data.length>0  && <div className={styles.box}>
      {data.map((x) => (
        <View data={x} clicked={clicked} use="search" key={x._id}/>
      ))}
      </div>}
    </div>
  );
}

export default Bar;
