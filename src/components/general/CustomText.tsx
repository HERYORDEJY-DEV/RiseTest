import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { GlobalStyles } from "~styles";

type ButtonVariants =
  | "heading"
  | "title"
  | "title2"
  | "body"
  | "authScreenTitle";
interface Props extends TextProps, TextStyle {
  variant?: ButtonVariants;
  /*
  onPress: () => void;
  title?: string;
  children?: React.JSX.Element;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
*/
}

const baseStyles = StyleSheet.create({
  content: {
    color: GlobalStyles.colors.text.body,
    fontFamily: GlobalStyles.fontFamily.sans.regular,
    fontSize: 14,
    // lineHeight: calcNormalLineHeight(14),
  },
});

const headingStyles = StyleSheet.create({
  ...baseStyles,
  content: {
    ...baseStyles.content,
    color: GlobalStyles.colors.text.heading,
    fontFamily: GlobalStyles.fontFamily.grotesk.bold,
    fontSize: 24,
  },
});

const authScreenTitleStyles = StyleSheet.create({
  ...baseStyles,
  content: {
    ...baseStyles.content,
    color: GlobalStyles.colors.text.heading,
    fontFamily: GlobalStyles.fontFamily.grotesk.medium,
    fontSize: 24,
  },
});

const titleStyles = StyleSheet.create({
  ...baseStyles,
  content: {
    ...baseStyles.content,
    color: GlobalStyles.colors.text.title,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 15,
    lineHeight: 22,
  },
});

const title2Styles = StyleSheet.create({
  ...baseStyles,
  content: {
    ...baseStyles.content,
    color: GlobalStyles.colors.text.title,
    fontFamily: GlobalStyles.fontFamily.sans.regular,
    fontSize: 15,
    lineHeight: 22,
  },
});

const allStyles: { [index: string]: any } = {
  heading: headingStyles,
  title: titleStyles,
  title2: title2Styles,
  body: baseStyles,
  authScreenTitle: authScreenTitleStyles,
};
const CustomText = React.memo(({ ...props }: Props) => {
  const styles = allStyles[props.variant ?? "body"];
  const styleProps = { ...props };

  return (
    <Text {...props} style={[styles.content, props.style]}>
      {props.children}
    </Text>
  );
});

export default CustomText;
