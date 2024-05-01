import { motion } from "framer-motion";
import styles from "./Reveal.module.css";
import { useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

// eslint-disable-next-line react/prop-types
function Reveal1({ children }) {
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
      <motion.div ref={ref}
        className={styles.motion1}
        variants={{
          visible: { x: 0, opacity: 1 },
          hidden: { x: 200, opacity: 0 },
        }}
        animate={control}
        initial={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
  );
}

export default Reveal1;
