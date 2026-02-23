import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import { setupStore } from "./store/store.ts";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
