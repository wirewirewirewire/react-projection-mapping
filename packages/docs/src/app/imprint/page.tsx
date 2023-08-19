"use client";
import { Story, UNCoreProvider, Wrapper } from "@un/react";
import Link from "next/link";
import React from "react";
import styles from "./imprint.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";

export default function Imprint() {
  return (
    <UNCoreProvider prefix="wfp">
      <Wrapper pageWidth="md" className={styles.wrapper}>
        <Link href="/" className={styles.link}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
          Zurück
        </Link>
        <Story>
          <h3>Angaben gemäß § 5 TMG:</h3>
          <p>
            Polyxo Studios GmbH
            <br />
            Geschäftsführer: Robert Gühne
          </p>

          <p>
            <a href="https://goo.gl/maps/ntgCaeDHmgBtU96NA" target="_blank">
              Ernst-König-Straße 1
            </a>
            <br /> 06108 Halle (Saale)
          </p>

          <h4>Kontakt</h4>
          <p>
            Telefon: <a href="tel:+49 (0) 157 87626522">+49 (0) 157 87626522</a>
            <br />
            E-Mail: <a href="mailto:info@polyxo.de">info@polyxo.de</a>
          </p>
        </Story>
      </Wrapper>
    </UNCoreProvider>
  );
}
