import { useEffect, useState } from "react";

import { getCategories } from "../../features/product/productSlice";
import CategoryComponent from "../category/Category";
import { useAppSelector } from "../../app/hooks";

const AllProducts = () => {
  const cat = useAppSelector(getCategories);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(cat);
  }, [cat]);
  return (
    <div className="all__products__container">
      {categories.map((category: string) => {
        return (
          <CategoryComponent category={category} key={category} count={3} />
        );
      })}{" "}
    </div>
  );
};

export default AllProducts;
