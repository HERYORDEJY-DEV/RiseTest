import React from "react";
import { StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomText from "~components/general/CustomText";

interface Props {
  //
}

export default function Plans(props: Props): JSX.Element {
  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <CustomText variant={"heading"} style={styles.text}>
          This is the Plans Screen
        </CustomText>
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 60,
  },
});
