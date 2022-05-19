import Category from "../../../interfaces/category";
import "./Category.scss";
import { useParams } from "react-router-dom";
// import data from "../../data/data";
import { useAppDispatch } from "../../app/hooks";
import { getCollection } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";

export default function RenderCategory() {
  const { categoryType } = useParams();
  const [singleCategory, setSingleCategory] = useState<Category>({
    title: "",
    routeName: "",
    items: [],
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (categoryType) {
      const collection = dispatch(getCollection(categoryType));
      console.log(collection);
      setSingleCategory(collection);
    }

    console.log("haetdog");
  }, [categoryType]);

  return (
    <>
      {
        // used  for showing all items in a category
        <Pagination
          category={singleCategory}
          count={singleCategory.items.length}
          itemsPerPage={4}
        />
      }
    </>
  );
}
