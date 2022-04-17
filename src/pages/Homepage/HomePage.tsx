import Card from "../../components/card/MenuItem";
import section from "../../../interfaces/menuItem";
import "./HomePage.scss";

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
      id: 4,
      linkUrl: "shop/womens",
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      size: "large",
      id: 5,
      linkUrl: "shop/mens",
    },
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      id: 1,
      linkUrl: "shop/hats",
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      id: 2,
      linkUrl: "shop/jackets",
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      id: 3,
      linkUrl: "shop/sneakers",
    },
  ],
};

export default function Homepage() {
  return (
    <div className="homepage_container">
      {INITIAL_STATE.sections.map((menuItem: section) => (
        <Card menuItem={menuItem} key={menuItem.id} />
      ))}
    </div>
  );
}
