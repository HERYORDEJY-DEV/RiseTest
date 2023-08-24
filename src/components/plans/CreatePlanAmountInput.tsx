import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { GlobalStyles } from "~styles";
import CustomText from "~components/general/CustomText";

interface Props extends TextInputProps {
  //
}

export default function CreatePlanAmountInput(props: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CustomText style={styles.unit}>$</CustomText>
      </View>
      <TextInput
        style={styles.textInput}
        keyboardType={"number-pad"}
        {...props}
      />
    </View>
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
    paddingLeft: 0,
  },
  left: {
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
