import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";

interface Props extends TextInputProps {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
  maximumDate?: Date;
  minimumDate?: Date;

  onSelectDate(date: Date): void;
}

const { CalendarIcon } = svgAssets;

export default function CustomDateInput(props: Props): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const isError = Boolean(props.errorMessage);

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

  const animatedBorderWidth = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const animatedLabelContainerLeftPosition = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 10],
  });

  const animatedBorderColor = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [
      GlobalStyles.colors.inputs.border,
      GlobalStyles.colors.inputs.borderActive,
    ],
  });

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn("A date has been picked: ", date);
    setValue(date);
    props.onSelectDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    Animated.timing(focusRef, {
      toValue: isFocused || Boolean(value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusRef, isFocused, isDatePickerVisible]);

  return (
    <Pressable
      style={[styles.container, props.containerStyles]}
      onPress={showDatePicker}
    >
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
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={!!value ? new Date(value) : new Date()}
          maximumDate={props.maximumDate}
        />

        <TextInput
          pointerEvents={"none"}
          ref={inputRef}
          cursorColor={
            isError
              ? GlobalStyles.colors.inputs.error
              : GlobalStyles.colors.accent.teal001
          }
          {...props}
          style={[styles.input, props.inputStyles]}
          onBlur={onBlur}
          onFocus={onFocus}
          editable={false}
          value={!!value ? format(new Date(value), "yyyy-MM-dd") : ""}
        />
        <View style={styles.button}>
          <CustomSvgXml svg={CalendarIcon} />
        </View>
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
            onPress={showDatePicker}
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
            {props.label ?? "Date"}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      {isError && (
        <Animated.View style={[styles.errorWrapper]}>
          <CustomText style={styles.errorMessage}>
            {props.errorMessage}*
          </CustomText>
        </Animated.View>
      )}
    </Pressable>
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
    marginTop: 5,
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
