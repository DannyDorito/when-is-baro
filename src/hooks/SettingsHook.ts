import { useLocalStorage } from "usehooks-ts";
import { DefaultSettings, type SettingsData } from "../interfaces/SettingsData";

export function useSettings(): [SettingsData, typeof setSettings] {
  const [settings, setSettings] = useLocalStorage<SettingsData>(
    "settings-data",
    DefaultSettings
  );

  return [settings, setSettings];
}
