
import {
  createTheme,
  PaletteColorOptions,
} from "@mui/material/styles";


declare module "@mui/material/styles" {
  interface CustomPalette {
    darkApple: PaletteColorOptions;
    apple: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
    violet: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    darkApple: true;
    apple: true;
    steelBlue: true;
    violet: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
  palette: {
    darkApple: createColor("#F40B27"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
  },
});

// export default function CustomStyles() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Stack direction="row" gap={1}>
//         <Button color="anger" variant="contained">
//           anger
//         </Button>
//         <Button color="apple" variant="contained">
//           apple
//         </Button>
//         <Button color="steelBlue" variant="contained">
//           steelBlue
//         </Button>
//         <Button color="violet" variant="contained">
//           violet
//         </Button>
//       </Stack>
//     </ThemeProvider>
//   );
// }
