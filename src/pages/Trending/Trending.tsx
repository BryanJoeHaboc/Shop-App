import data from "../../data/data";
import Category from "../../../interfaces/category";
import "./Trending.scss";
import RenderCategory from "../../components/category/RenderCategory";

export default function Trending() {
  return (
    <div className="trending_container">
      {data.collections.map((category: Category) => {
        return <RenderCategory category={category} />;
      })}
    </div>
  );
}
