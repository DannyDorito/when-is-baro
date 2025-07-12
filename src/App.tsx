import { useEffect, useState } from "react";

import Chatbot from "./components/Chatbot";
import pom from "./assets/pom.jpg";
import Profile from "./components/Profile";
import { useSettings } from "./hooks/SettingsHook";
import { List, TaskBar } from "@react95/core";
import { Progman11, Signup } from "@react95/icons";

import "@react95/sans-serif";
// @ts-expect-error - This is a workaround for the missing type definitions for @react95/core
import "@react95/core/GlobalStyle";

import "./index.css";
import { Themes } from "./interfaces/Themes";

const App = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);
  const [showStart, setShowStart] = useState(false);

  const [settings, setSettings] = useSettings();

  useEffect(() => {
    // Remove any previous theme link
    const prev = document.getElementById("theme-css");
    if (prev) prev.remove();

    // Add the new theme
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = Themes[settings.themeIndex].path;
    document.head.appendChild(link);

    // Cleanup
    return () => {
      link.remove();
    };
  }, [settings.themeIndex]);

  return (
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
      <TaskBar
        style={{
          bottom: 0,
          width: "100vw",
          zIndex: 10,
        }}
        onClick={() => setShowStart(!showStart)}
        list={
          <List>
            <List.Item
              icon={<Signup variant="32x32_4" />}
              onClick={() => {
                setShowChatbot(true);
                setShowStart(false);
              }}
            >
              Messenger
            </List.Item>
            <List.Item
              icon={<Progman11 variant="32x32_4" />}
              onClick={() => {
                setShowProfile(true);
                setShowStart(false);
              }}
            >
              My Profile
            </List.Item>
          </List>
        }
      ></TaskBar>
    </div>
  );
};
export default App;
