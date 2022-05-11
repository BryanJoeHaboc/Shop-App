import Category from "../../../interfaces/category";
import "./Category.scss";
import { useParams } from "react-router-dom";
// import data from "../../data/data";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCollection } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import Loading from "../misc/Loading";

export default function RenderCategory() {
  const { categoryType } = useParams();
  const [singleCategory, setSingleCategory] = useState<Category>({
    _id: 0,
    title: "",
    routeName: "",
    items: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (categoryType) {
      const collection = dispatch(getCollection(categoryType));
      setSingleCategory(collection);
      setIsLoading(false);
    }
  }, [categoryType]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        // used  for showing all items in a category
        <Pagination
          category={singleCategory}
          count={singleCategory.items.length}
          itemsPerPage={4}
        />
      )}
    </>
  );
}
