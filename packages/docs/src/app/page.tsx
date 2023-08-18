import Image from "next/image";
import styles from "./page.module.css";
import Demo from "../../components/Demo";

export default function Home() {
  return (
    <main className={styles.main}>
      <Demo />
    </main>
  );
}
