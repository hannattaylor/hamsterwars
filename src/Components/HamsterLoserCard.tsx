import React, { useEffect, useState } from "react";
import getOneImage from "../api/get-image";
import { Hamster } from "../models/interfaces";
import styles from "./css/hamster-loser-card.module.css";

type props = {
  hamster: Hamster;
};

export default function HamsterLoserCard(props: props) {
  const { hamster } = props;

  const [image, setImage] = useState();
  async function getImage() {
    const image = await getOneImage(hamster.imgName);
    setImage(image.base64);
  }
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <section>
        <h2>Förloraren {hamster.name} 🥈</h2>
        <img className={styles.img} src={image} alt="losing hamster" />
        <p>
          Har förlorat {hamster.defeats} av {hamster.games} matcher
        </p>
      </section>
    </div>
  );
}
