import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import { SignUpUser } from "../../../interfaces/user";
import { theme } from "../../components/custom-button/CustomButton";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

  const handleSubmit = async (event: {}) => {
    const e = event as React.FormEvent<HTMLInputElement>;

    e.preventDefault();

    try {
      // need validation

      const user: SignUpUser = {
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        userType: "user",
      };
      const result = await axios.post("/signup", user);

      // NOTE: diff errors
      if (!result) {
        throw Error("Error in creating User!");
      }

      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (setter: Dispatch<string>, event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setter(e.target.value);
  };

  return (
    <div className="login_page_container">
      <h1>Shopper</h1>
      <form
        className="login_page_form_container"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <TextField
            type="text"
            value={firstName}
            onChange={(event) => handleChange(setFirstName, event)}
            id="standard-basic"
            label="First Name"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            value={lastName}
            onChange={(event) => handleChange(setLastName, event)}
            id="standard-basic"
            label="Last Name"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="text"
            value={email}
            onChange={(event) => handleChange(setEmail, event)}
            id="standard-basic"
            label="Email"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            onChange={(event) => handleChange(setPassword, event)}
            id="standard-basic"
            label="Password"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(event) => handleChange(setConfirmPassword, event)}
            id="standard-basic"
            label="Confirm Password"
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
              type="submit"
            >
              Sign Up{" "}
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
