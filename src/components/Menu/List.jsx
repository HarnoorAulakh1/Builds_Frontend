import { useState } from "react";

function List({item,click }) {
  const [color, setcolor] = useState("black");

  return (
    <div
      key={item}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setcolor("grey")}
      onMouseLeave={()=>setcolor("black")}
      onClick={()=>click(item)}
    >
      {item}
    </div>
  );
}

export default List;
