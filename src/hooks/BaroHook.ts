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

    const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
    if (!response.ok) {
      setError("Could not load Baro data. Please try again later.");
    }
    const data = await response.json() as BaroData;

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: {
          relay: data.relay,
          arrival: data.arrival,
          departure: data.departure,
        },
        expiry: data.departure,
      })
    );

    setBaroData({
      relay: data.relay,
      arrival: data.arrival,
      departure: data.departure,
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
