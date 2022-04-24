import { useState, Dispatch } from "react";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { theme } from "../../components/custom-button/CustomButton";
import "../signup/SignUp.scss";

export default function LoginPage() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

  const handleSubmit = () => {};
  const handleChange = (setter: Dispatch<string>, event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setter(e.target.value);
  };

  return (
    <div className="login_page_container">
      <h1>Shopper</h1>
      <form className="login_page_form_container" onSubmit={handleSubmit}>
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
