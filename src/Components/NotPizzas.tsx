import { FC } from "react";
import styles from "../SCSS/modules/NotFoundBlock.module.scss";

const NotPizzas: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Пицц с таким названием не найдено
      </h1>
      <p className={styles.description}>
        Попробуйте указать другое название в поиске
      </p>
    </div>
  );
};
export default NotPizzas;
