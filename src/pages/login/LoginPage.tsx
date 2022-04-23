import { useState, Dispatch } from "react";

export default function LoginPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

  const handleSubmit = () => {};
  const handleChange = (
    setter: Dispatch<string>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  return (
    <div className="login_page_container">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => handleChange(setFirstName, event)}
          />
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => handleChange(setLastName, event)}
          />
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => handleChange(setEmail, event)}
          />
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => handleChange(setPassword, event)}
          />
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => handleChange(setConfirmPassword, event)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
