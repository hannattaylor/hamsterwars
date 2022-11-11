import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import getOneImage from "../api/get-image";
import get10Matches from "../api/get-matches-page";
import getOneHamster from "../api/get-one-hamster";
import getTopFiveLosers from "../api/top-five-losers";
import getTopFiveWinners from "../api/top-five-winners";
import Button from "../Components/Button";
import MatchCard from "../Components/MatchCard";
import { Hamster, Match, MatchObj, fileString } from "../models/interfaces";
import styles from "./css/history-page.module.css";

export default function HistoryPage() {
  const [winnersImg, setWinnersImg] = useState<string[]>([]);
  const [losersImg, setLosersImg] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [matches, setMatches] = useState<MatchObj[]>([]);
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState<number>(10);

  useEffect(() => {
    topFive();
    checkMaxPages();
  }, []);

  useEffect(() => {
    getMatches();
  }, [page]);

  async function checkMaxPages() {
    const resp = await fetch("http://localhost:1227/matches");
    const max = await resp.json();
    const maxPage = Math.floor(max / 10);
    setMaxPages(maxPage);
  }

  async function topFive() {
    const topFiveWinners: Hamster[] = await getTopFiveWinners();
    const topFiveLosers: Hamster[] = await getTopFiveLosers();

    topFiveWinners.forEach(async (winner) => {
      const img = await getOneImage(winner.imgName);
      setWinnersImg((prev) => [...prev, img.base64]);
    });
    topFiveLosers.forEach(async (loser) => {
      const img = await getOneImage(loser.imgName);
      setLosersImg((prev) => [...prev, img.base64]);
    });
  }

  async function getMatches() {
    setLoading(true);
    setMatches([]);
    const matches: Match[] = await get10Matches(page);
    matches.forEach(async (match) => {
      // get img and hamster with id, save in new state object
      const loser: Hamster = await getOneHamster(match.loserId);
      const winner: Hamster = await getOneHamster(match.winnerId);
      const loserImg: fileString = await getOneImage(loser.imgName);
      const winnerImg: fileString = await getOneImage(winner.imgName);

      const hamsterMatch = {
        matchID: match._id,
        winner: winner,
        winnerImg: winnerImg.base64,
        loser: loser,
        loserImg: loserImg.base64,
      };
      setMatches((prev) => [...prev, hamsterMatch]);
    });
    setLoading(false);
  }

  return (
    <section>
      <h1 className={styles.h1}>Topp Fem Vinnare</h1>
      <section className={styles.topfive}>
        {winnersImg.map((hamster, i) => (
          <img className={styles.img} src={hamster} key={i}></img>
        ))}
      </section>
      <h1 className={styles.h1}>Topp Fem Förlorare </h1>
      <section className={styles.topfive}>
        {losersImg.map((hamster, i) => (
          <img src={hamster} className={styles.img} key={i}></img>
        ))}
      </section>

      <h1 className={styles.h1}>Alla matcher</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <section className={styles.matchsection}>
          {matches.map((match, i) => (
            <MatchCard key={i} match={match} getMatches={getMatches} />
          ))}

          <section className={styles.pagination}>
            {page > 0 ? (
              <Button
                function={() => setPage((prev) => prev - 1)}
                text="Föregående sida"
              />
            ) : null}
            <p>
              {page} / {maxPages}
            </p>
            {page < maxPages ? (
              <Button
                function={() => setPage((prev) => prev + 1)}
                text="Nästa sida"
              />
            ) : null}
          </section>
        </section>
      )}
    </section>
  );
}
