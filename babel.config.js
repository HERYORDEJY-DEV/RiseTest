module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    [
      "babel-plugin-inline-import",
      {
        extensions: [".svg"],
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          "plans.ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          // '@*': './src/*',
          "^~(.+)": "./src/\\1",
          // "~types": "./@types",
        },
      },
    ],
    "react-native-reanimated/plugin", // needs to be last
  ],
};
