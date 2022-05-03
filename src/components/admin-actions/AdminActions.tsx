import { Button } from "@mui/material";
import ButtonWithTheme from "../custom-button/ButtonWithTheme";

const AdminActions = () => {
  return (
    <div className="admin__actions__container flex__buttons__05">
      <ButtonWithTheme display="Edit Product" />
      <ButtonWithTheme display="Delete Product" color="darkApple" />
    </div>
  );
};

export default AdminActions;
