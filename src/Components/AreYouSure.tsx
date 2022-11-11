import React, { useEffect, useState } from "react";
import getOneImage from "../api/get-image";
import removeHamster from "../api/remove-hamster";
import { Hamster } from "../models/interfaces";
import Button from "./Button";
import styles from "./css/are-you-sure.module.css";

type props = {
  hamster: Hamster;
  toggle(): void;
  updateUI(): void;
};

export default function AreYouSure(props: props) {
  const { hamster } = props;

  const [image, setImage] = useState();

  async function getImage() {
    const image = await getOneImage(hamster.imgName);
    setImage(image.base64);
  }
  useEffect(() => {
    getImage();
  }, []);

  async function removeHam(id: string) {
    await removeHamster(id);
    props.toggle();
    props.updateUI();
  }

  return (
    <section className={styles.big_section}>
      <article className={styles.article}>
        <h3>Är du säker på att du vill ta bort {hamster.name} ? 😢</h3>
        <img src={image} alt="" />
        <div className={styles.div} onClick={() => removeHam(hamster._id)}>
          <Button text={`JA, ${hamster.name} ska bort`} />
        </div>
        <div className={styles.div} onClick={() => props.toggle()}>
          <Button text="NEJ, jag ångrar mig!!" />
        </div>
      </article>
    </section>
  );
}
