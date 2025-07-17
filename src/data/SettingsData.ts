export interface SettingsData {
  username: string;
  themeIndex: number;
  notifications: boolean;
}

export const DefaultSettings: SettingsData = {
  username: "User",
  themeIndex: 1,
  notifications: false
};
