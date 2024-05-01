import { motion } from "framer-motion";
import styles from "./Reveal.module.css";
import { useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

// eslint-disable-next-line react/prop-types
function Reveal3({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { nce: true });
  const [animate,set]=useState(false);
  const control = useAnimation();
  useEffect(() => {
    let x;
    if (isInView) {
      control.start("visible");
      x=setTimeout(() => {
        set(true);
      },2000);
    } 
    return () => {
        clearTimeout(x);
    };
  }, [isInView]);
  return (
    <div className={styles.container}>
      <motion.div ref={ref}
        className={styles.motion3}
        variants={{
          visible1: { opacity: 0 },
          hidden: { y: -380, opacity: 0,},
          visible: { y: 0, opacity: 1,},
        }}
        animate={control}
        initial="hidden"
        transition={{ duration: 2 }}
      >
        <p>Builds</p>
      </motion.div>
      <div className={animate?styles.expand:styles.collapse}></div>
      {animate && <Reveal><p className={styles.lmt}>developed by Aulakh</p></Reveal>}
      </div>
  );
}

export default Reveal3;
