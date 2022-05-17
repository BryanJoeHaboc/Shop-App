import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import Product from "../../../interfaces/product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProducts,
  searchProducts,
} from "../../features/product/productSlice";
import Loading from "../../components/misc/Loading";
import ProductComponent from "../../components/product/Product";
import "./AllProducts.scss";
import { useSearchParams } from "react-router-dom";

type Props = {
  itemsPerPage: number;
};

const AllProducts = ({ itemsPerPage }: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const allItems = useRef<Product[]>();
  allItems.current = useAppSelector(getProducts);
  let [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get("search");
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(searchParams.get("search"));
    if (search) {
      allItems.current = dispatch(searchProducts(search));
    }

    if (itemsPerPage !== undefined && allItems.current !== undefined) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setAllProducts(allItems.current.slice(itemOffset, endOffset));
      console.log(allProducts);
      setPageCount(Math.ceil(allItems.current.length / itemsPerPage));
      setIsLoading(false);
    }
  }, [itemOffset, itemsPerPage, search]);

  // Invoke when user click to request another page.
  type HandlePageClick = {
    selected: number;
  };

  const handlePageClick = (event: HandlePageClick) => {
    const newOffset =
      (event.selected * itemsPerPage) % allItems!.current!.length;
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
        ) : allProducts.length ? (
          allProducts.map((item) => {
            return <ProductComponent product={item} />;
          })
        ) : (
          <h1>No Available Products</h1>
        )}
      </div>

      <div className="pageButton">
        {" "}
        {itemsPerPage && !!allProducts.length && (
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
