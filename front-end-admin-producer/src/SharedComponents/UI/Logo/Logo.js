import React from 'react';
import appLogo from '../../../img/logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
  <div className={styles.logoBox}>
    <img src={appLogo} alt="logo" className={styles.logo} />
  </div>
)

export default logo;