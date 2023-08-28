import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomEmailInput from "~components/inputs/CustomEmailInput";
import CustomButton from "~components/general/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "~utils/yup-schema";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";
import AuthScreensNavBar from "~components/authentication/AuthScreensNavBar";

interface Props {
  //
}

export default function ForgotPassword(props: Props): JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthNavigationParamList, "ForgotPassword">
    >();

  const formMethods = useForm({
      resolver: yupResolver(signInSchema.omit(["password"])),
      mode: "onBlur",
    }),
    formMethodsErrors = formMethods.formState.errors,
    formMethodsValues = formMethods.getValues();

  const onSubmit = (value: typeof formMethodsValues) => {
    navigation.navigate("CreatPin");
  };

  return (
    <CustomScreenContainer>
      <>
        <ScrollView style={styles.container}>
          {/* header */}
          <AuthScreensNavBar
            title={"Forgot password"}
            description={
              "Enter your email address and  submit. We will\nsend you an email with instructions on how to\nreset your password."
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

            <CustomButton
              onPress={formMethods.handleSubmit(onSubmit)}
              title={"Submit"}
              disabled={
                !formMethods.formState.isValid ||
                formMethods.formState.isLoading
              }
            />
          </View>
        </ScrollView>
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
});
