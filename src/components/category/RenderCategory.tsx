import Category from "../../../interfaces/category";
import "./Category.scss";
import { useLocation, useParams } from "react-router-dom";
// import data from "../../data/data";
import { useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import Loading from "../misc/Loading";

export default function RenderCategory() {
  const { categoryType } = useParams();
  const [singleCategory, setSingleCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { collections } = useAppSelector(getProducts);
  useEffect(() => {
    if (categoryType) {
      setSingleCategory(
        collections.filter(
          (category) => category.title.toLowerCase() === categoryType
        )
      );
      setIsLoading(false);
    }
  }, [categoryType, collections]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        // used  for showing all items in a category
        <Pagination
          category={singleCategory[0]}
          count={singleCategory[0].items.length}
          itemsPerPage={4}
        />
      )}
    </>
  );
}
