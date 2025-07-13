import type { SettingsData } from "../data/SettingsData";

export interface ChatbotProps {
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  setShow: (show: boolean) => void;
  settings: SettingsData;
  setSettings: (settings: SettingsData) => void;
  locale: string;
}
