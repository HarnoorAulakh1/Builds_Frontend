import { useEffect } from "react";
import styles from "./Messages.module.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card1 from "./Card1.jsx";
import { useLoaderData } from "react-router-dom";

function Messages() {
  const messages=useLoaderData();
  const { _id } = useSelector((state) => state.profile);
  return (
    (messages!="Error"&&
    <div className={styles.container} >
      <h1>Messages</h1>
      <div className={styles.container2}>{messages.map((message) => (
        <Card1 data={message} key={message._id}/>
      ))}</div>
      
    </div>)
  );
}
export default Messages;
