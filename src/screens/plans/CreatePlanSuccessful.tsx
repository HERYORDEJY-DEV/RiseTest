import React from "react";
import { StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import { GlobalStyles } from "~styles";
import CustomButton from "~components/buttons/CustomButton";

interface Props {
  //
}

const {} = svgAssets;
export default function CreatePlanSuccessful(props: Props): JSX.Element {
  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.checkWrapper}>
            {/*<CustomSvgXml svg={ } />*/}
          </View>
          <CustomText style={styles.message}>
            You just created{"\n"}your plan.
          </CustomText>
          <CustomText style={styles.greeting}>Well done, Deborah</CustomText>
        </View>

        <View style={styles.bottom}>
          <CustomButton onPress={() => {}} title={"View Plan"} />
        </View>
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bottom: {
    flex: 0.5,
    justifyContent: "flex-end",
    padding: 20,
    paddingBottom: 102,
  },
  checkWrapper: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: GlobalStyles.colors.offWhites003,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
    lineHeight: 26,
    fontSize: 20,
    color: GlobalStyles.colors.text.title,
    textAlign: "center",
    marginTop: 33.5,
    marginBottom: 10,
  },
  greeting: {
    lineHeight: 22,
    fontSize: 15,
    textAlign: "center",
  },
});
