import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CreatePlansNavBar from "~components/plans/CreatePlansNavBar";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import { imageAssets, svgAssets } from "~assets";
import CustomText from "~components/general/CustomText";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { SvgProps } from "react-native-svg";
import CustomButton from "~components/general/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function CreatePlan(props: Props): JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "CreatePlan">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "CreatePlan">>();

  const isScreenModal = route?.params?.screenPresentation === "modal";

  const renderTipsItem = ({ title, description, icon }: TipsItemTypes) => {
    return (
      <View style={styles.tip}>
        <View style={styles.tipIcon}>
          <CustomSvgXml svg={icon} />
        </View>

        <View style={styles.tipBody}>
          <CustomText variant={"title"} style={styles.tipTitle}>
            {title}
          </CustomText>
          <CustomText variant={"body"} style={styles.tipDescription}>
            {description}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <CustomScreenContainer>
      <>
        <CreatePlansNavBar title={"Create Plan"} />
        <ScrollView>
          {/* illustartation*/}
          <View style={styles.illsWrapper}>
            <CustomText style={styles.reachGoal}>
              Reach your goal faster
            </CustomText>
            <Image source={CreatePlanIlls} />
          </View>

          {/*  tips */}
          <View style={styles.tipsContainer}>
            {renderTipsItem({
              title: "Give us a few details",
              description:
                "Tell us what you want to achieve and we will help you get there",
              icon: HelpQuestionIcon,
            })}
            {renderTipsItem({
              title: "Turn on auto-invest",
              description:
                "The easiest way to get your investment working for you is to fund to periodically.",
              icon: CalendarIcon,
            })}
            {renderTipsItem({
              title: "Modify as you progress",
              description:
                "You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.",
              icon: SettingsIcon,
            })}
          </View>
        </ScrollView>
        <View style={[styles.bottom, { paddingBottom: safeAreaInset.bottom }]}>
          <CustomButton
            onPress={() => navigation.navigate("GoalName")}
            title={"Continue"}
          />
        </View>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
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
    fontSize: 13,
  },
  bottom: {
    margin: 20,
  },
});
