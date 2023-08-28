import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardType,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";
import CustomNumberPad from "./CustomNumberPad";

interface Props {
  defaultValue?: string;
  inputCount?: number;
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  inputCellLength?: number;
  tintColor?: string | string[];
  offTintColor?: string | string[];
  handleTextChange?: (text: string) => void;
  handleCellTextChange?: (text: string, cellIndex: number) => void;
  keyboardType?: KeyboardType;
  testIDPrefix?: string;
  autoFocus?: boolean;
}

const DEFAULT_TINT_COLOR: string = GlobalStyles.colors.accent.teal001,
  DEFAULT_OFF_TINT_COLOR: string = "rgba(113, 135, 156, 0.20)",
  DEFAULT_TEST_ID_PREFIX: string = "otp_input_",
  DEFAULT_KEYBOARD_TYPE: KeyboardType = "numeric";

const getOTPTextChunks = (
  count: number,
  length: number,
  text: string,
): string[] => {
  const matches = text.match(new RegExp(`.{1,${length}}`, "g")) || [];
  return matches.slice(0, count);
};

const OTPTextView: React.FC<Props> = ({
  defaultValue = "",
  inputCount = 6,
  tintColor = DEFAULT_TINT_COLOR,
  offTintColor = DEFAULT_OFF_TINT_COLOR,
  inputCellLength = 1,
  containerStyle = {},
  textInputStyle = {},
  handleTextChange = () => {},
  handleCellTextChange,
  keyboardType = DEFAULT_KEYBOARD_TYPE,
  testIDPrefix = DEFAULT_TEST_ID_PREFIX,
  autoFocus = false,
  ...textInputProps
}) => {
  const [focusedInput, setFocusedInput] = useState(0);
  const [otpText, setOtpText] = useState<string[]>(
    getOTPTextChunks(inputCount, inputCellLength, defaultValue),
  );
  const inputs = useRef<TextInput[]>([]);

  const onTextChange = (text: string, i: number) => {
    if (text && !/^[0-9a-zA-Z]+$/.test(text)) {
      return;
    }

    const updatedOtpText = [...otpText];
    updatedOtpText[i] = text;

    setOtpText(updatedOtpText);

    handleTextChange(updatedOtpText.join(""));
    if (handleCellTextChange) {
      handleCellTextChange(text, i);
    }

    if (text.length === inputCellLength && i !== inputCount - 1) {
      inputs.current[i + 1].focus();
    }
  };

  const onInputFocus = (i: number) => {
    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
      inputs.current[prevIndex].focus();
      return;
    }

    setFocusedInput(i);
  };

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number,
  ) => {
    const val = otpText[i] || "";

    if (e.nativeEvent.key !== "Backspace" && val && i !== inputCount - 1) {
      inputs.current[i + 1].focus();
      return;
    }

    if (e.nativeEvent.key === "Backspace" && i !== 0) {
      if (!val.length && otpText[i - 1].length === inputCellLength) {
        const updatedOtpText = [...otpText];
        updatedOtpText[i - 1] = otpText[i - 1].slice(0, -1);

        setOtpText(updatedOtpText);
        handleTextChange(updatedOtpText.join(""));
        inputs.current[i - 1].focus();
      }
    }
  };

  const clear = () => {
    setOtpText([]);
    inputs.current[0].focus();
    handleTextChange("");
  };

  const setValue = (value: string, isPaste: boolean = false) => {
    const updatedOtpText = getOTPTextChunks(inputCount, inputCellLength, value);
    const updatedFocusInput = isPaste ? inputCount - 1 : value.length - 1;

    setOtpText(updatedOtpText);

    if (inputs.current[updatedFocusInput]) {
      inputs.current[updatedFocusInput].focus();
    }

    handleTextChange(value);
  };

  const TextInputs = [];

  const onKeyPadPress = (key: string) => {
    onTextChange(key, focusedInput);
  };

  const onExternalKeyPress = (externalKeyType: string, i: number) => {
    const val = otpText[i] || "";
    //  const { handleTextChange, inputCellLength, inputCount } = props;

    if (externalKeyType === "backspace" && val && i !== inputCount - 1) {
      inputs?.current?.[i + 1].focus();
      return;
    }

    if (externalKeyType === "backspace" && i !== 0) {
      if (!val.length && otpText[i - 1].length === inputCellLength) {
        const updatedOtpText = [...otpText];
        updatedOtpText[i - 1] = otpText[i - 1].slice(0, -1);

        setOtpText(updatedOtpText);
        handleTextChange(updatedOtpText.join(""));
        inputs.current[i - 1].focus();
      }
    }
  };

  for (let i = 0; i < inputCount; i += 1) {
    const _tintColor = typeof tintColor === "string" ? tintColor : tintColor[i];
    const _offTintColor =
      typeof offTintColor === "string" ? offTintColor : offTintColor[i];

    const inputStyle = [
      styles.textInput,
      textInputStyle,
      {
        borderColor: _offTintColor,
      },
    ];

    if (focusedInput === i) {
      inputStyle.push({
        borderColor: _tintColor,
      });
    }

    const isFilled = Boolean(otpText[i]);

    TextInputs.push(
      <TextInput
        ref={e => {
          if (e) {
            inputs.current[i] = e;
          }
        }}
        key={i}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoFocus={autoFocus && i === 0}
        value={otpText[i] || ""}
        style={[
          inputStyle,
          {
            borderWidth: isFilled ? 1.5 : 1,
            borderColor: isFilled ? DEFAULT_TINT_COLOR : DEFAULT_OFF_TINT_COLOR,
          },
        ]}
        maxLength={inputCellLength}
        onFocus={() => {
          Keyboard.dismiss();
          onInputFocus(i);
        }}
        onChangeText={text => onTextChange(text, i)}
        multiline={false}
        onKeyPress={e => onKeyPress(e, i)}
        selectionColor={_tintColor}
        secureTextEntry={true}
        {...textInputProps}
        testID={`${testIDPrefix}${i}`}
      />,
    );
  }

  return (
    <View style={styles.container} onTouchEnd={() => Keyboard.dismiss()}>
      <View style={[styles.inputContainer, containerStyle]}>{TextInputs}</View>
      <CustomNumberPad
        onKeyPress={onKeyPadPress}
        onClear={() => {
          onExternalKeyPress("backspace", focusedInput);
        }}
        containerStyle={styles.numberPad}
      />
    </View>
  );
};

export default OTPTextView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 13,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 22,
    color: "#222",
    fontFamily: GlobalStyles.fontFamily.grotesk.bold,
  },
  numberPad: { paddingHorizontal: 40 },
});
