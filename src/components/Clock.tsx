import { useEffect, useState } from "react";
import { Frame } from "react95";

export default function Clock({ locale }: Readonly<{ locale: string }>) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}
