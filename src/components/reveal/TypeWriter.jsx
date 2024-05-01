import { useEffect, useRef } from "react";
import { animate, color, useInView } from "framer-motion";
import Typewriter from "typewriter-effect";
import styles from "./Reveal.module.css";
import { useState } from "react";

export default function TypeWriter() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [color, set] = useState(styles.container2);
  return (
    <div ref={ref} className={color}>
      {isInView && (
        <Typewriter
          isInView={isInView}
          options={{ cursor: "_" }}
          onInit={(typewriter) => {
            typewriter
              .typeString("INTRODUCING ")
              .start()
              .changeDelay(40)
              .typeString("BUILDS")
              .pauseFor(2000)
              .deleteAll(1)
              .changeDelay("natural")
              .typeString("SOCIAL MEDIA PLATFORM")
              .pauseFor(1000)
              .deleteAll(1)
              .typeString("BUILDS");
          }}
        />
      )}
    </div>
  );
}
