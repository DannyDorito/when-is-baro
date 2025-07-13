import type { SettingsData } from "../data/SettingsData";

export interface ProfileProps {
  setShow: (show: boolean) => void;
  settings: SettingsData;
  setSettings: (settings: SettingsData) => void;
}
