import React, { Suspense, useState } from "react";
import { AppBar, Button, Hourglass, styleReset, Toolbar } from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import eggplant from "react95/dist/themes/eggplant";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import { useSettings } from "./hooks/SettingsHook";
import original from "react95/dist/themes/original";
import theSixtiesUSA from "react95/dist/themes/theSixtiesUSA";
import counterStrike from "react95/dist/themes/counterStrike";
import powerShell from "react95/dist/themes/powerShell";
import matrix from "react95/dist/themes/matrix";
import windows1 from "react95/dist/themes/windows1";
import hotDogStand from "react95/dist/themes/hotDogStand";

const Chatbot = React.lazy(() => import("./components/Chatbot"));

import pom from "./assets/pom.jpg";
import Profile from "./components/Profile";
import type { Theme } from "react95/dist/types";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const themeMap: Record<string, Theme> = {
  original,
  eggplant,
  theSixtiesUSA,
  counterStrike,
  powerShell,
  matrix,
  windows1,
  hotDogStand,
};

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [settings] = useSettings();
  const selectedTheme = themeMap[settings.theme] || eggplant;

  return (
    <ThemeProvider theme={selectedTheme}>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundImage: `url(${pom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GlobalStyles />
        <div style={{ flex: 1, position: "relative" }}>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Hourglass size={96} />
              </div>
            }
          >
            {showProfile && <Profile setShow={setShowProfile} />}
            <Chatbot setShowProfile={setShowProfile} />
          </Suspense>
        </div>
        <AppBar
          style={{
            position: "sticky",
            bottom: 0,
            width: "100vw",
            zIndex: 10,
          }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Button style={{ fontWeight: "bold" }}>Start</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};
export default App;
