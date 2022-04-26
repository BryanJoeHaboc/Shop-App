import data from "../../data/data";
import Category from "../../../interfaces/category";
import "./Trending.scss";
import RenderCategory from "../../components/category/RenderCategory";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/user/userSlice";

export default function Trending() {
  const user = useAppSelector(getUser);
  console.log(user);
  return (
    <div className="trending_container">
      {data.collections.map((category: Category) => {
        return <RenderCategory category={category} key={category._id} />;
      })}{" "}
    </div>
  );
}
