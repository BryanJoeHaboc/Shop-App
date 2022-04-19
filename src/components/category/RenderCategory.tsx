import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";
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
      (category) => category.title === categoryType
    );
    console.log(singleCategory);
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
