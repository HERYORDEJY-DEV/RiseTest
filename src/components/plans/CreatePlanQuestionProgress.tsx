import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";

interface Props {
  currentQuestionNumber: number;
  totalQuestionNumber: number;
}

export default function CreatePlanQuestionProgress(props: Props): JSX.Element {
  const currentThumbWidth =
    (props.currentQuestionNumber / props.totalQuestionNumber) * 100;
  return (
    <View style={styles.container}>
      <CustomText style={styles.question}>
        Question {props.currentQuestionNumber ?? 1} of{" "}
        {props.totalQuestionNumber}
      </CustomText>
      <View style={styles.track}>
        <View style={[styles.thumb, { width: `${currentThumbWidth}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    rowGap: 21,
  },
  question: {
    lineHeight: 22,
    fontSize: 15,
  },
  track: {
    backgroundColor: GlobalStyles.colors.offWhites003,
    height: 10,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  thumb: {
    backgroundColor: GlobalStyles.colors.accent.teal001,
    height: 10,
    width: "100%",
  },
});
