const getTopFiveWinners = async () => {
  const response = await fetch("https://hamsterwars.onrender.com/winners");
  const topFive = await response.json();
  if (topFive) {
    return topFive;
  }
};

export default getTopFiveWinners;
