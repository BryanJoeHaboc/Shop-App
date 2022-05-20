import { useNavigate } from "react-router-dom";
import Product from "../../../interfaces/product";

type Props = {
  product: Product;
};

const MiniProducts = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/product/${product._id}`, { state: { product: product } });
  };

  return (
    <div className="shopping_cart_items" onClick={handleOnClick}>
      <img loading="lazy" src={product.imageUrl} alt="" />
      <div className="shopping_cart_items_info">
        <p className="bold_900">{product.name}</p>
        <p className="bold_600">Price: {product.price}</p>
      </div>
    </div>
  );
};

export default MiniProducts;
