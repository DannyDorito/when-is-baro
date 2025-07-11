import { useState, useEffect } from "react";
import type { BaroData } from "../interfaces/BaroData";

export function useBaro() {
  const [baroData, setBaroData] = useState<BaroData | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      await getBaroData();
    };
    fetchData();
  }, []);

  const getBaroData = async () => {
    fetch(
      "https://corsproxy.io/?https://content.warframe.com/dynamic/worldState.php"
    )
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => console.error(error));
  };

  return baroData;
}
