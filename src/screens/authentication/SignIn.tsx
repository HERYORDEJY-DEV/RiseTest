import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomEmailInput from "~components/inputs/CustomEmailInput";
import CustomPasswordInput from "~components/inputs/CustomPasswordInput";
import CustomButton from "~components/general/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "~utils/yup-schema";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";
import AuthScreensNavBar from "~components/authentication/AuthScreensNavBar";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import authenticationApiRequests from "~services/authenticationRequests";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import { createAccount } from "~store/slices/authSlice";
import { updateWalletOnSignIn } from "~store/slices/walletSlice";

interface Props {
  //
}

export default function SignIn(props: Props): JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthNavigationParamList, "CreateAccount">
    >();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.authentication);

  const formMethods = useForm({
      resolver: yupResolver(signInSchema),
      mode: "onBlur",
    }),
    formMethodsErrors = formMethods.formState.errors,
    formMethodsValues = formMethods.getValues();

  const onSignUp = async (value: typeof formMethodsValues) => {
    try {
      const form = { ...formMethods.getValues() };
      const data = {
        email_address: form.email,
        password: form.password,
      };

      const res = await authenticationApiRequests.signIn(data);
      if (Boolean(res.data.token)) {
        const resData = {
          email_address: res.data.email_address,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          username: res.data.username,
          token: res.data.token,
          id: res.data.id,
        };
        dispatch(createAccount(resData));
        dispatch(
          updateWalletOnSignIn({
            total_balance: res.data.total_balance,
            total_returns: res.data.total_returns,
          }),
        );
      }
    } catch (err: any) {
      // console.error("\n\n err :00>> \t\t", err, "\n\n---");
      if (err.status === 401) {
        Alert.alert("Incorrect email address\nor password");
      }
      if (err.status === 400) {
        Alert.alert("Network error\nunable to process request at the moment");
      }
    }
  };

  return (
    <CustomScreenContainer>
      <>
        <ScrollView style={styles.container}>
          {/* header */}
          <AuthScreensNavBar
            showBackButton={false}
            title={"Welcome back"}
            description={
              "Let’s get you logged in to get back to building\nyour dollar-denominated investment portfolio."
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
              title={"Sign In"}
              disabled={!formMethods.formState.isValid}
              loading={
                formMethods.formState.isSubmitting ||
                formMethods.formState.isLoading
              }
            />

            <CustomButton
              variant={"ghost"}
              onPress={() => navigation.navigate("ForgotPassword")}
              title={"I forgot my password"}
            />
          </View>
        </ScrollView>
        <Pressable
          onPress={() => navigation.navigate("CreateAccount", {})}
          style={[styles.bottom, { marginBottom: safeAreaInset.bottom }]}
        >
          <CustomText style={styles.bottomText}>
            Don't have an account?{" "}
          </CustomText>
          <CustomText style={styles.bottomTextLink}>Sign up</CustomText>
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
