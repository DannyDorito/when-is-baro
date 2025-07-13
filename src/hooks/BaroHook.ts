import { useState, useEffect } from "react";
import type { BaroData } from "../interfaces/BaroData";

const CACHE_KEY = "baroDataCache";

const getBaroData = async (
  setBaroData: React.Dispatch<React.SetStateAction<BaroData | undefined>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  try {
    setError(undefined);
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      if (expiry && data) {
        setBaroData({
          relay: data.relay,
          arrival: new Date(data.arrival),
          departure: new Date(data.departure),
        });
        return;
      }
    }

    const response = await fetch(
      "https://corsproxy.io/?https://content.warframe.com/dynamic/worldState.php"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Baro data.");
    }
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

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: {
          relay,
          arrival: arrival.toISOString(),
          departure: departure.toISOString(),
        },
        expiry: baro.Expiry?.$date?.$numberLong || baro.Expiry,
      })
    );

    setBaroData({
      relay,
      arrival,
      departure: departure,
    });
  } catch (error) {
    console.error("Error fetching Baro data:", error);
    setBaroData(undefined);
    setError("Could not load Baro data. Please try again later.");
  }
};

export function useBaro() {
  const [baroData, setBaroData] = useState<BaroData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getBaroData(setBaroData, setError);
  }, []);

  return { baroData, error };
}
