import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../styles/global-theme";
import AppBarGlobal from "./components/appbar-global";

export const metadata = {
  title: "FRONT APP CHANGE AFTER",
  description: "Front End App CHANGE AFTER",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Sans:ital@0;1&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarGlobal />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
