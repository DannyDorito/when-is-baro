import ducatsUrl from "../assets/ducats.png";
import lotusUrl from "../assets/lotus.png";
import { useState, type ReactNode } from "react";
import { WhoMadeThis } from "./WhoMadeThis";
import { useBaro } from "../hooks/BaroHook";
import { Circle, Signup } from "@react95/icons";
import type { ChatbotProps } from "../interfaces/ChatbotProps";
import { Avatar, Button, Frame, List, Modal, TitleBar } from "@react95/core";

export default function Chatbot(props: ChatbotProps) {
  const baro = useBaro();

  const [conversation, setConversation] = useState<
    {
      name: string;
      message: string | ReactNode;
      image: string | undefined;
      colour: string;
    }[]
  >([
    {
      image: ducatsUrl,
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
        {
          name,
          message: <Circle variant={"16x16_4"} className="spin" />,
          image,
          colour,
        },
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
    addMessage(props.settings.username, message, lotusUrl, "red");
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
          <span
            style={{
              textDecoration: "underline",
              textDecorationThickness: "auto",
            }}
          >
            {baro.relay}
          </span>
          &nbsp;and will depart at&nbsp;
          {baro.departure.toLocaleTimeString([], {
            hour12: true,
            hour: "numeric",
          })}
          !
        </>,
        ducatsUrl
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
        ducatsUrl
      );
    }
  };

  return (
    // @ts-expect-error - This is a workaround for the missing type definitions for @react95/core
    <Modal
      title="Baro Bot"
      dragOptions={{
        defaultPosition: {
          x: 200,
          y: 30,
        },
      }}
      style={{ zIndex: 0 }}
      icon={<Signup variant="32x32_4" />}
      titleBarOptions={<TitleBar.Close onClick={() => props.setShow(false)} />}
    >
      <Modal.Content
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
            style={{
              width: "100%",
              marginBottom: "0.25rem",
            }}
            size={"lg"}
            src={ducatsUrl}
          ></Avatar>
          <div style={{ width: "100%" }}>
            <Button
              style={{ width: "100%" }}
              onClick={() => props.setShowProfile(true)}
              disabled={props.showProfile}
            >
              My Profile
            </Button>
          </div>
        </div>
        <Frame
          style={{
            gridColumn: 2,
            gridRow: 1,
            padding: "0.625rem",
            cursor: "default",
          }}
          id="frame"
        >
          <div
            style={{
              width: "100%",
              height: "18.4rem",
              overflowY: "scroll",
            }}
          >
            <List>
              {conversation.map((msg, index) => (
                <>
                  <List.Item
                    key={index}
                    icon={
                      <img
                        src={msg.image}
                        width={"64px"}
                        height={"64px"}
                        style={{
                          border: "2px solid #000",
                          marginRight: "0.25rem",
                          userSelect: "none",
                          WebkitUserSelect: "none",
                          MozUserSelect: "none",
                          msUserSelect: "none",
                          cursor: "default",
                        }}
                      />
                    }
                    style={{ paddingLeft: 0 }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ color: msg.colour }}>{msg.name}:</div>
                      <div>{msg.message}</div>
                    </div>
                  </List.Item>
                  <List.Divider />
                </>
              ))}
            </List>
          </div>
        </Frame>
        <Avatar
          style={{
            width: "100%",
            marginBottom: "0.25rem",
          }}
          size={"lg"}
          src={lotusUrl}
        ></Avatar>
        <Frame
          style={{
            gridColumn: 2,
            gridRow: 2,
            padding: "0.625rem",
            cursor: "default",
          }}
          id="frame"
        >
          <Button
            style={{
              padding: "0.625rem",
              justifyContent: "left",
              marginBottom: "0.25rem",
              width: "100%",
            }}
            onClick={() => addBaroBotMessage()}
            disabled={messageLoading}
          >
            <p style={{ fontSize: "2rem", marginRight: "0.75rem" }}>&bull;</p>
            WHEN BARO
          </Button>
          <Button
            style={{
              padding: "0.625rem",
              justifyContent: "left",
              marginBottom: "0.25rem",
              width: "100%",
            }}
            onClick={() =>
              addUserMessage(
                "Who made this?",
                "John Allison",
                <WhoMadeThis />,
                ducatsUrl
              )
            }
            disabled={messageLoading}
          >
            <p style={{ fontSize: "2rem", marginRight: "0.75rem" }}>&bull;</p>
            Who made this?
          </Button>
        </Frame>
      </Modal.Content>
    </Modal>
  );
}
