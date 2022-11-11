import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./css/start-page.module.css";
import Button from "../Components/Button";

export default function StartPage() {
  const [serverIsReachable, setServerIsReachable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isReachable();
  }, []);

  async function isReachable() {
    try {
      setLoading(true);
      await fetch("https://hamsterwars.onrender.com/status").then((resp) => {
        if (resp.status === 200) {
          setServerIsReachable(true);
          setLoading(false);
        } else {
          setServerIsReachable(false);
        }
      });
    } catch (err) {
      console.error(err);
      setServerIsReachable(false);
    }
  }
  return (
    <section>
      {loading ? <CircularProgress className={styles.progress} /> : null}
      {serverIsReachable ? (
        <section className={styles.section}>
          <p>
            Tävlingen är enkel; vilken hamster är sötast? <br />
            <br /> <span style={{ fontSize: "2rem" }}>🐹</span> Det enda du
            behöver göra är att klicka på den sötaste hamstern{" "}
            <span style={{ fontSize: "2rem" }}>🐹</span>
          </p>
          <img
            className={styles.img}
            src={require("../hamster-1.jpg")}
            alt=""
          />
          <img
            className={styles.img}
            src={require("../hamster-16.jpg")}
            alt=""
          />
          <br />
          <Link to="/battle">
            <Button text="BÖRJA TÄVLA" />
          </Link>
        </section>
      ) : (
        <section className={styles.serverErrorSection}>
          <h1>Ohnooo servern är inte tillgänglig 😢 </h1>
          <p>Vänta en stund och försök sedan igen</p>
          <button onClick={isReachable} className={styles.button}>
            Testa igen
          </button>
        </section>
      )}
    </section>
  );
}
