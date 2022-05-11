import { getCategories, Products } from "../../features/product/productSlice";
import Category from "../../../interfaces/category";
import CategoryComponent from "../category/Category";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const cat = useAppSelector(getCategories);
  const [categories, setCategories] = useState<string[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    setCategories(cat);
    console.log("nasa all products ako");
  }, []);
  return (
    <div className="all__products__container">
      {categories.map((category: string) => {
        return (
          <CategoryComponent category={category} key={idCounter} count={3} />
        );
      })}{" "}
    </div>
  );
};

export default AllProducts;
