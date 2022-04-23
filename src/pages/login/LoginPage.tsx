import { useState, Dispatch } from "react";
import TextField from "@mui/material/TextField";

import "./LoginPage.scss";

export default function LoginPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

  const handleSubmit = () => {};
  const handleChange = (setter: Dispatch<string>, event: {}) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setter(e.target.value);
  };

  return (
    <div className="login_page_container">
      <form className="login_page_form_container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <TextField
            type="text"
            value={firstName}
            onChange={(event) => handleChange(setFirstName, event)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <TextField
            type="text"
            value={lastName}
            onChange={(event) => handleChange(setLastName, event)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>{" "}
          <TextField
            type="text"
            value={email}
            onChange={(event) => handleChange(setEmail, event)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>{" "}
          <TextField
            type="password"
            value={password}
            onChange={(event) => handleChange(setPassword, event)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>{" "}
          <TextField
            type="password"
            value={confirmPassword}
            onChange={(event) => handleChange(setConfirmPassword, event)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
