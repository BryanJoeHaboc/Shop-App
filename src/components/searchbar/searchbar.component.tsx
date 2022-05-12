import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../app/hooks";
import {
  getProducts,
  searchProducts,
} from "../../features/product/productSlice";
import Product from "../../../interfaces/product";

export default function CustomizedInputBase() {
  const dispatch = useAppDispatch();

  const handleSearchProducts = (e: {}) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    const product = event.target.value;

    const products: Product[] = dispatch(searchProducts(product));

    console.log(products);
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, width: "500px" }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "Search products" }}
        onChange={(e) => handleSearchProducts(e)}
        size="medium"
      />
      <IconButton type="submit" sx={{ p: "12px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
