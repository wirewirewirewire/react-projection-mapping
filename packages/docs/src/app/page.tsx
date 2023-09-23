"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { Button, UNCoreProvider, Wrapper } from "@wfp/react";
import Element from "@/components/Element";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Demo from "@/components/Demo";
import DemoPoints from "@/components/DemoPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <UNCoreProvider prefix="wfp">
      <Wrapper pageWidth="md">
        <main className={styles.main}>
          <div className={styles.description}>
            <h2 className={styles.title}>
              <b className={styles.mainTitle}>react</b>-projection-mapping
            </h2>
          </div>

          <div className={styles.footer}>
            <Link
              href="https://github.com/wirewirewirewire/react-projection-mapping"
              className={styles.link}
            >
              GitHub{" "}
              <FontAwesomeIcon icon={faGithub} className={styles.github} />
            </Link>

            <div className={styles.spacer} />
            <Link
              href="https://www.npmjs.com/package/react-projection-mapping"
              className={styles.link}
            >
              npm <FontAwesomeIcon icon={faNpm} className={styles.npm} />
            </Link>
          </div>
          <div className={styles.elements}>
            <Element
              className={styles.exhibition}
              wrapperClassName={styles.exhibitionWrapper}
              href="https://github.com/wirewirewirewire"
              text="Exhibition Management"
              scene="https://prod.spline.design/cRFO1K5kSDHeXPer/scene.splinecode"
            ></Element>
            {/* <Demo /> */}
            <DemoPoints />
          </div>
        </main>
      </Wrapper>
    </UNCoreProvider>
  );
}
