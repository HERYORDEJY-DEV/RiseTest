import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GlobalStyles } from "~styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";

interface Props extends TextInputProps {
  //
  onSelectDate: (date: Date) => void;
}

const { CalendarIcon } = svgAssets;

export default function CreatePlanDateInput(props: Props): JSX.Element {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn("A date has been picked: ", date);
    props.onSelectDate(date);
    hideDatePicker();
  };

  return (
    <>
      <Pressable onPress={showDatePicker} style={styles.container}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={new Date(props.value ?? "")}
        />

        <TextInput
          pointerEvents={"none"}
          editable={false}
          style={styles.textInput}
          keyboardType={"number-pad"}
          {...props}
        />
        <View style={styles.right}>
          <CustomSvgXml svg={CalendarIcon} />
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //
    height: 55,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.accent.teal001,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    paddingHorizontal: 14,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    lineHeight: 22,
    fontSize: 15,
  },
  right: {
    // flex: 0.1,
    justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 14,
  },
  unit: {
    fontFamily: GlobalStyles.fontFamily.grotesk.bold,
    color: GlobalStyles.colors.text.heading,
    fontSize: 22,
  },
});
