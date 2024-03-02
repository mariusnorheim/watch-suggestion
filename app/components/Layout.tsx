import React, { ReactNode } from "react";
import Head from "@components/Head";
import Header from "@components/Header";
import styles from "@styles/Layout.module.css";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => (
  <>
    <Head title={props.title} />
    <Header />
    <main className={styles.main}>
      <div className="container">
        <div className="page">{props.children}</div>
      </div>
    </main>
  </>
);

export default Layout;
