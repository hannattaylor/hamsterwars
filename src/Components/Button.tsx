import styles from "./css/button.module.css";

type button = {
  text: string;
  function?(): void;
  icon?: string;
};

export default function Button(props: button) {
  return (
    <button onClick={props.function} className={styles.button}>
      {props.text}
    </button>
  );
}
