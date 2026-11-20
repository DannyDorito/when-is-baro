import { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  AppBar,
  Button,
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
import Clock from "./components/Clock";

import { Themes } from "./data/Themes";
import { DefaultSettings } from "./data/SettingsData";
import { useSettings } from "./hooks/SettingsHook";
import { useLocale } from "./hooks/LocaleHook";
import { useBaro } from "./hooks/BaroHook";

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
  const { baroData, error } = useBaro();

  useEffect(() => {
    if (
      settings.notifications &&
      baroData &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      const now = new Date();
      const arrival = new Date(baroData.arrival);
      if (arrival > now) {
        const timeout = arrival.getTime() - now.getTime();
        const timerId = setTimeout(() => {
          new Notification("Baro Ki'Teer has arrived!", {
            body: `Baro is now at the ${baroData.relay}.`,
            icon: "/ducats.png",
          });
        }, timeout);
        return () => clearTimeout(timerId);
      }
    }
  }, [settings.notifications, baroData]);

  return (
    <ThemeProvider theme={(Themes[settings.themeIndex] ?? Themes[DefaultSettings.themeIndex]).theme}>
      <div
        style={{
          minHeight: "100dvh",
          minWidth: "100dvw",
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
              baroData={baroData}
              error={error}
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
                />{" "}
                Start
              </Button>
            </div>
            <Clock locale={locale} />
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
};
export default App;
