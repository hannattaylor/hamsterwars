import { file } from "../models/interfaces";

const addNewImage = async (img: file) => {
  try {
    await fetch(`https://hamsterwars.onrender.com/addimage`, {
      method: "POST",
      body: JSON.stringify(img),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      console.log(resp);

      return resp.json();
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewImage;
