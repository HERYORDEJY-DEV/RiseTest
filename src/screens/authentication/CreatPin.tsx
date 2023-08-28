import React from "react";
import { StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";
import AuthScreensNavBar from "~components/authentication/AuthScreensNavBar";
import CustomOtpInput from "~components/inputs/CustomOtpInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  //
}

export default function CreatPin(props: Props): JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthNavigationParamList, "CreateAccount">
    >();

  const onPinCreate = (pin: string) => {
    if (pin.length === 6) {
      navigation.navigate("PinCreated");
    }
  };

  return (
    <CustomScreenContainer>
      <>
        <View style={styles.container}>
          {/* header */}
          <AuthScreensNavBar
            containerStyles={styles.navbar}
            title={"Create a 6-digit PIN"}
            description={
              "You’ll use this PIN to sign in and confirm\ntransactions"
            }
          />

          <View style={[styles.otpWrapper]}>
            <CustomOtpInput handleTextChange={onPinCreate} />
          </View>
        </View>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    paddingTop: 111,
    marginBottom: 38,
    rowGap: 11,
  },
  screenDesc: {
    fontSize: 15,
  },
  form: {
    rowGap: 17,
  },
  otpWrapper: {
    flex: 1,
    paddingBottom: 79,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 79,
  },
  navbar: { marginBottom: 11, paddingHorizontal: 20 },
});
