import React, { useEffect, useState } from "react";
import { Hamster } from "../models/interfaces";
import getRandomHamster from "../api/random-hamster";
import HamsterBattleCard from "../Components/HamsterBattleCard";
import { CircularProgress } from "@mui/material";
import updateHamster from "../api/update-hamster";
import addNewMatch from "../api/add-new-match";
import styles from "./css/battle-page.module.css";
import HamsterWinnerCard from "../Components/HamsterWinnerCard";
import HamsterLoserCard from "../Components/HamsterLoserCard";
import getOneHamster from "../api/get-one-hamster";
import Button from "../Components/Button";

export default function BattlePage() {
  const [loading, setLoading] = useState(true);
  const [hamsterOne, setHamsterOne] = useState<Hamster>(Object);
  const [hamsterTwo, setHamsterTwo] = useState<Hamster>(Object);
  const [winner, setWinner] = useState<Hamster>(Object);
  const [loser, setLoser] = useState<Hamster>(Object);
  const [weGotAWinner, setWeGotAWinner] = useState(false);

  useEffect(() => {
    getTwoRandomHamsters();
  }, []);

  async function getTwoRandomHamsters() {
    setLoading(true);
    const randomHamsterOne: Hamster = await getRandomHamster();
    const randomHamsterTwo: Hamster = await getRandomHamster();

    if (randomHamsterOne && randomHamsterTwo) {
      if (randomHamsterOne._id !== randomHamsterTwo._id) {
        setHamsterOne(randomHamsterOne);
        setHamsterTwo(randomHamsterTwo);
        setLoading(false);
      }
    }
  }

  async function saveBattleStats(hamster: Hamster) {
    let winnerWins = hamster.wins + 1;
    let winnerDefeats = hamster.defeats;
    let winnerGames = hamster.games + 1;

    await updateHamster(hamster._id, winnerWins, winnerDefeats, winnerGames);

    // If winning hamster is hamterOne - update hamsterTwo with defeat & games
    if (hamster._id === hamsterOne._id) {
      let loserWins = hamsterTwo.wins;
      let loserDefeats = hamsterTwo.defeats + 1;
      let loserGames = hamsterTwo.games + 1;
      await updateHamster(hamsterTwo._id, loserWins, loserDefeats, loserGames);
      await addNewMatch(hamster._id, hamsterTwo._id);
      // setLoser(hamsterTwo);
      getStats(hamster, hamsterTwo);
    }
    // If winning hamster is hamterTwo - update hamsterOne with defeat & games
    if (hamster._id === hamsterTwo._id) {
      let loserWins = hamsterOne.wins;
      let loserDefeats = hamsterOne.defeats + 1;
      let loserGames = hamsterOne.games + 1;
      await updateHamster(hamsterOne._id, loserWins, loserDefeats, loserGames);
      await addNewMatch(hamster._id, hamsterOne._id);
      // setLoser(hamsterOne);
      getStats(hamster, hamsterOne);
    }
  }

  async function getStats(winner: Hamster, loser: Hamster) {
    let winnerHamster = await getOneHamster(winner._id);
    setWinner(winnerHamster);
    let loserHamster = await getOneHamster(loser._id);
    setLoser(loserHamster);
    setWeGotAWinner(true);
  }

  function newBattle() {
    setWeGotAWinner(false);
    getTwoRandomHamsters();
  }

  return (
    <section style={{ textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <section>
          {weGotAWinner ? (
            <section className={styles.big_section}>
              <Button text="SLUMPA FRAM NY MATCH" function={newBattle} />
              <section className={styles.battle_section}>
                <HamsterWinnerCard hamster={winner} />
                <HamsterLoserCard hamster={loser} />
              </section>
            </section>
          ) : (
            <section className={styles.big_section}>
              <h1 className={styles.h1}>Vem är sötast?</h1>
              <section className={styles.battle_section}>
                <HamsterBattleCard
                  hamster={hamsterOne}
                  function={saveBattleStats}
                />
                <HamsterBattleCard
                  hamster={hamsterTwo}
                  function={saveBattleStats}
                />
              </section>
            </section>
          )}
        </section>
      )}
    </section>
  );
}
