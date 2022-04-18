import data from "../../data/data";
import Category from "../../../interfaces/category";

import CategoryComponent from "../../components/category/Category";

export default function Trending() {
  return (
    <div className="trending_container">
      {data.collections.map((category: Category) => {
        return <CategoryComponent category={category} />;
      })}
    </div>
  );
}
