const getWinnerMatches = async (id: string) => {
  let response = await fetch(
    `https://hamsterwars.onrender.com/matchwinners/${id}`
  );
  let winnermatches = await response.json();
  if (winnermatches) {
    return winnermatches;
  }
};

export default getWinnerMatches;
