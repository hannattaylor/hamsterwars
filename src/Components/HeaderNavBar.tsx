import React from "react";
import { Link } from "react-router-dom";
import hamsterlogo from "../hamsterlogo1.svg";
import styles from "./css/header-nav-bar.module.css";

export default function HeaderNavBar() {
  return (
    <section className={styles.header}>
      <Link to="/">
        <article className={styles.logo}>
          <img src={hamsterlogo} alt="" />
          <h1 className={styles.h1}>HamsterWars</h1>
        </article>
      </Link>
      <Link className={styles.link} to="/battle">
        Tävla
      </Link>
      <Link className={styles.link} to="/gallery">
        Galleri
      </Link>
      <Link className={styles.link} to="/history">
        Historik
      </Link>
    </section>
  );
}
