import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Product from "../../../interfaces/product";
import { useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/product/productSlice";
import Loading from "../../components/misc/Loading";
import ProductComponent from "../../components/product/Product";
import "./AllProducts.scss";

type Props = {
  itemsPerPage: number;
};

const AllProducts = ({ itemsPerPage }: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const allItems = useAppSelector(getProducts);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (itemsPerPage !== undefined) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setAllProducts(allItems.slice(itemOffset, endOffset));
      console.log(allProducts);
      setPageCount(Math.ceil(allItems.length / itemsPerPage));
      if (allItems.length > 0) {
        setIsLoading(false);
      }
    }
  }, [itemOffset, itemsPerPage, allItems]);

  // Invoke when user click to request another page.
  type HandlePageClick = {
    selected: number;
  };

  const handlePageClick = (event: HandlePageClick) => {
    const newOffset = (event.selected * itemsPerPage) % allItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="all__products">
      <div className="all__products__content">
        {isLoading ? (
          <Loading />
        ) : (
          allProducts.map((item) => {
            return <ProductComponent product={item} />;
          })
        )}
      </div>

      <div className="pageButton">
        {" "}
        {itemsPerPage && allProducts.length && (
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

export default AllProducts;
