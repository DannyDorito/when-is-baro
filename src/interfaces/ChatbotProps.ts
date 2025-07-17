import type { SettingsData } from "../data/SettingsData";
import type { BaroData } from "./BaroData";

export interface ChatbotProps {
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  setShow: (show: boolean) => void;
  settings: SettingsData;
  setSettings: (settings: SettingsData) => void;
  locale: string;
  baroData: BaroData | undefined;
  error: string | undefined;
}
