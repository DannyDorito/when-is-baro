import { createRoot } from "react-dom/client";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import "./index.css";
import App from "./App.tsx";

// react95 was written for styled-components v5, which filtered out its
// styling props (active, fullWidth, square...). v6 doesn't, so filter them
// here before they reach real HTML elements.
const shouldForwardProp = (propName: string, target: unknown) =>
  typeof target === "string" ? isPropValid(propName) : true;

createRoot(document.getElementById("root")!).render(
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <App />
    </StyleSheetManager>
);
