import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { User } from "../../../interfaces/user";
import { theme } from "../../components/custom-button/CustomButton";
import "../signup/SignUp.scss";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

  type fetchedUser = {
    data: {
      token: string;
      user: {
        firstName: string;
        lastName: string;
        userType: string;
        userId: string;
      };
    };
  };

  const handleSubmit = async (event: {}) => {
    const e = event as React.FormEvent<HTMLInputElement>;

    e.preventDefault();

    try {
      // need validation

      const user: User = {
        email,
        password,
      };
      const fetchedUser: fetchedUser = await axios.post("/login", user);

      // NOTE: diff errors
      if (!fetchedUser) {
        throw Error("Error in Logging In!");
      }
      console.log(fetchedUser);
      dispatch(
        setUser({
          firstName: fetchedUser.data.user.firstName,
          lastName: fetchedUser.data.user.lastName,
          userType: fetchedUser.data.user.userType,
          token: fetchedUser.data.token,
          userId: fetchedUser.data.user.userType,
        })
      );

      navigate("/home");
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
          <ThemeProvider theme={theme}>
            <Button
              size="large"
              fullWidth
              color="steelBlue"
              variant="contained"
              type="submit"
            >
              Login{" "}
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
}
