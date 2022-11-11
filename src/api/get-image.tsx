const getOneImage = async (imgName: string) => {
  let response = await fetch(
    `https://hamsterwars.onrender.com/getimage/${imgName}`
  );
  let hamster = await response.json();
  if (hamster) {
    return hamster;
  }
};

export default getOneImage;
