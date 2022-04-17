import section from "../../../interfaces/menuItem";
import "./MenuItem.scss";

type Props = {
  menuItem: section;
};

export default function Card({ menuItem }: Props) {
  // const { imageUrl, imageAlt, size } = menuItem;
  console.log(menuItem);
  console.log(menuItem.size);
  return (
    <div className={`card_container ${menuItem.size}`}>
      <img src={menuItem.imageUrl} alt={menuItem.title} />
    </div>
  );
}
