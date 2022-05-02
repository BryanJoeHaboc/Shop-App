import React from "react";
import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { read, utils } from "xlsx";
import axios from "axios";

import { theme } from "../../components/custom-button/CustomButton";
import "../signup/SignUp.scss";

import { getUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProductsToDB } from "../../features/product/productSlice";

export default function AddProducts() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleSubmit = async (event: {}) => {
    const e = event as React.FormEvent<HTMLInputElement>;

    e.preventDefault();

    try {
      const result = dispatch(
        addProductsToDB({
          name,
          imageUrl,
          price,
          description,
          title,
        })
      );

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
        const result = await axios.post(
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
          <TextField
            type="text"
            value={title}
            onChange={(event) => handleChange(setTitle, event)}
            id="standard-basic"
            label="Category"
            variant="standard"
            fullWidth
          />
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
            >
              Add Product
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
