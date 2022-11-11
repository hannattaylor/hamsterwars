import { AddHamster } from "../models/interfaces";

const addNewHamster = async (newHamster: AddHamster) => {
  try {
    await fetch(`https://hamsterwars.onrender.com/hamsters`, {
      method: "POST",
      body: JSON.stringify(newHamster),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        resp.json();
      })
      .then((data) => {
        return data;
      });
  } catch (err) {
    console.error(err);
  }
};

export default addNewHamster;
