import { spacing } from "~styles/constants";
import { colors } from "~styles/colors";

export type FontFamilyKeys = {
  sans: {
    light?: string;
    regular: string;
    regularItalic?: string;
    medium: string;
    mediumItalic?: string;
    semiBold?: string;
    bold: string;
    boldItalic?: string;
  };
  grotesk: {
    light?: string;
    regular: string;
    regularItalic?: string;
    medium: string;
    mediumItalic?: string;
    semiBold?: string;
    bold: string;
    boldItalic?: string;
  };
};

export type GlobalStylesType = {
  fontFamily: FontFamilyKeys;
  colors: { [p: keyof typeof colors]: any };
  spacing: { [p: keyof typeof spacing]: any };
};
