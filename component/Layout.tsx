import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../src/styles/utilStyles.module.css";
import React from "react";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.container}>
            <Image className={utilStyles.imageCircle} src="/images/images.jpg" alt="profile" width={70} height={70} />
          </a>
        </Link>
        <h1>Tenju Hattori</h1>
        <article>
          {children}
        </article>
      </div>

    </>
  );
}

export default Layout;
