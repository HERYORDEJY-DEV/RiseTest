import { Platform } from "react-native";
import { FontFamilyKeys } from "~types/styles";

// export const fontFamily: {[index]: string : string} = Platform.select({
//   android: {},
//   ios: {},
// });

const iosFontFamily: FontFamilyKeys = {
  sans: {
    regular: "DMSans",
    medium: "DMSans-Medium",
    mediumItalic: "DMSans-MediumItalic",
    bold: "DMSans-Bold",
  },
  grotesk: {
    light: "SpaceGrotesk-Light",
    regular: "SpaceGrotesk-Regular",
    medium: "SpaceGrotesk-Regular",
    semiBold: "SpaceGrotesk-SemiBold",
    bold: "SpaceGrotesk-Bold",
  },
};

const androidFontFamily: FontFamilyKeys = {
  ...iosFontFamily,
};

export const fontFamily =
  Platform.OS === "ios" ? iosFontFamily : androidFontFamily;
