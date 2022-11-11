export type Hamster = {
  _id: string;
  id?: number;
  name: string;
  age: number;
  favFood: string;
  loves: string;
  imgName: string;
  wins: number;
  defeats: number;
  games: number;
};

export type AddHamster = {
  name: string;
  age: string;
  favFood: string;
  loves: string;
  imgName: string;
  wins: number;
  defeats: number;
  games: number;
};

export interface Form {
  [key: string]: Property;
}

export type Property = {
  value: string;
  error: boolean;
  errorMessage: string;
};

export type file = {
  imgName: string;
  base64: {};
};

export type fileString = {
  imgName: string;
  base64: string;
};

export type loserFile = {
  _id?: string;
  imgName: string;
  base64: string;
};

export type Match = {
  loserId: string;
  winnerId: string;
  _id: string;
};

export type MatchObj = {
  matchID: string;
  winner: Hamster;
  winnerImg: string;
  loser: Hamster;
  loserImg: string;
};
