import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PizzaType } from "../Redux/slices/pizzasSlice";

import axios from "axios";

import styles from "../SCSS/modules/FullPizza.module.scss";
import FullPizzaSckeleton from "../Components/FullPizzaSckeleton";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<PizzaType>();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63d8f16874f386d4efe13bb7.mockapi.io/Pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка в получении пицц");
      }
    }
    fetchPizza();
  }, [id]);

  return (
    <div className={styles.container}>
      {pizza ? (
        <>
          <img src={pizza?.imageUrl} alt="pizza" />
          <h1>{pizza?.title}</h1>
          <p>{pizza?.description}</p>
        </>
      ) : (
        <FullPizzaSckeleton />
      )}
    </div>
  );
};

export default FullPizza;
