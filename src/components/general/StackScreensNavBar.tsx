import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import { MainNavigationParamList } from "~types/navigation";

interface Props {
  title: string;
  description?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  containerStyles?: ViewStyle;
}

const { ArrowBackIcon, CloseIcon } = svgAssets;

export default function StackScreensNavBar({
  showBackButton = true,
  ...props
}: Props): JSX.Element {
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "CreatePlan">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "CreatePlan">>();

  const isCreatePlanScreen =
    route.name === "CreatePlan" || props.showCloseButton;

  return (
    <View style={[styles.container, props.containerStyles]}>
      {/* right */}
      <View style={styles.left}>
        {showBackButton && (
          <Pressable style={styles.backButton} onPress={navigation.goBack}>
            <CustomSvgXml
              svg={
                isCreatePlanScreen || props.showCloseButton
                  ? CloseIcon
                  : ArrowBackIcon
              }
            />
          </Pressable>
        )}
      </View>

      {/* body */}
      <View style={styles.body}>
        <CustomText variant={"authScreenTitle"}>{props.title}</CustomText>
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
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 20,
  },
  content: {},

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.10)",
  },

  left: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  body: { flex: 1, alignItems: "center", justifyContent: "center" },
  right: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  header: {
    rowGap: 11,
  },
  screenDesc: {
    fontSize: 15,
  },
});
