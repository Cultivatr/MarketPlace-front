import React from "react";
import { NavigationItems } from "../NavigationItems/NavigationItems";
import styles from "./Toolbar.module.css";
import AdminNav from "../../AdminNav";

const toolbar = ({ pendingLength, updateApp }) => (
  <div id="desktop-menu">
    <AdminNav updateApp={updateApp} />
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationItems pendingLength={pendingLength} updateApp={updateApp} />
      </nav>
    </header>
  </div>
);

export default toolbar;
