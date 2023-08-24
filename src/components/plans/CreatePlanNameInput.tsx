import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { GlobalStyles } from "~styles";

interface Props extends TextInputProps {
  //
}

export default function CreatePlanNameInput(props: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} {...props} />
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
  },
  textInput: {
    paddingHorizontal: 14,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    lineHeight: 22,
    fontSize: 15,
  },
});
