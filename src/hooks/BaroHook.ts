import { useState, useEffect } from "react";
import type { BaroData } from "../interfaces/BaroData";

const getBaroData = async (
  setBaroData: React.Dispatch<React.SetStateAction<BaroData | undefined>>,
  signal: AbortSignal
) => {
  try {
    const response = await fetch(
      "https://corsproxy.io/?https://content.warframe.com/dynamic/worldState.php",
      { signal }
    );
    const data = await response.json();
    const voidTraders = data.VoidTraders;
    const baro = voidTraders[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getTimestamp = (dateObj: any) => {
      if (
        typeof dateObj === "object" &&
        dateObj.$date &&
        dateObj.$date.$numberLong
      ) {
        return parseInt(dateObj.$date.$numberLong, 10);
      }
      return dateObj;
    };

    const relay = baro.Node.replace("HUB", " Relay");
    const arrival = new Date(getTimestamp(baro.Activation));
    const departure = new Date(getTimestamp(baro.Expiry));

    setBaroData({
      relay,
      arrival,
      departure: departure,
    });
  } catch (error) {
    console.error(error); //TODO: Log this error properly
  }
};

export function useBaro() {
  const [baroData, setBaroData] = useState<BaroData | undefined>(undefined);
  useEffect(() => {
    const controller = new AbortController();
    getBaroData(setBaroData, controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  return baroData;
}
