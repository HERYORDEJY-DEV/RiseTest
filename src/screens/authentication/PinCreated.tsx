import React from "react";
import { StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import { GlobalStyles } from "~styles";
import CustomButton from "~components/general/CustomButton";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";

interface Props {
  //
}

const { SuccessCheckIcon } = svgAssets;
export default function PinCreated(props: Props): JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthNavigationParamList, "ForgotPassword">
    >();

  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.checkWrapper}>
            <CustomSvgXml svg={SuccessCheckIcon} />
          </View>
          <CustomText style={styles.message}>
            You’ve created your PIN{" "}
          </CustomText>
          <CustomText style={styles.greeting}>
            Keep your account safe with your{"\n"}secret PIN. Do not share this
            PIN{"\n"}with anyone.
          </CustomText>
        </View>

        <View style={styles.bottom}>
          <CustomButton
            onPress={() => navigation.navigate("SignIn")}
            title={"Okay"}
          />
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
