import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, subYears } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import AuthScreensNavBar from "~components/authentication/AuthScreensNavBar";
import CustomButton from "~components/general/CustomButton";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomText from "~components/general/CustomText";
import CustomDateInput from "~components/inputs/CustomDateInput";
import CustomPhoneInput from "~components/inputs/CustomPhoneInput";
import CustomTextInput from "~components/inputs/CustomTextInput";
import { useAppDispatch } from "~hooks/useStore";
import authenticationApiRequests from "~services/authenticationRequests";
import { GlobalStyles } from "~styles";
import { AuthNavigationParamList } from "~types/navigation";
import { aboutYouSchema } from "~utils/yup-schema";

interface Props {
  //
}

export default function AboutYou(props: Props): JSX.Element {
  const navigation =
      useNavigation<
        NativeStackNavigationProp<AuthNavigationParamList, "CreateAccount">
      >(),
    route = useRoute<RouteProp<AuthNavigationParamList, "AboutYou">>();

  const dispatch = useAppDispatch();

  const formMethods = useForm({
      resolver: yupResolver(aboutYouSchema),
      mode: "onBlur",
    }),
    formMethodsErrors = formMethods.formState.errors,
    formMethodsValues = formMethods.getValues();

  const onContinue = async (value: typeof formMethodsValues) => {
    //
    try {
      const form = { ...route.params.form, ...formMethods.getValues() };
      const data = {
        first_name: form.firstName,
        last_name: form.lastName,
        email_address: form.email,
        password: form.password,
        date_of_birth: format(new Date(form.dateOfBirth), "yyyy-MM-dd"),
      };

      const res = await authenticationApiRequests.signUp(data);
      if (res.data) {
        Alert.alert("Account created successfully.\nNow login in your details");
        navigation.navigate("SignIn");
      }
    } catch (err: any) {
      if (err.status === 409) {
        Alert.alert("This user already exist.\nCheck the email address again");
      }
      if (err.status === 400) {
        Alert.alert("Network error\nunable to process request at the moment");
      }
    }
  };

  return (
    <CustomScreenContainer>
      <>
        <ScrollView contentContainerStyle={styles.container}>
          {/* header */}
          <AuthScreensNavBar
            title={"Tell Us More About You"}
            description={"Please use your name as it appears on your ID."}
          />

          {/* form */}
          <View style={styles.form}>
            {/* firstname */}
            <Controller
              control={formMethods.control}
              render={({ field }) => (
                <CustomTextInput
                  label={"Legal First Name"}
                  onChangeText={text => {
                    formMethods.clearErrors("firstName");
                    field.onChange(text);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                  errorMessage={formMethodsErrors.firstName?.message}
                />
              )}
              name="firstName"
              defaultValue={""}
            />

            {/* lastname */}
            <Controller
              control={formMethods.control}
              render={({ field }) => (
                <CustomTextInput
                  label={"Legal Last Name"}
                  onChangeText={text => {
                    formMethods.clearErrors("lastName");
                    field.onChange(text);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                  errorMessage={formMethodsErrors.lastName?.message}
                />
              )}
              name="lastName"
              defaultValue={""}
            />

            {/* nickname */}
            <CustomTextInput label={"Nick name"} onChangeText={text => {}} />

            {/* phone number */}
            <CustomPhoneInput onChangeText={() => {}} onSelectCode={() => {}} />

            {/* date of birth*/}
            <Controller
              control={formMethods.control}
              render={({ field }) => (
                <CustomDateInput
                  onSelectDate={date => {
                    formMethods.clearErrors("dateOfBirth");
                    field.onChange(date);
                  }}
                  onBlur={field.onBlur}
                  // value={format(new Date(field.value), "yyyy-MM-dd")}
                  errorMessage={formMethodsErrors.dateOfBirth?.message}
                  label={"Date of Birth"}
                  maximumDate={subYears(new Date(), 18)}
                />
              )}
              name="dateOfBirth"
              //  defaultValue={new Date()}
            />

            <CustomButton
              onPress={formMethods.handleSubmit(onContinue)}
              title={"Continue"}
              disabled={!formMethods.formState.isValid}
              loading={
                formMethods.formState.isSubmitting ||
                formMethods.formState.isLoading
              }
            />
          </View>

          {/*  terms */}
          <View style={styles.termsWrapper}>
            <CustomText style={styles.terms}>
              By clicking Continue, you agree to our{"\n"}{" "}
              <CustomText style={styles.termsLink}>Terms of Service</CustomText>{" "}
              and{" "}
              <CustomText style={styles.termsLink}>Privacy Policy.</CustomText>
            </CustomText>
          </View>
        </ScrollView>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // paddingBottom: 250,
    // flex: 1,
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
  termsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 12 * 1.4,
  },
  termsLink: {
    fontSize: 12,
    textAlign: "center",
    color: GlobalStyles.colors.accent.teal001,
    lineHeight: 12 * 1.4,
  },
});
