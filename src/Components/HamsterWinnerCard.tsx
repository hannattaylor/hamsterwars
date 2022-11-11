import { useEffect, useState } from "react";
import getOneImage from "../api/get-image";
import { Hamster } from "../models/interfaces";
import styles from "./css/hamster-winner-card.module.css";

type props = {
  hamster: Hamster;
};

export default function HamsterWinnerCard(props: props) {
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
        <h2 className={styles.title}>Vinnaren {hamster.name} 🥇</h2>
        <img className={styles.img} src={image} alt="losing hamster" />
        <p>
          Har vunnit {hamster.wins} av {hamster.games} matcher
        </p>
      </section>
    </div>
  );
}
