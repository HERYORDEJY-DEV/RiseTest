module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
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
