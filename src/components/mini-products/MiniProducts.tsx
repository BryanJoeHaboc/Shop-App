import Product from "../../../interfaces/product";

type Props = {
  product: Product;
  cssClass?: string;
  description?: string;
};

const MiniProducts = ({ product, cssClass, description }: Props) => {
  return (
    <div className={cssClass ? `${cssClass}` : "shopping_cart_items"}>
      <img src={product.imageUrl} alt="product" />
      <div className="shopping_cart_items_info">
        <p className="bold_900">{product.name}</p>
        <p className="bold_600">Price: {product.price}</p>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
};

export default MiniProducts;
