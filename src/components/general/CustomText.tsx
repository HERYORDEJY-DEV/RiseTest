import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { GlobalStyles } from "~styles";

type ButtonVariants = "heading" | "title" | "body";
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

const titleStyles = StyleSheet.create({
  ...baseStyles,
  content: {
    ...baseStyles.content,
    color: GlobalStyles.colors.text.title,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 15,
    // lineHeight: calcNormalLineHeight(15),
  },
});

const allStyles: { [index: string]: any } = {
  heading: headingStyles,
  title: titleStyles,
  body: baseStyles,
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
