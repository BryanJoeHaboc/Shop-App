import Category from "../../../interfaces/category";
import "./Category.scss";
import { useParams } from "react-router-dom";
// import data from "../../data/data";
import CategoryComponent from "./Category";
import { useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/product/productSlice";

type Props = {
  category?: Category;
};

export default function RenderCategory({ category }: Props) {
  const { categoryType } = useParams();
  const data = useAppSelector(getProducts);

  let singleCategory: Category[] = [];

  if (categoryType) {
    singleCategory = data.collections.filter(
      (category) => category.title.toLowerCase() === categoryType
    );
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
