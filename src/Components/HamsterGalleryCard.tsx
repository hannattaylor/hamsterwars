import React, { useEffect, useState } from "react";
import { ImageListItem } from "@mui/material";
import { Hamster } from "../models/interfaces";
import styles from "./css/hamster-gallery-card.module.css";
import getOneImage from "../api/get-image";
import { useNavigate } from "react-router-dom";

type props = {
  hamster: Hamster;
  remove: boolean;
  removeHamster(hamster: Hamster): void;
};

export default function HamsterGalleryCard(props: props) {
  const [removeButton, setRemoveButton] = useState(props.remove);
  const [image, setImage] = useState();
  const { hamster } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    setRemoveButton(props.remove);
  }, [props.remove]);

  async function getImage() {
    const image = await getOneImage(hamster.imgName);
    setImage(image.base64);
  }

  function hamsterToMaybeBeRemoved() {
    props.removeHamster(props.hamster);
  }

  function goToHamsterPage(hamster: Hamster) {
    console.log(hamster);
    navigate(`/hamster/${hamster.name}`, { state: hamster });
  }

  return (
    <ImageListItem
      sx={{
        overflow: "hidden",
      }}
    >
      {removeButton ? (
        <div
          onClick={hamsterToMaybeBeRemoved}
          className={styles.remove_btn}
        ></div>
      ) : null}

      <img
        onClick={() => goToHamsterPage(hamster)}
        className={styles.img}
        src={image}
        alt={hamster.name}
        loading="lazy"
      />
    </ImageListItem>
  );
}
