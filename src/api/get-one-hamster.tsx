const getOneHamster = async (id: string) => {
  let response = await fetch(`https://hamsterwars.onrender.com/hamsters/${id}`);
  let hamster = await response.json();
  if (hamster) {
    return hamster;
  }
};

export default getOneHamster;
