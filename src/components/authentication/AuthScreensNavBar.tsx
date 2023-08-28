import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import CustomText from "~components/general/CustomText";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { svgAssets } from "~assets";

interface Props {
  title: string;
  description?: string;
  showBackButton?: boolean;
  containerStyles?: ViewStyle;
}

const {
  ArrowBackIcon,
  CloseIcon,
  HelpQuestionIcon,
  CalendarIcon,
  SettingsIcon,
} = svgAssets;

export default function AuthScreensNavBar({
  showBackButton = true,
  ...props
}: Props): JSX.Element {
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "CreatePlan">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "CreatePlan">>();

  const isCreatePlanScreen = route.name === "CreatePlan";

  return (
    <View style={[styles.container, props.containerStyles]}>
      <View style={[styles.content, { marginTop: 10 }]}>
        {/* right */}
        <View style={styles.left}>
          {showBackButton && (
            <Pressable style={styles.backButton} onPress={navigation.goBack}>
              <CustomSvgXml
                svg={isCreatePlanScreen ? CloseIcon : ArrowBackIcon}
              />
            </Pressable>
          )}
        </View>

        {/* body */}
        <View style={styles.body}>
          <CustomText></CustomText>
        </View>

        {/*  right */}
        <View style={styles.right}>
          <CustomText></CustomText>
        </View>
      </View>
      <View style={styles.header}>
        <CustomText variant={"authScreenTitle"}>{props.title}</CustomText>
        {props.description && (
          <CustomText style={styles.screenDesc}>{props.description}</CustomText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 38,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    // marginHorizontal: 20,
    marginBottom: 30,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.10)",
  },

  left: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  body: { flex: 1, alignItems: "center", justifyContent: "center" },
  right: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  header: {
    // marginTop: 21,

    rowGap: 11,
  },
  screenDesc: {
    fontSize: 15,
  },
});
