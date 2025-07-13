import { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  AppBar,
  Button,
  Frame,
  MenuList,
  MenuListItem,
  Separator,
  styleReset,
  Toolbar,
} from "react95";

import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import pom from "./assets/pom.jpg";
import lotusSmallUrl from "./assets/lotusSmall.png";

import Chatbot from "./components/Chatbot";
import Profile from "./components/Profile";

import { Themes } from "./data/Themes";
import { useSettings } from "./hooks/SettingsHook";
import { useLocale } from "./hooks/LocaleHook";

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

  const locale = useLocale();

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

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
              locale={locale}
            />
          )}
        </div>
        {showStart && (
          <MenuList
            style={{
              position: "absolute",
              left: 5,
              bottom: 42,
              padding: "0.313",
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
              <p>Messenger</p>
            </MenuListItem>
            <MenuListItem
              onClick={() => {
                setShowProfile(true);
                setShowStart(false);
              }}
            >
              <p>My Profile</p>
            </MenuListItem>
            <Separator />
            <MenuListItem>
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
                <img
                  src={lotusSmallUrl}
                  alt="Lotus Logo"
                  style={{ marginRight: "0.625rem" }}
                  width={32}
                ></img>
                Start
              </Button>
            </div>
            <Frame
              style={{
                position: "relative",
                display: "inline-block",
                height: "2.508rem",
                width: "6.239rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.1,
                    fontWeight: 600,
                  }}
                  className="unselectable"
                >
                  {now.toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1,
                  }}
                  className="unselectable"
                >
                  {now.toLocaleDateString(locale)}
                </span>
              </div>
            </Frame>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};
export default App;
