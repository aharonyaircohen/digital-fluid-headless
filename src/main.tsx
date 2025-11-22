import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "urql";
import App from "./App";
import "./styles/globals.css";
import { LanguageProvider } from "./i18n";
import { graphqlClientPublic } from "./graphql/client";
import { ThemeProvider } from "./theme";

const rootElement = document.getElementById("root");
// Keep Router basename aligned with Vite base to support subpath deployments.
const basename =
  import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

if (!rootElement) {
  throw new Error("Root element with id 'root' was not found in the document.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider value={graphqlClientPublic}>
      <LanguageProvider>
        <ThemeProvider>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
