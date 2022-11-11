import React from "react";
import { Hamster } from "../models/interfaces";
import styles from "./css/hamster-chosen-card.module.css";

type props = {
  hamster: Hamster;
  img: string;
};

export default function HamsterChosenCard(props: props) {
  return (
    <article className={styles.article}>
      <section>
        <img className={styles.img} src={props.img} alt="" />
      </section>
      <section className={styles.info_section}>
        <div className={styles.div}>
          <h2>{props.hamster.name}</h2>
          <h3>{props.hamster.age} år</h3>
        </div>

        <p className={styles.p}>
          <span className={styles.span}>🥗</span> Äter helst{" "}
          {props.hamster.favFood}
        </p>
        <p className={styles.p}>
          <span className={styles.span}>🙌</span> Älskar att{" "}
          {props.hamster.loves}
        </p>
        <p className={styles.p}>
          <span className={styles.span}>🥇</span> Har vunnit{" "}
          {props.hamster.wins} matcher
        </p>
        <p className={styles.p}>
          <span className={styles.span}>🥈</span> Har förlorat{" "}
          {props.hamster.defeats} matcher
        </p>
      </section>
    </article>
  );
}
