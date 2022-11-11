import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getOneImage from "../api/get-image";
import getOneHamster from "../api/get-one-hamster";
import getWinnerMatches from "../api/get-winnermatches-id";
import Button from "../Components/Button";
import HamsterChosenCard from "../Components/HamsterChosenCard";
import { Hamster, loserFile, Match } from "../models/interfaces";
import styles from "./css/hamster-page.module.css";

export default function HamsterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hamsterFromState = location.state;
  const [img, setImg] = useState("");
  const [hamster, setHamster] = useState<Hamster>(hamsterFromState);
  const [loserImages, setLoserImages] = useState(new Set<string>());
  const [finalImgs, setFinalImgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImage();
    getLosers();
  }, []);

  async function getImage() {
    setLoading(true);
    const image = await getOneImage(hamster.imgName);
    setImg(image.base64);
    setLoading(false);
  }

  async function getLosers() {
    const matches = await getWinnerMatches(hamster._id);

    matches.forEach(async (match: Match) => {
      const hamster = await getOneHamster(match.loserId);
      const img: loserFile = await getOneImage(hamster.imgName);
      setLoserImages((prev) => new Set(prev).add(img.base64));
    });
  }

  const update = () => {
    loserImages.forEach((item) => {
      setFinalImgs((prev) => [...prev, item]);
    });
  };

  return (
    <section>
      {loading ? (
        <section style={{ textAlign: "center" }}>
          <CircularProgress />
        </section>
      ) : (
        <section>
          <p className={styles.breadcrumb}>
            <span
              className={styles.bread_span}
              onClick={() => navigate("/gallery")}
            >
              galleri
            </span>
            {" > "}

            <span> {hamster.name.toLowerCase()}</span>
          </p>
          <HamsterChosenCard hamster={hamster} img={img} />
          <h3 style={{ textAlign: "center" }}>
            Vill du se vilka {hamster.name} har vunnit över?{" "}
            <Button function={() => update()} text={` Klicka här`}></Button>
          </h3>

          <section className={styles.defeted_section}>
            {finalImgs.map((img, i) => (
              <img className={styles.defeted_img} key={i} src={img}></img>
            ))}
          </section>
        </section>
      )}
    </section>
  );
}
