import { Delete } from "@react95/icons";
import {
  Button,
  Checkbox,
  Frame,
  GroupBox,
  Radio,
  TextInput,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { Rnd } from "react-rnd";
import { useState } from "react";
import { Themes } from "../data/Themes";
import type { ProfileProps } from "../interfaces/ProfileProps";
import type { RndState } from "../interfaces/RndState";
import { IgnoreDrag } from "../data/IgnoreDrag";

export default function Profile(props: Readonly<ProfileProps>) {
  const [rndState, setRndState] = useState<RndState>({
    x: 300,
    y: 80,
    width: 580,
    height: 650,
  });

  const askNotificationPermission = (checked: boolean) => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return;
    }

    if (!checked) {
      props.setSettings({
        ...props.settings,
        notifications: false,
      });
      return;
    }

    Notification.requestPermission().then((permission) => {
      props.setSettings({
        ...props.settings,
        notifications: permission === "granted",
      });
    });
  };

  return (
    <Rnd
      size={{ width: rndState.width, height: rndState.height }}
      minWidth={580}
      minHeight={650}
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
      cancel={IgnoreDrag}
    >
      <Window
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
          <p>My Profile</p>
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
              gridTemplateColumns: "40% 60%",
              gridTemplateRows: "1fr",
              gap: "0.5rem",
              alignItems: "start",
            }}
          >
            <div>
              <div>Username:</div>
              <TextInput
                autoComplete="off"
                value={props.settings.username}
                onChange={(e) =>
                  props.setSettings({
                    ...props.settings,
                    username: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              />
              <div style={{ marginBottom: "0.5rem" }}>
                <GroupBox
                  label="Browser Notifications:"
                  style={{ marginTop: "1rem", cursor: "default" }}
                >
                  <Checkbox
                    label="Send On Arrival"
                    checked={props.settings.notifications}
                    onChange={(e) =>
                      askNotificationPermission(e.target.checked)
                    }
                  />
                </GroupBox>
              </div>
            </div>
            <div>
              <strong>Theme:</strong>
              <GroupBox
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.5rem",
                  cursor: "default",
                }}
              >
                {Themes.map((theme, index) => (
                  <Frame
                    key={theme.name}
                    style={{
                      backgroundColor: theme.primary,
                      margin: "0.25rem",
                      padding: "0.25rem",
                      cursor: "pointer",
                    }}
                    onChange={() =>
                      props.setSettings({
                        ...props.settings,
                        themeIndex: index,
                      })
                    }
                    id="frame"
                  >
                    <Radio
                      checked={props.settings.themeIndex === index}
                      onChange={() =>
                        props.setSettings({
                          ...props.settings,
                          themeIndex: index,
                        })
                      }
                      value={theme.name}
                      label={theme.name}
                      style={{ color: theme.secondary }}
                    />
                  </Frame>
                ))}
              </GroupBox>
            </div>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
}
