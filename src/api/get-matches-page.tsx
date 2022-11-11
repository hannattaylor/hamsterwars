const get10Matches = async (page: number) => {
  let response = await fetch(
    `https://hamsterwars.onrender.com/matches/${page}`
  );
  let matches = await response.json();
  if (matches) {
    return matches;
  }
};
export default get10Matches;
