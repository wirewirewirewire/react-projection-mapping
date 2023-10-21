import React, { useEffect, useRef, useState } from "react";
import styles from "./element.module.css";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Element({
  children,
  className,
  fullWidth,
  href,
  scene,
  text,
  wrapperClassName,
}: any) {
  const [isShown, setIsShown] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState<any>(false);

  const onLoad = (spline: any) => {
    const obj = spline.findObjectByName("logo");
    objectToAnimate.current = obj;
  };

  const objectToAnimate: any = useRef();

  function triggerAnimation(isShown: boolean) {
    if (!objectToAnimate.current) return null;
    if (isShown) {
      objectToAnimate.current.emitEvent("keyDown");
    } else {
      objectToAnimate.current.emitEvent("keyUp");
    }
  }

  useEffect(() => {
    triggerAnimation(isShown);
  }, [isShown]);

  return (
    <div
      className={`${styles.element} ${wrapperClassName} ${
        fullWidth ? styles.fullWidth : ""
      }`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <span className={`${styles.elementInside} ${className}`}>
        <Spline
          scene={scene}
          onLoad={onLoad}
          // eventsTarget="local"
          // onMouseHover={onHover}
        />
      </span>
    </div>
  );
}
