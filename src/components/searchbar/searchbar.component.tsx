import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../app/hooks";
import { searchProducts } from "../../features/product/productSlice";
import Product from "../../../interfaces/product";
import { useRef, useState } from "react";

import MiniProducts from "../mini-products/MiniProducts";

export default function CustomizedInputBase() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredProducts, setFiltedProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();
  const inputSearchBar = useRef<HTMLInputElement | null>(null);

  const handleSearchProducts = (e: {}) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    const product = event.target.value;
    const products: Product[] = dispatch(searchProducts(product));
    console.log(products);
    setFiltedProducts(products);

    if (inputSearchBar?.current?.children[0]) {
      setOpenFilter(true);
    }
  };

  return (
    <Paper
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
      />
      <IconButton type="submit" sx={{ p: "12px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* 
      {openFilter && (
        <div className="mini_products_container ">
          {filteredProducts.map((prod) => (
            <MiniProducts product={prod} />
          ))}
        </div>
      )} */}
    </Paper>
  );
}
