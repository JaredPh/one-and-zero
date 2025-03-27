import { tamaguiPlugin } from "@tamagui/vite-plugin";
import { one } from "one/vite";
import type { UserConfig } from "vite";

export default {
  plugins: [
    one({
      react: {
        compiler: process.env.NODE_ENV === "production",
      },

      web: {
        defaultRenderMode: "ssg",
      },

      native: {
        // set to the key of your native app
        // will call AppRegistry.registerComponent(app.key)
        key: "one-example",
      },
    }),

    tamaguiPlugin({
      optimize: process.env.NODE_ENV === "production",
      components: ["tamagui"],
      config: "./src/lib/tamagui/tamagui.config.ts",
      outputCSS: "./src/lib/tamagui/tamagui.css",
    }),
  ],
  server: {
    host: true,
    allowedHosts: ["localhost", ".ngrok-free.app"],
  },
} satisfies UserConfig;
