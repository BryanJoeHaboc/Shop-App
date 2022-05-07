import Product from "../../../interfaces/product";
import ProductComponent from "../../components/product/Product";
import Category from "../../../interfaces/category";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  category: Category;
  count: number;
  itemsPerPage: number;
};

const Pagination = ({ category, count, itemsPerPage }: Props) => {
  const { title, items } = category;
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [prodCount, setProdCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (itemsPerPage !== undefined) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, location]);

  // Invoke when user click to request another page.
  type HandlePageClick = {
    selected: number;
  };

  const handlePageClick = (event: HandlePageClick) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={`category_container`}>
      <p className="container_title">
        <Link to={`/products/${title.toLowerCase()}`}>{title}</Link>
      </p>
      <div
        className={`category_product_container  ${
          count === category.items.length ? "wrap" : ""
        }`}
      >
        {currentItems.map((product: Product) => {
          if (prodCount <= count && itemsPerPage !== undefined) {
            console.log(prodCount);
            setProdCount((prevState) => prevState + 1);
            return <ProductComponent product={product} key={product._id} />;
          } else if (itemsPerPage) {
            return <ProductComponent product={product} key={product._id} />;
          }
          return null;
        })}
      </div>
      <div>
        {itemsPerPage && (
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            activeClassName="active"
            previousLabel="<"
            // renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;