import { useState, Dispatch, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

import { User } from "../../../interfaces/user";
import { theme } from "../../components/custom-button/CustomButton";
import "../signup/SignUp.scss";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import Modal from "../../components/modal/Modal";
import ButtonWithTheme from "../../components/custom-button/ButtonWithTheme";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent
  useEffect(() => {
    setToggleModal(!!(location.state as { toggleModal: boolean })?.toggleModal);
  }, []);

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

      const userType = fetchedUser.data.user.userType;

      dispatch(
        setUser({
          firstName: fetchedUser.data.user.firstName,
          lastName: fetchedUser.data.user.lastName,
          userType,
          token: fetchedUser.data.token,
          userId: fetchedUser.data.user.userId,
        })
      );

      if (userType === "user") {
        navigate("/home");
      } else if (userType === "admin") {
        navigate("/admin");
      }

      console.log("hatdog");
    } catch (e: any) {
      console.log(e);
      setError("Invalid username or password");
    }
  };

  const handleChange = (setter: Dispatch<string>, event: {}) => {
    setError("");
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
          <ThemeProvider theme={theme}>
            <Button
              size="large"
              fullWidth
              color="steelBlue"
              variant="contained"
              type="submit"
              disabled={!isLength(password, { min: 6 }) || !isEmail(email)}
            >
              Login{" "}
            </Button>
          </ThemeProvider>
          {toggleModal && (
            <Modal
              children={
                <div>
                  <h1>User Created Succesfully!</h1>
                  <ButtonWithTheme
                    display="Okay"
                    clickFunc={() => setToggleModal(!toggleModal)}
                  />
                </div>
              }
              shown={toggleModal}
              close={() => setToggleModal(!toggleModal)}
              modalContentClass="modal-content-login"
            />
          )}
        </div>
      </form>
    </div>
  );
}
