import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import CustomText from "~components/general/CustomText";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { svgAssets } from "~assets";

interface Props {
  title: string;
}

const {
  ArrowBackIcon,
  CloseIcon,
  HelpQuestionIcon,
  CalendarIcon,
  SettingsIcon,
} = svgAssets;

export default function CreatePlansNavBar(props: Props): JSX.Element {
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "CreatePlan">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "CreatePlan">>();

  const isCreatePlanScreen = route.name === "CreatePlan";

  return (
    <View style={[styles.container, { marginTop: 10 }]}>
      {/* right */}
      <View style={styles.left}>
        <Pressable style={styles.backButton} onPress={navigation.goBack}>
          <CustomSvgXml svg={isCreatePlanScreen ? CloseIcon : ArrowBackIcon} />
        </Pressable>
      </View>

      {/* body */}
      <View style={styles.body}>
        <CustomText variant={"heading"}>{props.title}</CustomText>
      </View>

      {/*  right */}
      <View style={styles.right}>
        <CustomText></CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    marginHorizontal: 20,
    marginBottom: 20,
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
});
