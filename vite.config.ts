import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    warmup: {
      clientFiles: [
        "./src/main.tsx",
        "./src/index.css",
        "./src/App.tsx",
        "./src/components/Chatbot.tsx",
        "./src/components/Profile.tsx",
        "./src/components/messages/WhoMadeThis.tsx",
        "./src/components/messages/WhatElseDidTheyMake.tsx",
        "./src/data/Themes.ts"
      ],
    },
  },
});
