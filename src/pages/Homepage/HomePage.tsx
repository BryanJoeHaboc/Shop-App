import Card from "../../components/menuItem/MenuItem";
import section from "../../../interfaces/menuItem";
import "./HomePage.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addAllProducts,
  addCategories,
  getProducts,
  getProductsFromDB,
} from "../../features/product/productSlice";
import { getUser } from "../../features/user/userSlice";

// type menuItem = {
//   imageUrl: string;
//   imageAlt: string;
//   title: string;
//   price: number;
//   size: string;
// };
// type Props = {
//   menuItems: menuItem[];
// };

const INITIAL_STATE = {
  sections: [
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      size: "large",
      _id: 4,
      linkUrl: "shop/womens",
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      size: "large",
      _id: 5,
      linkUrl: "shop/mens",
    },
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      _id: 1,
      linkUrl: "shop/hats",
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      _id: 2,
      linkUrl: "shop/jackets",
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      _id: 3,
      linkUrl: "shop/sneakers",
    },
  ],
};

export default function Homepage() {
  const allProducts = useAppSelector(getProducts);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const getProds = async () => {
    if (!allProducts.length) {
      console.log("pumasok");
      const result = await dispatch(getProductsFromDB()).unwrap();
      dispatch(addAllProducts(result.rows));
      console.log("first render!");
      console.log(result);
      const categories: string[] = [];
      result.rows.forEach((prod) => {
        const index = categories.findIndex((title) => title === prod.title);

        if (index < 0) {
          categories.push(prod.title);
        }
      });
      console.log("categories", categories);
      dispatch(addCategories(categories));
    }
  };

  useEffect(() => {
    getProds();
  }, []);

  return (
    <div className="homepage_container">
      {INITIAL_STATE.sections.map((menuItem: section) => (
        <Card menuItem={menuItem} key={menuItem._id} />
      ))}
    </div>
  );
}
