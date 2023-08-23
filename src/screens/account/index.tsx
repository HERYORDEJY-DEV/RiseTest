import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import CustomScreenContainer from "~components/general/CustomScreenContainer";

interface Props {
  //
}

export default function Account(props: Props): JSX.Element {
  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <CustomText variant={"heading"} style={styles.text}>
          This is the Account Screen
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
