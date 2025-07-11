import {
  Anchor,
  Avatar,
  Button,
  Frame,
  Hourglass,
  ScrollView,
  Separator,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import ducats from "../assets/ducats.png";
import lotus from "../assets/lotus.png";
import { useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import { WhoMadeThis } from "./WhoMadeThis";
import { useBaro } from "../hooks/BaroHook";
import { Delete } from "@react95/icons";
import type { RndState } from "../interfaces/RndState";
import type { ChatbotProps } from "../interfaces/ChatbotProps";
import { useSettings } from "../hooks/SettingsHook";

export default function Chatbot(props: ChatbotProps) {
  const [rndState, setRndState] = useState<RndState>({
    x: 200,
    y: 30,
    width: 960,
    height: 683,
  });

  const baro = useBaro();
  const [settings] = useSettings();

  const [conversation, setConversation] = useState<
    {
      name: string;
      message: string | ReactNode;
      image: string | undefined;
      colour: string;
    }[]
  >([
    {
      image: ducats,
      name: "Automated Message",
      message: "This site is not affiliated with Digital Extremes.",
      colour: "blue",
    },
  ]);

  const [messageLoading, setMessageLoading] = useState(false);

  const addMessage = (
    name: string,
    message: string | ReactNode,
    image: string | undefined,
    colour: "red" | "blue",
    wait?: boolean
  ) => {
    setMessageLoading(true);
    if (wait) {
      const randomWait = Math.random() * 2; // Random wait between 0 and 2 seconds
      setConversation((prev) => [
        ...prev,
        { name, message: <Hourglass size={17} />, image, colour },
      ]);
      setTimeout(() => {
        setConversation((prev) => prev.slice(0, -1));
        setConversation((prev) => [...prev, { name, message, image, colour }]);
        setMessageLoading(false);
      }, randomWait * 1000);
    } else {
      setConversation((prev) => [...prev, { name, message, image, colour }]);
      setMessageLoading(false);
    }
  };

  const addUserMessage = (
    message: string | ReactNode,
    responderName: string,
    response: string | ReactNode,
    responseImage: string
  ) => {
    addMessage(settings.username, message, lotus, "red");
    addMessage(responderName, response, responseImage, "blue", true);
  };

  const addBaroBotMessage = () => {
    if (!baro) return;

    if (baro.arrival < new Date()) {
      addUserMessage(
        "WHEN BARO",
        "Baro Bot",
        <>
          Baro Ki'Teer has arrived at the&nbsp;
          <Anchor
            href="https://wiki.warframe.com/w/Relay"
            target="_blank"
            hrefLang="en-gb"
            rel="noopener noreferrer"
            aria-label="Relay Wiki Link"
          >
            {baro.relay}
          </Anchor>
          &nbsp;and will depart at&nbsp;
          {baro.departure.toLocaleTimeString([], {
            hour12: true,
            hour: "numeric",
          })}
          !
        </>,
        ducats
      );
    } else {
      addUserMessage(
        "WHEN BARO",
        "Baro Bot",
        `Baro Ki'Teer will arrive at the ${
          baro.relay
        } at ${baro.arrival.toLocaleString()} and depart on ${baro.departure.toLocaleTimeString(
          [],
          { hour12: true, hour: "numeric" }
        )}!`,
        ducats
      );
    }
  };

  return (
    <Rnd
      size={{ width: rndState.width, height: rndState.height }}
      minWidth={960}
      minHeight={683}
      lockAspectRatio={true}
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
      style={{ zIndex: 0 }}
      cancel="img, button, #frame"
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
          <span>Baro Bot</span>
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
            <div
              style={{
                gridColumn: 1,
                gridRow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                square
                style={{
                  width: "100%",
                  marginBottom: "0.25rem",
                  background: "#e0e0e0",
                }}
                size={"lg"}
              >
                <img
                  src={ducats}
                  width={"100%"}
                  className="unselectable"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    cursor: "default",
                  }}
                />
              </Avatar>
              <div style={{ width: "100%" }}>
                <Button fullWidth onClick={() => props.setShowProfile(true)}>
                  PROFILE
                </Button>
              </div>
            </div>
            <Frame
              shadow
              style={{
                gridColumn: 2,
                gridRow: 1,
                background: "#e0e0e0",
                padding: "0.625rem",
                cursor: "default",
              }}
              id="frame"
            >
              <ScrollView
                shadow
                style={{
                  width: "100%",
                  height: "18.4rem",
                }}
              >
                <div>
                  {conversation.map((msg, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyItems: "center",
                        }}
                      >
                        <img
                          src={msg.image}
                          width={"50rem"}
                          height={"50rem"}
                          style={{
                            border: "2px solid #000",
                            marginRight: "0.25rem",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            cursor: "default",
                          }}
                        ></img>
                        <div
                          style={{
                            marginBottom: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ color: msg.colour }}>{msg.name}:</div>
                          <div>{msg.message}</div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollView>
            </Frame>
            <Avatar
              square
              style={{
                width: "100%",
                marginBottom: "0.25rem",
                background: "#e0e0e0",
              }}
              size={"lg"}
            >
              <img
                src={lotus}
                width={"100%"}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  cursor: "default",
                }}
              ></img>
            </Avatar>
            <Frame
              shadow
              style={{
                gridColumn: 2,
                gridRow: 2,
                padding: "0.625rem",
                background: "#e0e0e0",
                cursor: "default",
              }}
              id="frame"
            >
              <Button
                fullWidth
                style={{
                  padding: "0.625rem",
                  justifyContent: "left",
                  marginBottom: "0.25rem",
                }}
                onClick={() => addBaroBotMessage()}
                disabled={messageLoading}
              >
                <span style={{ fontSize: "2rem", marginRight: "0.75rem" }}>
                  &bull;
                </span>
                WHEN BARO
              </Button>
              <Button
                fullWidth
                style={{
                  padding: "0.625rem",
                  justifyContent: "left",
                  marginBottom: "0.25rem",
                }}
                onClick={() =>
                  addUserMessage(
                    "Who made this?",
                    "John Allison",
                    <WhoMadeThis />,
                    ducats
                  )
                }
                disabled={messageLoading}
              >
                <span style={{ fontSize: "2rem", marginRight: "0.75rem" }}>
                  &bull;
                </span>
                Who made this?
              </Button>
            </Frame>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
}
