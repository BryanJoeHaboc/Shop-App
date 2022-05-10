import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isAlphanumeric from "validator/lib/isAlphanumeric";

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
  const [error, setError] = useState<string>("");

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
    } catch (e: any) {
      if (e.response.data.data.errors.length) {
        setError(e.response.data.data.errors[0].msg);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };
  const handleChange = (setter: Dispatch<string>, event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setter(e.target.value);
  };

  return (
    <div className="login_page_container">
      <h1>Shopper</h1>
      <h3 className="error">{error}</h3>
      <form
        className="login_page_form_container"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <TextField
            type="text"
            value={firstName}
            onChange={(event) => handleChange(setFirstName, event)}
            id="firstName"
            label="First Name"
            variant="standard"
            fullWidth
            error={!!firstName && !isAlphanumeric(firstName)}
            helperText={
              !!firstName && !isAlphanumeric(firstName)
                ? "First Name must only contain alphanumeric characters "
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="text"
            value={lastName}
            onChange={(event) => handleChange(setLastName, event)}
            id="lastName"
            label="Last Name"
            variant="standard"
            fullWidth
            error={!!lastName && !isAlphanumeric(lastName)}
            helperText={
              !!lastName && !isAlphanumeric(lastName)
                ? "Last Name must only contain alphanumeric characters "
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="text"
            value={email}
            onChange={(event) => handleChange(setEmail, event)}
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            error={!!email && !isEmail(email)}
            helperText={
              !!email && !isEmail(email)
                ? "Invalid email address, please try again"
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            onChange={(event) => handleChange(setPassword, event)}
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            error={!!password.length && !isLength(password, { min: 6 })}
            helperText={
              !!password.length && !isLength(password, { min: 6 })
                ? "Password must require minimum length of six characters"
                : ""
            }
          />
        </div>
        <div>
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(event) => handleChange(setConfirmPassword, event)}
            id="password-confirm"
            label="Confirm Password"
            variant="standard"
            fullWidth
            error={
              !!confirmPassword.length && !isLength(confirmPassword, { min: 6 })
            }
            helperText={
              !!confirmPassword.length && !isLength(confirmPassword, { min: 6 })
                ? "Password must require minimum length of six characters"
                : ""
            }
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
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !confirmPassword
              }
            >
              Sign Up{" "}
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
