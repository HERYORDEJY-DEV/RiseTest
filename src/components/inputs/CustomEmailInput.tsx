import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";
import CustomText from "~components/general/CustomText";

interface Props extends TextInputProps {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
}

export default function CustomEmailInput(props: Props): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const isError = Boolean(props.errorMessage) || Boolean(errMssg);
  const focusRef = useRef(new Animated.Value(0)).current;

  const animatedLabelFontSize = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });

  const animatedLabelColor = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [
      GlobalStyles.colors.inputs.label,
      GlobalStyles.colors.inputs.labelActive,
    ],
  });

  const animatedLabelContainerTopPosition = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -8],
  });

  const animatedLabelContainerHorzPadding = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const animatedLabelContainerLeftPosition = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 10],
  });

  const animatedBorderWidth = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const animatedBorderColor = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [
      GlobalStyles.colors.inputs.border,
      GlobalStyles.colors.inputs.borderActive,
    ],
  });

  const onChangeText = (text: string) => {
    setErrMssg("");
    setValue(text);
    props.onChangeText?.(text);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  useEffect(() => {
    Animated.timing(focusRef, {
      toValue: isFocused || Boolean(value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusRef, isFocused]);

  return (
    <View style={[styles.container, props.containerStyles]}>
      <Animated.View
        style={[
          styles.content,
          {
            borderWidth: animatedBorderWidth,
            borderColor: isError
              ? GlobalStyles.colors.inputs.error
              : animatedBorderColor,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          cursorColor={
            isError
              ? GlobalStyles.colors.inputs.error
              : GlobalStyles.colors.accent.teal001
          }
          {...props}
          style={[styles.input, props.inputStyles]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType={"email-address"}
        />
        <Animated.View
          style={[
            styles.labelContainer,

            {
              paddingHorizontal: animatedLabelContainerHorzPadding,
              top: props.value ? -9 : animatedLabelContainerTopPosition,
              left: animatedLabelContainerLeftPosition,
            },
          ]}
        >
          <Animated.Text
            onPress={() => inputRef?.current?.focus()}
            style={[
              styles.label,
              {
                fontSize: props.value ? 10 : animatedLabelFontSize,
                color: isError
                  ? GlobalStyles.colors.inputs.error
                  : animatedLabelColor,
              },
            ]}
          >
            {props.label ?? "Email address"}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      {isError && (
        <Animated.View style={[styles.errorWrapper]}>
          <CustomText style={styles.errorMessage}>
            {props.errorMessage ?? errMssg}*
          </CustomText>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 15,
  },
  content: {
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.inputs.border,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    lineHeight: 22,
    fontSize: 15,
  },
  labelContainer: {
    position: "absolute",
    left: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  label: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 15,
  },
  errorMessage: {
    fontSize: 12,
    color: GlobalStyles.colors.inputs.error,
  },
  errorWrapper: {
    marginHorizontal: 10,
    marginTop: 2,
  },
});
