import { motion } from "framer-motion";
import styles from "./Reveal.module.css";
import { useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

// eslint-disable-next-line react/prop-types
function Reveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { nce: true });
  const control = useAnimation();
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [isInView]);
  return (
    <div ref={ref} className={styles.revealDiv}>
      <motion.div
        className={styles.motion}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: 200, opacity: 0 },
        }}
        animate={control}
        initial={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Reveal;
