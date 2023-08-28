import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomEmailInput from "~components/inputs/CustomEmailInput";
import CustomPasswordInput from "~components/inputs/CustomPasswordInput";
import CustomButton from "~components/general/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { createAccountSchema } from "~utils/yup-schema";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";
import AuthScreensNavBar from "~components/authentication/AuthScreensNavBar";
import CustomText from "~components/general/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "~styles";

interface Props {
  //
}

export default function CreateAccount(props: Props): JSX.Element {
  const safeAreaInset = useSafeAreaInsets();

  const navigation =
      useNavigation<
        NativeStackNavigationProp<AuthNavigationParamList, "CreateAccount">
      >(),
    route = useRoute<RouteProp<AuthNavigationParamList, "CreateAccount">>();
  const formMethods = useForm({
      resolver: yupResolver(createAccountSchema),
      mode: "onBlur",
    }),
    formMethodsErrors = formMethods.formState.errors,
    formMethodsValues = formMethods.getValues();

  const onSignUp = async (value: typeof formMethodsValues) => {
    navigation.navigate("AboutYou", {
      form: { ...value },
    });
  };

  return (
    <CustomScreenContainer>
      <>
        <ScrollView style={styles.container}>
          {/* header */}
          <AuthScreensNavBar
            showBackButton={route?.params?.showNavBarBackButton ?? true}
            title={"Create Account"}
            description={
              "Start building your dollar-denominated\ninvestment portfolio"
            }
          />
          {/* form */}
          <View style={styles.form}>
            <Controller
              control={formMethods.control}
              render={({ field }) => (
                <CustomEmailInput
                  onChangeText={text => {
                    formMethods.clearErrors("email");
                    field.onChange(text);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                  errorMessage={formMethodsErrors.email?.message}
                />
              )}
              name="email"
              defaultValue={""}
            />
            <Controller
              control={formMethods.control}
              render={({ field }) => (
                <CustomPasswordInput
                  showValidationIndicators={true}
                  onChangeText={text => {
                    formMethods.clearErrors("password");
                    field.onChange(text);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                  errorMessage={formMethodsErrors.password?.message}
                />
              )}
              name="password"
              defaultValue={""}
            />

            <CustomButton
              onPress={formMethods.handleSubmit(onSignUp)}
              title={"Sign Up"}
              disabled={
                !formMethods.formState.isValid ||
                formMethods.formState.isLoading
              }
            />
          </View>
        </ScrollView>
        <Pressable
          onPress={() => navigation.navigate("SignIn")}
          style={[styles.bottom, { marginBottom: safeAreaInset.bottom }]}
        >
          <CustomText style={styles.bottomText}>
            Already have an account?{" "}
          </CustomText>
          <CustomText style={styles.bottomTextLink}>Sign in</CustomText>
        </Pressable>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    fontSize: 15,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
  },
  bottomTextLink: {
    fontSize: 15,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    color: GlobalStyles.colors.accent.teal001,
  },
});
