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

  /*const onHover = (spline: any) => {
      console.log("onHover");
      spline.setZoom(3);
    };*/

  function triggerAnimation(isShown: boolean) {
    if (!objectToAnimate.current) return null;
    if (isShown) {
      console.log("innnn");
      objectToAnimate.current.emitEvent("keyDown");
    } else {
      console.log("outtt");
      objectToAnimate.current.emitEvent("keyUp");
    }
  }

  useEffect(() => {
    triggerAnimation(isShown);
  }, [isShown]);

  return (
    <Link
      href={href}
      className={`${styles.element} ${wrapperClassName} ${
        fullWidth ? styles.fullWidth : ""
      }`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      /*onTouchStart={() => {
        setTouchStartTime(Date.now());
        setIsShown(true);
      }}
      onTouchEnd={() => {
        if (Date.now() - touchStartTime > 500) {
          setIsShown(false);
        } else {
          window.location.assign(href);
        }
      }}*/
    >
      <span className={`${styles.elementInside} ${className}`}>
        <Spline
          scene={scene}
          onLoad={onLoad}
          // eventsTarget="local"
          // onMouseHover={onHover}
        />
      </span>
      <span className={styles.text}>
        {text}
        <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
      </span>
    </Link>
  );
}
