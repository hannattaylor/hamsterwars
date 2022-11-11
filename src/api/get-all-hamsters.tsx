async function getAllHamsters() {
  let response = await fetch("https://hamsterwars.onrender.com/hamsters");
  let hamsters = await response.json();
  if (hamsters) {
    return hamsters;
  }
}

export default getAllHamsters;
