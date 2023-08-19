"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { Button, UNCoreProvider, Wrapper } from "@un/react";
import Element from "@/components/Element";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <UNCoreProvider prefix="wfp">
      <Wrapper pageWidth="md">
        <main className={styles.main}>
          <div className={styles.description}>
            <h2 className={styles.title}>
              <b className={styles.mainTitle}>Polyxo</b> Studios GmbH
            </h2>
          </div>
          <div className={styles.elements}>
            <Element
              className={styles.exhibition}
              wrapperClassName={styles.exhibitionWrapper}
              href="https://github.com/wirewirewirewire"
              text="Exhibition Management"
              scene="https://prod.spline.design/LqDQiJyy9JLJLDym/scene.splinecode"
            ></Element>

            <Element
              className={styles.wirewire}
              wrapperClassName={styles.wirewireWrapper}
              href="https://wirewire.de"
              text="wirewire GmbH"
              scene="https://prod.spline.design/nlOa3J6EuYkGxK6j/scene.splinecode"
            ></Element>
            <Element
              className={styles.anaboxSmart}
              wrapperClassName={styles.anaboxSmartWrapper}
              fullWidth
              href="https://anabox-smart.de"
              text="ANABOX smart"
              // scene="https://prod.spline.design/VgqZLz33bxCW9hvb/scene.splinecode"
              scene="https://prod.spline.design/SWGXSXjKWfLlZVAQ/scene.splinecode"
            ></Element>
          </div>

          <div className={styles.footer}>
            <Link
              href="https://anabox-smart.de/posts/career"
              className={styles.link}
            >
              Jobs
            </Link>

            <div className={styles.spacer} />
            <Link href="/imprint" className={styles.link}>
              Impressum
            </Link>
          </div>
        </main>
      </Wrapper>
    </UNCoreProvider>
  );
}
