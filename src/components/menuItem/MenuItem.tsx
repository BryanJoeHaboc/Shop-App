import section from "../../../interfaces/menuItem";
import "./MenuItem.scss";

type Props = {
  menuItem: section;
};

export default function Card({ menuItem }: Props) {
  const { title, imageUrl, size } = menuItem;
  return (
    <div className={`card_container ${size}`}>
      <img src={imageUrl} alt={title} />
      <p>{title.toUpperCase()}</p>
    </div>
  );
}
