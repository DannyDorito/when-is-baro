import { useState } from "react";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  styleReset,
  Toolbar,
} from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import Chatbot from "./components/Chatbot";
import pom from "./assets/pom.jpg";
import Profile from "./components/Profile";
import { Themes } from "./interfaces/Themes";
import { useSettings } from "./hooks/SettingsHook";

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

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);
  const [showStart, setShowStart] = useState(false);

  const [settings, setSettings] = useSettings();

  return (
    <ThemeProvider theme={Themes[settings.themeIndex].theme}>
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
          {showProfile && (
            <Profile
              setShow={setShowProfile}
              settings={settings}
              setSettings={setSettings}
            />
          )}
          {showChatbot && (
            <Chatbot
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              setShow={setShowChatbot}
              settings={settings}
              setSettings={setSettings}
            />
          )}
        </div>
        {showStart && (
          <MenuList
            style={{
              position: "absolute",
              left: 5,
              bottom: 42,
              padding: "5px",
              zIndex: 11,
            }}
          >
            <MenuListItem
              onClick={() => {
                setShowChatbot(true);
                setShowStart(false);
              }}
              disabled={showChatbot}
            >
              <p>CHAT</p>
            </MenuListItem>
            <MenuListItem
              onClick={() => {
                setShowProfile(true);
                setShowStart(false);
              }}
              disabled={showProfile}
            >
              <p>PROFILE</p>
            </MenuListItem>
            <Separator />
            <MenuListItem disabled>
              <p>Logout</p>
            </MenuListItem>
          </MenuList>
        )}
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
              <Button
                style={{ fontWeight: "bold" }}
                onClick={() => setShowStart(!showStart)}
              >
                Start
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};
export default App;
