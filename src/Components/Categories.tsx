import { FC } from "react";

const categories = [
  "Все",
  "Мясо",
  "Курица",
  "Острые",
  "Вегетарианская",
  "Необычные",
];
type CategoriesTypeProops = {
  valueCategory: number;
  onClickCategory: (i: number) => void;
};

const Categories: FC<CategoriesTypeProops> = ({
  valueCategory,
  onClickCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={valueCategory === i ? "active" : ""}
            key={i}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
