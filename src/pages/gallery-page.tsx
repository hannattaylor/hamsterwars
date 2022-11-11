import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import getAllHamsters from "../api/get-all-hamsters";
import Button from "../Components/Button";
import HamsterGalleryCard from "../Components/HamsterGalleryCard";
import styles from "./css/gallery-page.module.css";

import { Hamster } from "../models/interfaces";
import AddNewHamster from "../Components/AddNewHamster";
import AreYouSure from "../Components/AreYouSure";

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [hamsters, setHamsters] = useState<Hamster[]>([]);
  const [addNewHamster, setAddNewHamster] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [removeHamster, setRemoveHamster] = useState<Hamster>();

  const [areYouSure, setAreYouSure] = useState(false);

  useEffect(() => {
    getHamsters();
  }, []);

  async function getHamsters() {
    setLoading(true);
    let hamsters = await getAllHamsters();
    setHamsters(hamsters);
    setLoading(false);
  }

  async function toggleAddNewHamsterForm() {
    setAddNewHamster((prev) => !prev);
  }

  async function toggleRemoveHamster() {
    setRemoveButton((prev) => !prev);
  }

  function toBeRemoved(hamster: Hamster) {
    toggleAreYouSure();
    setRemoveHamster(hamster);
  }

  function toggleAreYouSure() {
    setAreYouSure((prev) => !prev);
  }
  return (
    <section style={{ textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <section className={styles.big_wrap}>
          <section className={styles.add_remove_section}>
            <Button
              function={toggleAddNewHamsterForm}
              text="Lägg till en ny hamster"
              icon="AddCircleIcon"
            />
            <Button
              text="Ta bort en hamster"
              icon="DeleteForeverIcon"
              function={toggleRemoveHamster}
            />
          </section>
          <p>** Klicka på en hamster för att få mer info **</p>
          <ImageList sx={{ width: "90vw", margin: "0 auto" }} gap={20} cols={3}>
            {hamsters.map((item, i) => (
              <HamsterGalleryCard
                key={i}
                hamster={item}
                remove={removeButton}
                removeHamster={toBeRemoved}
              />
            ))}
          </ImageList>

          {addNewHamster ? (
            <AddNewHamster
              toggleForm={toggleAddNewHamsterForm}
              updateUI={getHamsters}
            />
          ) : null}

          {areYouSure && removeHamster ? (
            <AreYouSure
              hamster={removeHamster}
              toggle={toggleAreYouSure}
              updateUI={getHamsters}
            />
          ) : null}
        </section>
      )}
    </section>
  );
}
