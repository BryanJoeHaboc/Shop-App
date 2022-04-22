import Category from "../../../interfaces/category";
import "./Category.scss";
import data from "../../data/data";
import { useParams } from "react-router-dom";

import CategoryComponent from "./Category";

type Props = {
  category?: Category;
};

export default function RenderCategory({ category }: Props) {
  const { categoryType } = useParams();
  let singleCategory: Category[] = [];
  if (categoryType) {
    singleCategory = data.collections.filter(
      (category) => category.title.toLowerCase() === categoryType
    );

    console.log(singleCategory[0]);
  }

  return (
    <>
      {categoryType ? (
        <CategoryComponent
          category={singleCategory[0]}
          count={singleCategory[0].items.length}
        />
      ) : (
        <CategoryComponent category={category!} count={3} />
      )}
    </>
  );
}
