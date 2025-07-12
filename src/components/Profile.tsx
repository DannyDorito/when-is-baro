import { Progman11 } from "@react95/icons";
import type { ProfileProps } from "../interfaces/ProfileProps";
import { Themes } from "../interfaces/Themes";
import { Frame, Input, Modal, RadioButton, TitleBar } from "@react95/core";
import { useEffect } from "react";

export default function Profile(props: ProfileProps) {
  useEffect(() => {
    // Remove any previous theme link
    const prev = document.getElementById("theme-css");
    if (prev) prev.remove();

    // Add the new theme
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = Themes[props.settings.themeIndex].path;
    document.head.appendChild(link);

    // Cleanup
    return () => {
      link.remove();
    };
  }, [props.settings.themeIndex]);

  return (
    // @ts-expect-error - This is a workaround for the missing type definitions for @react95/core
    <Modal
      title="My Profile"
      dragOptions={{
        defaultPosition: {
          x: 300,
          y: 80,
        },
      }}
      style={{ zIndex: 1 }}
      icon={<Progman11 variant="32x32_4" />}
      titleBarOptions={<TitleBar.Close onClick={() => props.setShow(false)} />}
    >
      <Modal.Content>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "30% 70%",
            gridTemplateRows: "auto auto",
            gap: "0.5rem",
          }}
        >
          <div>Username:</div>
          <Frame>
            <Input
              autoComplete="off"
              value={props.settings.username}
              onChange={(e) =>
                props.setSettings({
                  ...props.settings,
                  username: e.target.value,
                })
              }
              style={{
                width: "calc(100% - 4px)",
              }}
            ></Input>
          </Frame>
          <div>
            <strong>Theme:</strong>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {Themes.map((theme, index) => (
              <Frame
                key={theme.name}
                style={{
                  backgroundColor: theme.colour,
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
                <RadioButton
                  checked={props.settings.themeIndex === index}
                  onChange={() =>
                    props.setSettings({
                      ...props.settings,
                      themeIndex: index,
                    })
                  }
                  value={theme.name}
                >
                  {theme.name}
                </RadioButton>
              </Frame>
            ))}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
