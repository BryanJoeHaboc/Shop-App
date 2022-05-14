import Product from "../../../interfaces/product";

type Props = {
  product: Product;
};

const MiniProducts = ({ product }: Props) => {
  return (
    <div className="shopping_cart_items">
      <img src={product.imageUrl} alt="" />
      <div className="shopping_cart_items_info">
        <p className="bold_900">{product.name}</p>
        <p className="bold_600">Price: {product.price}</p>
      </div>
    </div>
  );
};

export default MiniProducts;
