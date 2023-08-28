import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";
import { passwordValidator } from "~utils/validators";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";

interface Props extends TextInputProps {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
  showValidationIndicators?: boolean;
}

const {
  inputs: { EyeHideIcon, EyeShowIcon, PasswordBulletCheck, PasswordBullet },
} = svgAssets;

export default function CustomPasswordInput({
  showValidationIndicators = false,
  ...props
}: Props): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(Boolean(props.errorMessage));
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [errMssg, setErrMssg] = useState({
    isLowercaseValid: false,
    isMinCharValid: false,
    isSpecialCharValid: false,
    isUppercaseValid: false,
  });

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

  const onToggleSecureEntry = () => setIsSecureEntry(prev => !prev);
  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const onChangeText = (text: string) => {
    setIsError(false);
    setValue(text);
    props.onChangeText?.(text);

    if (showValidationIndicators) {
      const validator = passwordValidator(text);
      setErrMssg(prev => {
        // setIsError(Object.values(errMssg).filter(value => !value).length > 0);
        return { ...prev, ...validator };
      });
    }
  };

  useEffect(() => {
    Animated.timing(focusRef, {
      toValue: isFocused || Boolean(value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusRef, isFocused]);

  useEffect(() => {
    setIsError(Boolean(props.errorMessage));
  }, [props.errorMessage]);

  return (
    <View style={[styles.container, props.containerStyles]}>
      <Animated.View
        style={[
          styles.content,
          {
            borderWidth: animatedBorderWidth,
            borderColor:
              !showValidationIndicators && isError
                ? GlobalStyles.colors.inputs.error
                : animatedBorderColor,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          cursorColor={
            !showValidationIndicators && isError
              ? GlobalStyles.colors.inputs.error
              : GlobalStyles.colors.accent.teal001
          }
          {...props}
          style={[styles.input, props.inputStyles]}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChangeText}
          secureTextEntry={isSecureEntry}
        />
        <Pressable style={styles.button} onPress={onToggleSecureEntry}>
          <CustomSvgXml svg={isSecureEntry ? EyeShowIcon : EyeHideIcon} />
        </Pressable>
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
                color:
                  !showValidationIndicators && isError
                    ? GlobalStyles.colors.inputs.error
                    : animatedLabelColor,
              },
            ]}
          >
            {props.label ?? "Password"}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      {!showValidationIndicators && isError && (
        <Animated.View style={[styles.errorWrapper]}>
          <CustomText style={styles.errorMessage}>
            {props.errorMessage}*
          </CustomText>
        </Animated.View>
      )}
      {/*  validator indicator */}
      {showValidationIndicators && (
        <View style={[styles.validatorWrapper]}>
          <View style={[styles.validatorItem]}>
            <CustomSvgXml
              svg={
                errMssg.isMinCharValid ? PasswordBulletCheck : PasswordBullet
              }
            />
            <CustomText style={styles.validatorMessage}>
              Minimum of 8 characters
            </CustomText>
          </View>
          <View style={[styles.validatorItem]}>
            <CustomSvgXml
              svg={
                errMssg.isUppercaseValid ? PasswordBulletCheck : PasswordBullet
              }
            />
            <CustomText style={styles.validatorMessage}>
              One UPPERCASE character
            </CustomText>
          </View>
          <View style={[styles.validatorItem]}>
            <CustomSvgXml
              svg={
                errMssg.isSpecialCharValid
                  ? PasswordBulletCheck
                  : PasswordBullet
              }
            />
            {/* /[!@$&*\/?]/ */}
            <CustomText style={styles.validatorMessage}>
              One unique character (e.g: !@$&*?)
            </CustomText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //  marginTop: 15,
  },
  content: {
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.inputs.border,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  button: {
    height: "100%",
    paddingLeft: 10,
    alignItems: "flex-end",
    justifyContent: "center",
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
  validatorWrapper: {
    rowGap: 12,
    marginTop: 18,
  },
  validatorItem: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  validatorMessage: {
    color: GlobalStyles.colors.black,
    fontSize: 13,
    lineHeight: 19,
  },
});
