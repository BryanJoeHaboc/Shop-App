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
import { useLocation, useSearchParams } from "react-router-dom";
import { getUser } from "../../features/user/userSlice";
import Modal from "../../components/modal/Modal";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";

type Props = {
  itemsPerPage: number;
};

const AllProducts = ({ itemsPerPage }: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const allItems = useRef<Product[]>();
  const [modalMessages, setModalMessages] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  allItems.current = useAppSelector(getProducts);
  let [searchParams] = useSearchParams();
  let search = searchParams.get("search");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(getUser);

  useEffect(() => {
    console.log(location);
    let state: { message: string } = location.state as { message: string };
    if (user.userType === "admin") {
      if (state && state.message) {
        setModalMessages(state.message);
        setToggleModal(!toggleModal);
        location.state = {};
      }
    }
  }, [location.state, location]);

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
        {user.userType === "admin" && (
          <Modal
            close={() => setToggleModal(!toggleModal)}
            shown={toggleModal}
            children={
              <div>
                <h1>{modalMessages}</h1>
                <ButtonWithTheme
                  display="Okay"
                  clickFunc={() => setToggleModal(!toggleModal)}
                />
              </div>
            }
            modalContentClass="modal-content-messages"
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
