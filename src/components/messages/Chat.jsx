import { useLoaderData } from "react-router-dom";
import styles from "./Messages.module.css";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";

function Chat() {
  const { _id } = useSelector((state) => state.profile);
  const { data, messages } = useLoaderData();
  const [message, setMessage] = useState(messages);
  const ref = useRef();
  const bottom = useRef();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = new WebSocket(`ws://builds-backend-1.onrender.com:8080/?senderId=${_id}`);
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send(JSON.stringify({ message: "Hello Server!" }));
    };
    newSocket.onmessage = (message) => {
      // console.log("Message received:", Object.keys(JSON.parse(message.data)).length,JSON.parse(message.data));
      if (Object.keys(JSON.parse(message.data)).length == 6) {
        setMessage((x) => {
          return [...x, JSON.parse(message.data)];
        });
      }
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    bottom.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  useEffect(() => {
    ref.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
    // const x = setTimeout(async () => {
    //   const response = await axios.get(
    //     `/api/message/getMessage?senderId=${_id}&receiverId=${data[0]._id}`
    //   );
    //   //console.log("hello", response.data);
    //   setMessage(() => {
    //     return response.data;
    //   });
    // }, 3000);
    axios
      .get(`/api/message/getMessage?senderId=${_id}&receiverId=${data[0]._id}`)
      .then((response) => {
        setMessage(() => {
          return response.data;
        });
      });
    //console.log("hello", response.data);
    // setMessage(() => {
    //   return response.data;
    // });
    return () => {
      removeEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
      //clearTimeout(x);
    };
  }, []);
  async function handle(e) {
    e.preventDefault();
    const form = e.target;
    const ob = {
      senderId: _id,
      receiverId: data[0]._id,
      message: e.target[0].value,
    };
    //const response = await axios.post(`/api/message/sendMessage`, ob);
    setMessage([...message, ob]);
    socket.send(JSON.stringify(ob));
    //bottom.current.scrollIntoView({ behavior: "smooth", block: "end"});
    //console.log(e.target[0].value);
    form.reset();
  }
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <img src={data[0].photo} alt="" />
        <h3>{data[0].username}</h3>
      </div>
      {message != "Error" && (
        <div className={styles.chatSection} ref={ref}>
          {message.map((y) => (
            <Message data={data} message={y} key={y._id} />
          ))}
          <div className={styles.bottom} ref={bottom}></div>
          <form onSubmit={handle}>
            <div className={styles.bar}>
              <input type="text" placeholder="Message" />
              <button type="submit">
                <div className={styles.send}>
                  <BsSend size="2rem" color="white" />
                </div>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
