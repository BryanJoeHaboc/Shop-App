import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../custom-button/CustomButton";

interface ButtonThemeProp {
  color?: "darkApple" | "apple" | "steelBlue" | "violet";
  variant?: "text" | "outlined" | "contained" | undefined;
  clickFunc?: () => void;
  changeFunc?: () => void;
  display?: string;
  size?: "small" | "medium" | "large";
}

const ButtonWithTheme = ({
  color = "steelBlue",
  variant = "contained",
  clickFunc,
  changeFunc,
  display,
  size = "large",
}: ButtonThemeProp) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={clickFunc}
        onChange={changeFunc}
        color={color}
        variant={variant}
        size={size}
      >
        {display}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonWithTheme;
