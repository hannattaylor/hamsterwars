const getTopFiveLosers = async () => {
  const response = await fetch("https://hamsterwars.onrender.com/losers");
  const topFive = await response.json();
  if (topFive) {
    return topFive;
  }
};

export default getTopFiveLosers;
