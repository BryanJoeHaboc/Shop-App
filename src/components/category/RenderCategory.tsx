import Category from "../../../interfaces/category";
import "./Category.scss";
import { useParams } from "react-router-dom";
// import data from "../../data/data";
import CategoryComponent from "./Category";
import { useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import Loading from "../misc/Loading";

type Props = {
  category?: Category;
};

export default function RenderCategory({ category }: Props) {
  const { categoryType } = useParams();
  const [singleCategory, setSingleCategory] = useState<Category[]>([]);
  // const singleCategory = useRef<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { collections } = useAppSelector(getProducts);

  useEffect(() => {
    if (categoryType) {
      setSingleCategory(
        collections.filter(
          (category) => category.title.toLowerCase() === categoryType
        )
      );
      console.log(
        setSingleCategory(
          collections.filter(
            (category) => category.title.toLowerCase() === categoryType
          )
        )
      );
    }
    console.log("hawa");
    setIsLoading(false);
  }, [categoryType, collections]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : categoryType ? (
        // used  for showing all items in a category
        <Pagination
          category={singleCategory[0]}
          count={singleCategory[0].items.length}
          itemsPerPage={4}
          key={categoryType}
        />
      ) : (
        // highlights only n+1 products in the trending page
        <CategoryComponent category={category!} count={3} />
      )}
    </>
  );
}
