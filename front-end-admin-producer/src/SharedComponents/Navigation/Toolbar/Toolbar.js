import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Toolbar.module.css";
import AdminNav from "../../AdminNav";

const toolbar = () => (
  <div id="desktop-menu">
    <AdminNav />
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationItems />
      </nav>
    </header>
  </div>
);

export default toolbar;
