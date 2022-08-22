import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../src/styles/utilStyles.module.css";
import React from "react";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/">
            <a>
              <Image className={utilStyles.imageCircle} src="/images/images.jpg" alt="profile" width={70} height={70} />
            </a>
          </Link>
          <h1>パソコンショップ</h1>
        </div>
        {children}
      </div>

    </>
  );
}

export default Layout;
