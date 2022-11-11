import { useEffect, useState } from "react";
import getOneImage from "../api/get-image";
import { Hamster } from "../models/interfaces";
import styles from "./css/hamster-battle.module.css";

type props = {
  hamster: Hamster;
  function(hamster: Hamster): void;
};

export default function HamsterBattleCard(props: props) {
  const [image, setImage] = useState();
  const { hamster } = props;

  useEffect(() => {
    getImage();
  }, []);

  async function getImage() {
    const image = await getOneImage(hamster.imgName);
    setImage(image.base64);
  }

  return (
    <article onClick={() => props.function(hamster)} className={styles.article}>
      <img className={styles.img} src={image} alt="söt hamster" />
      <section className={styles.name_age_section}>
        <h2 className={styles.name}>{hamster.name}</h2>
        <p>{hamster.age} år</p>
      </section>
      <p className={styles.p}>
        <span className={styles.span}>🥗</span> Äter helst {hamster.favFood}
      </p>
      <p className={styles.p}>
        <span className={styles.span}>🙌</span> Älskar att {hamster.loves}
      </p>
    </article>
  );
}
