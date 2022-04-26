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
import { useAppSelector } from "../../app/hooks";

export default function AddProducts() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const user = useAppSelector(getUser);

  const handleSubmit = async (event: {}) => {
    const e = event as React.FormEvent<HTMLInputElement>;

    e.preventDefault();

    try {
      // need validation
      //   const user: SignUpUser = {
      //     firstName,
      //     lastName,
      //     password,
      //     confirmPassword,
      //     email,
      //     userType: "user",
      //   };
      //   const result = await axios.post("/signup", user);
      // NOTE: diff errors
      //   if (!result) {
      //     throw Error("Error in creating User!");
      //   }
      //   navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (setter: Dispatch<string>, event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setter(e.target.value);
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

      const result = await axios.post(
        "/admin/products",
        { data },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(result);
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
            label="First Name"
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
            label="Last Name"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            value={price}
            onChange={(event) => handleChange(setPrice, event)}
            id="standard-basic"
            label="Email"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            value={imageUrl}
            onChange={(event) => handleChange(setImageUrl, event)}
            id="standard-basic"
            label="Password"
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
