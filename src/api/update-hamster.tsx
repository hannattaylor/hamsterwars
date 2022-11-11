const updateHamster = async (
  id: string,
  wins: number,
  defeats: number,
  games: number
) => {
  await fetch(`https://hamsterwars.onrender.com/hamsters/${id}`, {
    method: "PUT",
    body: JSON.stringify({ wins: wins, defeats: defeats, games: games }),
    headers: { "Content-Type": "application/json" },
  }).then((resp) => console.log(resp.status));
};

export default updateHamster;
