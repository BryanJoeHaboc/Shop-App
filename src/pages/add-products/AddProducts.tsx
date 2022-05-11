import React, { useEffect } from "react";
import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { read, utils } from "xlsx";
import axios from "axios";
import { InputLabel } from "@material-ui/core";
import isNumeric from "validator/lib/isNumeric";
import isEmpty from "validator/lib/isEmpty";

import { theme } from "../../components/custom-button/CustomButton";
import "../signup/SignUp.scss";

import { getUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addProduct,
  addProductsToDB,
  editProduct,
  editProductFromDB,
} from "../../features/product/productSlice";
import { MenuItem, Select } from "@mui/material";
import Product from "../../../interfaces/product";
import { useLocation, useNavigate } from "react-router-dom";
import isLength from "validator/lib/isLength";

interface Prop {
  state?: Product;
}

export default function AddProducts() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const { state } = useLocation() as Prop;
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      if (state.description) {
        setDescription(state.description);
      }
      setTitle(state.title);
      setPrice(state.price);
      setImageUrl(state.imageUrl);
      setName(state.name);
    }
  }, []);

  const handleSubmit = async (event: {}) => {
    const e = event as React.FormEvent<HTMLInputElement>;

    e.preventDefault();

    try {
      const prod = {
        name,
        imageUrl,
        price,
        description,
        title,
      } as Product;
      let result;
      if (state) {
        prod._id = state._id;
        result = await dispatch(editProductFromDB(prod)).unwrap();
        if (result.product) {
          dispatch(editProduct(result.product));
          navigate("/admin");
        }
      } else {
        result = await dispatch(addProductsToDB(prod)).unwrap();
        if (result.product) {
          dispatch(addProduct(result.product));
          navigate("/admin");
        }
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (
    setter: Dispatch<string> | Dispatch<number>,
    event: {}
  ) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    const stringSetter = setter as Dispatch<string>;
    const numSetter = setter as Dispatch<number>;

    if (e.target.name === "price") {
      const value = e.target.value as unknown as number;
      numSetter(value);
    } else {
      stringSetter(e.target.value);
    }
  };

  const handleUpload = (e: {}) => {
    interface HTMLInputElement {
      files: FileList | null;
    }

    const event = e as React.ChangeEvent<HTMLInputElement>;

    if (!event.target.files) {
      return;
    }

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    const file = event.target!.files[0]!;

    reader.onload = async function (event) {
      /* Parse data */
      const bstr = event.target!.result;
      const wb = read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, { header: 1 });
      try {
        await axios.post(
          "/admin/products",
          { data, userId: user.userId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="login_page_container">
      <form
        className="login_page_form_container"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <InputLabel id="category">Choose a Category</InputLabel>
          <Select
            style={{ width: 400 }}
            labelId="select-category"
            value={title}
            label="Category"
            size="medium"
            error={!!title && isEmpty(title)}
            onChange={(event) => handleChange(setTitle, event)}
          >
            <MenuItem disabled value="">
              <em>Choose a Category</em>
            </MenuItem>
            <MenuItem value="Hats">Hats</MenuItem>
            <MenuItem value="Sneakers">Sneakers</MenuItem>
            <MenuItem value="Jackets">Jackets</MenuItem>
            <MenuItem value="Womens">Womens</MenuItem>
            <MenuItem value="Mens">Mens</MenuItem>
            <MenuItem value="Bags">Bags</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            type="text"
            value={name}
            onChange={(event) => handleChange(setName, event)}
            id="standard-basic"
            label="Name"
            variant="standard"
            fullWidth
            error={!!name && !isLength(name, { min: 3 })}
            helperText={
              !!name && !isLength(name, { min: 3 })
                ? "Product Name must be atleast three characters long  "
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="text"
            value={description}
            onChange={(event) => handleChange(setDescription, event)}
            id="standard-basic"
            label="Description"
            variant="standard"
            fullWidth
            error={!!description && !isLength(description, { min: 3 })}
            helperText={
              !!description && !isLength(description, { min: 3 })
                ? "Product Description must be atleast three characters long  "
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="number"
            value={price}
            name="price"
            onChange={(event) => handleChange(setPrice, event)}
            id="standard-basic"
            label="Price"
            variant="standard"
            fullWidth
            error={!!price && !isNumeric(price.toString())}
            helperText={
              !!price && !isNumeric(price.toString())
                ? "Input must be a number"
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="text"
            value={imageUrl}
            onChange={(event) => handleChange(setImageUrl, event)}
            id="standard-basic"
            label="Image Url"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              size="large"
              fullWidth
              color="steelBlue"
              variant="contained"
              component="label"
              disabled={
                isEmpty(title) ||
                (!!name && !isLength(name, { min: 3 })) ||
                (!!description && !isLength(description, { min: 3 })) ||
                !price
              }
            >
              {state ? "Edit Product" : "Add Product"}
              <input type="submit" hidden />
            </Button>
          </ThemeProvider>
        </div>
        Or
        <div>
          <ThemeProvider theme={theme}>
            <Button
              size="large"
              fullWidth
              color="steelBlue"
              variant="contained"
              component="label"
            >
              Add File
              <input
                type="file"
                hidden
                onChange={(event) => {
                  handleUpload(event);
                }}
              />
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
