const getRandomHamster = async () => {
  try {
    const response = await fetch(
      "https://hamsterwars.onrender.com/hamsters/random"
    );
    const data = await response.json();

    return data[0];
  } catch (err) {
    console.error(err);
  }
};

export default getRandomHamster;
