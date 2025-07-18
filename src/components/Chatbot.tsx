import { Delete } from "@react95/icons";
import {
  Avatar,
  Button,
  Frame,
  Hourglass,
  Separator,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import ducatsUrl from "../assets/ducats.png";
import lotusUrl from "../assets/lotus.png";
import type { ChatbotProps } from "../interfaces/ChatbotProps";
import type { RndState } from "../interfaces/RndState";
import { WhatElseDidTheyMake } from "./messages/WhatElseDidTheyMake";
import { WhoMadeThis } from "./messages/WhoMadeThis";
import { TennoConRelay, ShowTennoConRelay } from "../data/TennoConRelay";

export default function Chatbot(props: ChatbotProps) {
  const [rndState, setRndState] = useState<RndState>({
    x: 200,
    y: 30,
    width: 960,
    height: 683,
  });

  const [conversation, setConversation] = useState<
    {
      name: string;
      message: string | ReactNode;
      image: string | undefined;
      primary: string;
    }[]
  >([
    {
      image: ducatsUrl,
      name: "Automated Message",
      message: "This site is not affiliated with Digital Extremes.",
      primary: "blue",
    },
  ]);

  const [whoMadeThisSent, setWhoMadeThisSent] = useState(false);

  const [messageLoading, setMessageLoading] = useState(false);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollView = scrollViewRef.current;
    if (scrollView) {
      scrollView.scrollTop = scrollView.scrollHeight;
    }
  }, [conversation]);

  const addMessage = (
    name: string,
    message: string | ReactNode,
    image: string | undefined,
    primary: "red" | "blue",
    wait?: boolean
  ) => {
    setMessageLoading(true);
    if (wait) {
      const randomWait = Math.random() * 2;
      setConversation((prev) => [
        ...prev,
        { name, message: <Hourglass size={17} />, image, primary },
      ]);
      setTimeout(() => {
        setConversation((prev) => prev.slice(0, -1));
        setConversation((prev) => [...prev, { name, message, image, primary }]);
        setMessageLoading(false);
      }, randomWait * 1000);
    } else {
      setConversation((prev) => [...prev, { name, message, image, primary }]);
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
    if (!props.baroData) {
      addUserMessage(
        "WHEN BARO",
        "Baro Bot",
        props.error || "Could not load Baro data. Please try again later.",
        ducatsUrl
      );
      return;
    }

    let message: ReactNode = "";

    if (props.baroData.arrival < new Date()) {
      message = (
        <>
          Baro Ki'Teer has arrived at the&nbsp;
          <span
            style={{
              textDecoration: "underline",
              textDecorationThickness: "auto",
            }}
          >
            {props.baroData.relay}
          </span>
          &nbsp;and will depart&nbsp;
          {props.baroData.departure.toLocaleDateString(props.locale)}
          &nbsp;at&nbsp;
          {props.baroData.departure.toLocaleTimeString(props.locale, {
            hour12: true,
            hour: "numeric",
          })}
          !
        </>
      );
    } else {
      message = (
        <>
          Baro Ki'Teer will arrive at the&nbsp;
          <span
            style={{
              textDecoration: "underline",
              textDecorationThickness: "auto",
            }}
          >
            {props.baroData.relay}
          </span>
          &nbsp; on the&nbsp;
          {props.baroData.arrival
            .toLocaleString(props.locale)
            .split(",", 1)}&nbsp;
          and depart&nbsp;
          {props.baroData.departure.toLocaleDateString(props.locale)}
          &nbsp;at&nbsp;
          {props.baroData.departure.toLocaleTimeString(props.locale, {
            hour12: true,
            hour: "numeric",
          })}
          !
        </>
      );
    }

    let tennoConMessage: ReactNode = "";

    if (ShowTennoConRelay && TennoConRelay.arrival < new Date()) {
      tennoConMessage = (
        <>
          {message} The {TennoConRelay.relay} is currently active! It will
          depart on&nbsp;
          {TennoConRelay.departure.toLocaleDateString(props.locale)} at&nbsp;
          {TennoConRelay.departure.toLocaleTimeString(props.locale, {
            hour12: true,
            hour: "numeric",
          })}
          .
        </>
      );
    } else if (ShowTennoConRelay) {
      tennoConMessage = (
        <>
          <br />
          The {TennoConRelay.relay} will be available from&nbsp;
          {TennoConRelay.arrival.toLocaleDateString(props.locale)}
          &nbsp;at&nbsp;
          {TennoConRelay.arrival.toLocaleTimeString(props.locale, {
            hour12: true,
            hour: "numeric",
          })}
          &nbsp;until&nbsp;
          {TennoConRelay.departure.toLocaleDateString(props.locale)}
          &nbsp;at&nbsp;
          {TennoConRelay.departure.toLocaleTimeString(props.locale, {
            hour12: true,
            hour: "numeric",
          })}
          !
        </>
      );
    }

    addUserMessage(
      "WHEN BARO",
      "Baro Bot",
      <>
        {message}
        {ShowTennoConRelay && tennoConMessage}
      </>,
      ducatsUrl
    );
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
          <p>Baro Bot</p>
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
                square={true}
                style={{
                  width: "100%",
                  marginBottom: "0.25rem",
                }}
                size={"lg"}
              >
                <img
                  src={ducatsUrl}
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
                id="scroll-view"
                ref={scrollViewRef}
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
                            border: "0.125rem solid #000",
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
                          <div style={{ color: msg.primary }}>{msg.name}:</div>
                          <div>{msg.message}</div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </div>
            </Frame>
            <Avatar
              square={true}
              style={{
                width: "100%",
              }}
              size={"lg"}
            >
              <img
                src={lotusUrl}
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
                <p style={{ fontSize: "2rem", marginRight: "0.75rem" }}>
                  &bull;
                </p>
                WHEN BARO
              </Button>
              {!whoMadeThisSent && (
                <Button
                  style={{
                    padding: "0.625rem",
                    justifyContent: "left",
                    marginBottom: "0.25rem",
                    width: "100%",
                  }}
                  onClick={() => {
                    addUserMessage(
                      "Who made this?",
                      "Danny_Dorito",
                      <WhoMadeThis />,
                      ducatsUrl
                    );
                    setWhoMadeThisSent(true);
                  }}
                  disabled={messageLoading}
                >
                  <p style={{ fontSize: "2rem", marginRight: "0.75rem" }}>
                    &bull;
                  </p>
                  Who made this?
                </Button>
              )}
              {whoMadeThisSent && (
                <Button
                  style={{
                    padding: "0.625rem",
                    justifyContent: "left",
                    marginBottom: "0.25rem",
                    width: "100%",
                  }}
                  onClick={() => {
                    addUserMessage(
                      "What else did they make?",
                      "Danny_Dorito",
                      <WhatElseDidTheyMake />,
                      ducatsUrl
                    );
                    setWhoMadeThisSent(false);
                  }}
                  disabled={messageLoading}
                >
                  <p style={{ fontSize: "2rem", marginRight: "0.75rem" }}>
                    &bull;
                  </p>
                  What else did they make?
                </Button>
              )}
            </Frame>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
}
