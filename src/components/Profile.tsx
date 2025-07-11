import {
  Button,
  GroupBox,
  Radio,
  TextInput,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { useState } from "react";
import type { RndState } from "../interfaces/RndState";
import { Rnd } from "react-rnd";
import { Delete } from "@react95/icons";
import type { ProfileProps } from "../interfaces/ProfileProps";
import { useSettings } from "../hooks/SettingsHook";

const themes: { name: string; colour: string }[] = [
  { name: "original", colour: "#c6c6c6" },
  { name: "eggplant", colour: "#89b0a8" },
  { name: "theSixtiesUSA", colour: "#d067d7" },
  { name: "counterStrike", colour: "#4b5844" },
  { name: "powerShell", colour: "#012456" },
  { name: "matrix", colour: "#37ec65" },
  { name: "windows1", colour: "#ffffff" },
  { name: "hotDogStand", colour: "#ff0000" },
];

export default function Profile(props: ProfileProps) {
  const [rndState, setRndState] = useState<RndState>({
    x: 300,
    y: 80,
    width: 480,
    height: 580,
  });

  const [settings, setSettings] = useSettings();

  return (
    <Rnd
      size={{ width: rndState.width, height: rndState.height }}
      minWidth={480}
      minHeight={580}
      position={{ x: rndState.x, y: rndState.y }}
      onDragStop={(_event, d) => {
        setRndState((prev) => ({
          ...prev,
          x: d.x,
          y: d.y,
        }));
      }}
      onResizeStop={(_event, _direction, ref, _delta, position) => {
        setRndState((prev) => ({
          ...prev,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        }));
      }}
      style={{ zIndex: 1 }}
    >
      <Window
        shadow
        className="window"
        style={{ width: rndState.width, height: rndState.height }}
      >
        <WindowHeader
          className="window-title"
          style={{
            minWidth: "18.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Profile</span>
          <Button
            style={{
              width: "1.5rem",
              height: "1.5rem",
              fontWeight: "bold",
              fontSize: "1.125rem",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
            onClick={() => props.setShow(false)}
          >
            <Delete />
          </Button>
        </WindowHeader>
        <WindowContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30% 70%",
              gridTemplateRows: "auto auto",
              gap: "0.5rem",
            }}
          >
            <div>Username:</div>
            <TextInput
              fullWidth
              value={settings.username}
              onChange={(e) =>
                setSettings({ ...settings, username: e.target.value })
              }
            ></TextInput>
            <div>
              <strong>Theme:</strong>
            </div>
            <GroupBox style={{ display: "flex", flexDirection: "column" }}>
              {themes.map((theme, index) => (
                <div
                  style={{
                    backgroundColor: theme.colour,
                    color: "#000",
                    margin: "0.25rem",
                    padding: "0.25rem",
                  }}
                >
                  <Radio
                    key={index}
                    checked={settings.theme === theme.name}
                    onChange={() =>
                      setSettings({ ...settings, theme: theme.name })
                    }
                    value={theme.name}
                    label={
                      theme.name.charAt(0).toUpperCase() + theme.name.slice(1)
                    }
                  />
                  <br />
                </div>
              ))}
            </GroupBox>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
}
