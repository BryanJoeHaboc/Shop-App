import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../app/hooks";
import { searchProducts } from "../../features/product/productSlice";
import Product from "../../../interfaces/product";
import { useEffect, useRef, useState } from "react";
import "./MiniProducts.scss";

import MiniProducts from "../mini-products/MiniProducts";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function CustomizedInputBase() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredProducts, setFiltedProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputSearchBar = useRef<HTMLInputElement | null>(null);
  const miniProductsDiv = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      miniProductsDiv.current &&
      !miniProductsDiv.current.contains(event.target as HTMLDivElement)
    ) {
      setOpenFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSearchProducts = (e: {}) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    setSearchValue(event.target.value);
    const products: Product[] = dispatch(searchProducts(searchValue));
    // console.log(products);
    setFiltedProducts(products);

    if (inputSearchBar?.current?.children[0]) {
      setOpenFilter(true);
    }
  };

  const handleSubmit = (e: {}) => {
    const event = e as React.FormEvent<HTMLInputElement>;
    event.preventDefault();
    const search = searchValue;
    setSearchValue("");
    navigate({
      pathname: "products",
      search: createSearchParams({ search }).toString(),
    });
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      if (miniProductsDiv.current) {
        miniProductsDiv.current.style.display = "none";
      }
    } else {
      if (miniProductsDiv.current) {
        miniProductsDiv.current.style.display = "block";
      }
    }
  }, [searchValue]);

  return (
    <Paper
      onSubmit={handleSubmit}
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        ref={inputSearchBar}
        sx={{ ml: 1, flex: 1, width: "500px" }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "Search products" }}
        onChange={(e) => handleSearchProducts(e)}
        size="medium"
        value={searchValue}
      />

      <IconButton type="submit" sx={{ p: "12px" }} aria-label="search">
        <SearchIcon />
      </IconButton>

      {openFilter && (
        <div ref={miniProductsDiv} className="mini_products_container ">
          {filteredProducts.length ? (
            filteredProducts.map((prod) => <MiniProducts product={prod} />)
          ) : (
            <h2>No Available Products</h2>
          )}
        </div>
      )}
    </Paper>
  );
}
