import { TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./css/add-new-hamster.module.css";
import { AddHamster, file, Form } from "../models/interfaces";
import addNewHamster from "../api/add-new-hamster";
import addNewImage from "../api/add-new-image";

type props = {
  toggleForm(): void;
  updateUI(): void;
};

export default function AddNewHamster(props: props) {
  const [newImg, setNewImg] = useState<file>();
  const [formValues, setFormValues] = useState<Form>({
    name: {
      value: "",
      error: false,
      errorMessage: "Du måste fylla i ett namn",
    },
    age: {
      value: "",
      error: false,
      errorMessage: "Du måste fylla i en ålder",
    },
    favFood: {
      value: "",
      error: false,
      errorMessage: "Du måste fylla i en favoritmaträtt",
    },
    loves: {
      value: "",
      error: false,
      errorMessage: "Du måste fylla i något som hamstern gillar att göra",
    },
    imgName: {
      value: "",
      error: false,
      errorMessage: "Du måste välja en söt bild på hamstern",
    },
  });

  // ******** Function when value in text-field changes ****** //
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  // ******* HandleSubmit function ******** //
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formToArray = Object.entries(formValues);
    // make a copy of formValues so that we can change values later
    let newFormValues: Form = { ...formValues };

    formToArray.forEach((key) => {
      const currentField = key[0];
      const currentValue = key[1].value;

      // Set newFormValues.error to true if form-field is empty
      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    });
    setFormValues(newFormValues);
    if (newImg) {
      postToDB();
      props.toggleForm();
    }
  }

  //*******/ Function to change img-file to base64 string /*********//
  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  //  ********** Function to save converted img string to state ********* //
  async function saveImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const imgObj: file = {
        imgName: e.target.files[0].name,
        base64: {},
      };
      setFormValues({
        ...formValues,
        imgName: {
          ...formValues.imgName,
          value: e.target.files[0].name,
        },
      });
      getBase64(e.target.files[0])
        .then((result) => {
          if (result) {
            imgObj.base64 = result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setNewImg(imgObj);
    }
  }
  // ********* Function to fetch API with new Hamster and Image ****** //
  async function postToDB() {
    let newHamster: AddHamster = {
      name: formValues.name.value,
      age: formValues.age.value,
      favFood: formValues.favFood.value,
      loves: formValues.loves.value,
      imgName: formValues.imgName.value,
      wins: 0,
      defeats: 0,
      games: 0,
    };
    // API req with new Hamster
    await addNewHamster(newHamster);

    // API req with new Image
    if (newImg) {
      await addNewImage(newImg);
    }

    // Update UI with new hamster
    props.updateUI();
  }

  // **********  Close form window when clicked outside of it ********* //
  function clickOutside(e: any) {
    if (e.target.id === "big_form") {
      props.toggleForm();
    }
  }

  //  ********* RETURN ********* //
  return (
    <section
      id="big_form"
      className={styles.form_section}
      onClick={(e) => clickOutside(e)}
    >
      <form
        className={styles.form}
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>LÄGG TILL NY HAMSTER</h1>
        <TextField
          className={styles.input_field}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Namn"
          name="name"
          error={formValues.name.error}
          helperText={formValues.name.error && formValues.name.errorMessage}
        />
        <TextField
          className={styles.input_field}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Ålder"
          name="age"
          error={formValues.age.error}
          helperText={formValues.age.error && formValues.age.errorMessage}
        />
        <TextField
          className={styles.input_field}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Äter helst..."
          name="favFood"
          error={formValues.favFood.error}
          helperText={
            formValues.favFood.error && formValues.favFood.errorMessage
          }
        />
        <TextField
          className={styles.input_field}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Älskar att..."
          name="loves"
          error={formValues.loves.error}
          helperText={formValues.loves.error && formValues.loves.errorMessage}
        />{" "}
        <TextField
          className={styles.input_field}
          variant="outlined"
          name="imgName"
          defaultValue="Ladda upp en bild nedan"
          disabled
          error={formValues.imgName.error}
          helperText={
            formValues.imgName.error && formValues.imgName.errorMessage
          }
        />
        <input
          className={styles.input_file}
          type="file"
          accept="image/*"
          onChange={(e) => saveImg(e)}
        />
        <button className={styles.btn} type="submit">
          Spara hamster
        </button>
      </form>
    </section>
  );
}
