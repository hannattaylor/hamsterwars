import React from "react";
import deleteMatch from "../api/delete-match";
import updateHamster from "../api/update-hamster";
import { MatchObj } from "../models/interfaces";
import styles from "./css/match-card.module.css";

type props = {
  match: MatchObj;
  getMatches(): void;
};

export default function MatchCard(props: props) {
  const { match, getMatches } = props;

  // **** FUNCTON TO DELETE MATCH AND UPDATE HAMSTER ***** //
  async function removeMatch() {
    await deleteMatch(match.matchID);
    await updateHamster(
      match.loser._id,
      match.loser.wins,
      match.loser.defeats - 1,
      match.loser.games - 1
    );
    await updateHamster(
      match.winner._id,
      match.winner.wins - 1,
      match.winner.defeats,
      match.winner.games - 1
    );
    getMatches();
  }
  return (
    <article className={styles.article}>
      <p className={styles.id}>ID: {match.matchID}</p>
      <section>
        <h3 className={styles.h3}>Vinnaren</h3>
        <img className={styles.img} src={match.winnerImg} alt="" />
        <p className={styles.p}>{match.winner.name}</p>
      </section>
      <section>
        <h3 className={styles.h3}>Förloraren</h3>
        <img className={styles.img} src={match.loserImg} alt="" />
        <p className={styles.p}>{match.loser.name}</p>
      </section>
      <button onClick={removeMatch} className={styles.btn}>
        Ta bort match
      </button>
    </article>
  );
}
