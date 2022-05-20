import { useNavigate } from "react-router-dom";
import section from "../../../interfaces/menuItem";
import "./MenuItem.scss";

type Props = {
  menuItem: section;
};

export default function Card({ menuItem }: Props) {
  const { title, imageUrl, size } = menuItem;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate({
      pathname: `products/${title}`,
    });
  };

  return (
    <div onClick={handleOnClick} className={`card_container ${size}`}>
      <img loading="lazy" src={imageUrl} alt={title} />
      <p className="pointer">{title.toUpperCase()}</p>
    </div>
  );
}
