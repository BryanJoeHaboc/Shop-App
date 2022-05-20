import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";

import Card from "../../components/menuItem/MenuItem";
import section from "../../../interfaces/menuItem";
import "./HomePage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addAllProducts,
  addCategories,
  getProducts,
  getProductsFromDB,
} from "../../features/product/productSlice";
import Modal from "../../components/modal/Modal";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";

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
  const [toggleModal, setToggleModal] = useState(true);
  const allProducts = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  const getProds = async () => {
    if (!allProducts.length) {
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
      dispatch(addCategories(categories));
    }
  };

  useEffect(() => {
    getProds();
  }, []);

  return (
    <div className="homepage_container">
      <Modal
        children={
          <div style={{ display: "block" }}>
            <span>
              <h1>
                Welcome to Shopper <ShoppingBasketIcon />
              </h1>
            </span>
            <p style={{ textAlign: "left" }}>
              This is a POC application made with{" "}
              <span className="bold_600">Typescript React Redux</span> as the
              Frontend and <span className="bold_600">Express Mongoose</span> as
              the Backend.{" "}
            </p>
            <br />

            <p style={{ textAlign: "left" }}>
              When using the app,{" "}
              <span className="error bold_600">
                DO NOT USE YOUR PERSONAL EMAIL
              </span>
              . You may use a dummy email instead.
            </p>
            <br />
            <p className="bold_600" style={{ textAlign: "left" }}>
              You may check the Github Repository at:
            </p>
            <br />
            <p className="bold_600">
              <a
                href="https://github.com/BryanJoeHaboc/Shop-App"
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon />: Frontend
              </a>
            </p>
            <p className="bold_600">
              <a
                href="https://github.com/BryanJoeHaboc/NodeRefresher"
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon />: Backend
              </a>
            </p>
            <br />
            <ButtonWithTheme
              display="okay"
              clickFunc={() => setToggleModal(!toggleModal)}
            />
          </div>
        }
        shown={toggleModal}
        close={() => setToggleModal(!toggleModal)}
        modalContentClass="modal-greetings"
      />
      {INITIAL_STATE.sections.map((menuItem: section) => (
        <Card menuItem={menuItem} key={menuItem._id} />
      ))}
    </div>
  );
}
