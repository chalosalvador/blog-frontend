import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import { AuthProvider } from "@/lib/auth";
import MainMenu from "@/components/MainMenu";
import theme from "../styles/theme";

import "../styles/globals.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <MainMenu />

          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
