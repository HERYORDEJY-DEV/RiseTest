import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CreatePlansNavBar from "~components/plans/CreatePlansNavBar";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import { imageAssets, svgAssets } from "~assets";
import CustomText from "~components/general/CustomText";
import { SvgProps } from "react-native-svg";
import CustomButton from "~components/buttons/CustomButton";
import CreatePlanQuestionProgress from "~components/plans/CreatePlanQuestionProgress";
import { GlobalStyles } from "~styles";
import CreatePlanDateInput from "~components/plans/CreatePlanDateInput";
import { format, isDate } from "date-fns";

interface Props {
  //
}

const {
  ArrowBackIcon,
  CloseIcon,
  HelpQuestionIcon,
  CalendarIcon,
  SettingsIcon,
} = svgAssets;
const { CreatePlanIlls } = imageAssets;

type TipsItemTypes = {
  title: string;
  description: string;
  icon: React.FC<SvgProps>;
};

export default function TargetDate(props: Props): JSX.Element {
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "TargetDate">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "TargetDate">>();

  const [form, setForm] = useState({ date: new Date() });

  const onSetForm = (key: keyof typeof form, value: Date) =>
    setForm(prev => ({ ...prev, [key]: value }));

  return (
    <CustomScreenContainer>
      <>
        <CreatePlansNavBar title={"Target date"} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* progress*/}
          <CreatePlanQuestionProgress
            currentQuestionNumber={3}
            totalQuestionNumber={3}
          />

          {/*  form */}
          <View style={styles.form}>
            <CustomText variant={"title"} style={styles.formTitle}>
              When do you want to withdraw?
            </CustomText>
            <CreatePlanDateInput
              onSelectDate={date => onSetForm("date", date)}
              value={format(form.date, "yyyy-MM-dd")}
            />
          </View>

          <CustomButton
            onPress={() =>
              navigation.navigate("ReviewCreatePlan", {
                plan: {
                  ...route?.params?.plan,
                  date: form.date.toDateString(),
                },
              })
            }
            title={"Continue"}
            disabled={!isDate(form.date)}
          />
        </ScrollView>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  form: {
    marginTop: 54,
    marginBottom: 24,
    rowGap: 20,
  },
  formTitle: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 17,
  },

  illsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 61.66,
    marginBottom: 53.34,
  },
  reachGoal: {
    fontSize: 15,
    lineHeight: 22,
  },
  tip: {
    flexDirection: "row",
    columnGap: 20,
  },
  tipIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 135, 156, 0.10)",
  },
  tipBody: { rowGap: 6, flex: 1 },
  tipsContainer: { paddingHorizontal: 20, rowGap: 24 },
  tipTitle: {},
  tipDescription: {
    lineHeight: 19,
  },
  bottom: {
    margin: 20,
  },
});
