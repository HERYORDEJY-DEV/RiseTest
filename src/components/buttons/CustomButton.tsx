import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";

type ButtonVariants = "primary" | "secondary";
interface Props {
  onPress: () => void;
  title?: string;
  children?: React.JSX.Element;
  variant?: ButtonVariants;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

const baseStyles = StyleSheet.create({
  container: {
    height: 54,
    width: "100%",
    backgroundColor: GlobalStyles.colors.accent.teal001,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 9,
  },
  title: {
    color: GlobalStyles.colors.white,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 15,
  },
});

const primaryStyles = StyleSheet.create({
  ...baseStyles,
});

const secondaryStyles = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: GlobalStyles.colors.offWhites003,
  },
  title: {
    ...baseStyles.title,
    color: GlobalStyles.colors.accent.teal001,
  },
});

const allStyles: { [index: string]: any } = {
  primary: primaryStyles,
  secondary: secondaryStyles,
};
function CustomButton({ ...props }: Props) {
  const styles = allStyles[props.variant ?? "primary"];

  const isDisabled = props.disabled,
    isLoading = props.loading;
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...props.containerStyle,
        opacity: isDisabled ? 0.5 : 1,
      }}
      onPress={props.onPress}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={"#FFFFFF"} size={"small"} />
      ) : (
        <View style={[styles.content, props.contentStyle]}>
          {props.leftElement}
          {props.title && (
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
          )}
          {props.children}
          {props.rightElement}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;
