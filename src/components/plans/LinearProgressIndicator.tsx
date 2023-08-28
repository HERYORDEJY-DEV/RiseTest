import React from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "~styles";

interface Props {
  currentValue: number;
  totalValue: number;
}

export default function LinearProgressIndicator(props: Props): JSX.Element {
  const currentThumbWidth =
    (props.currentValue / props.totalValue ?? 100) * 100;
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {Boolean(currentThumbWidth) && (
          <View style={[styles.thumb, { width: `${currentThumbWidth}%` }]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  question: {
    lineHeight: 22,
    fontSize: 15,
  },
  track: {
    backgroundColor: GlobalStyles.colors.offWhites003,
    height: 6,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  thumb: {
    backgroundColor: GlobalStyles.colors.accent.teal001,
    height: "100%",
    width: "100%",
  },
});
