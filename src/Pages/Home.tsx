import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import PizzaBlock from "../Components/PizzaBlock";
import PizzaSkeleton from "../Components/PizzaSkeleton";

import "../SCSS/app.scss";

import {
  changeFilter,
  changeSortCategory,
  filterSelector,
  SortType,
} from "../Redux/slices/filterAndSearchSlice";
import { fetchPizzas, pizzaSelector } from "../Redux/slices/pizzasSlice";
import { useAppDispatch } from "../Redux/store";
import NotPizzas from "../Components/NotPizzas";

const Home: FC = () => {
  const { filterIndex, sortObj, searchValue } = useSelector(filterSelector);
  const { pizzas, status } = useSelector(pizzaSelector);
  const dispatch = useAppDispatch();

  const getPizzas = async () => {
    const category = filterIndex > 0 ? "category=" + filterIndex : "";
    const order = sortObj.sortProperty === "title" ? "asc" : "desc";
    const sort = sortObj.sortProperty;

    dispatch(fetchPizzas({ category, order, sort }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [filterIndex, sortObj]);

  const filteredPizzas = pizzas.map((pizza) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));
  const skeletons = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          valueCategory={filterIndex}
          onClickCategory={(i: number) => dispatch(changeFilter(i))}
        />
        <Sort
          valueSortCategory={sortObj}
          onClickSortCategory={(obj: SortType) =>
            dispatch(changeSortCategory(obj))
          }
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {filteredPizzas.length === 0 && status !== "loading" ? (
        <NotPizzas />
      ) : (
        <div className="content__items">
          {status === "success" ? filteredPizzas : skeletons}
        </div>
      )}
    </div>
  );
};

export default Home;
