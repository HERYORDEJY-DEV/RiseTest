import React, { useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CreatePlansNavBar from "~components/plans/CreatePlansNavBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import { format } from "date-fns";
import { GlobalStyles } from "~styles";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomButton from "~components/general/CustomButton";
import { useDispatch } from "react-redux";
import plansRequests from "~services/plansRequests";
import { formatAmount } from "~utils/get-greeting";
import { createPlan } from "~store/slices/plansSlice";
import ReanimatedGraph, {
  ReanimatedGraphPublicMethods,
} from "@birdwingo/react-native-reanimated-graph";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const data = {
  // Your data points here
  xAxis: [2034, 2035, 2036, 2037, 2038],
  yAxis: [0, 25000, 50000, 75000],
};

interface Props {
  //
}

const { InfoIcon } = svgAssets;

export default function ReviewCreatePlan(props: Props): JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "ReviewCreatePlan">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "ReviewCreatePlan">>(),
    plan = route.params.plan;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const graphRef = useRef<ReanimatedGraphPublicMethods>(null);

  const updateGraphData = () => {
    // Call this function to update the data displayed on the graph
    if (graphRef.current) {
      graphRef.current.updateData(data);
    }
  };
  const onContinue = async () => {
    setIsLoading(true);
    try {
      const data = {
        plan_name: plan.name,
        target_amount: +plan.amount,
        maturity_date: format(new Date(plan.date), "yyyy-MMMM-dd"),
      };

      const res = await plansRequests.createPlan(data);
      if (Boolean(res.data.id)) {
        dispatch(createPlan(res.data));
        navigation.navigate("CreatePlanSuccessful", { plan: res.data });
      }
      setIsLoading(false);
    } catch (err: any) {
      // console.log("\n\n err :>> \t\t", err, err?.message, "\n\n---");
      setIsLoading(false);
      return Alert.alert("Error creating plan.\nTry again later");
    }
  };

  return (
    <CustomScreenContainer>
      <>
        <CreatePlansNavBar title={"Review"} />

        <ScrollView contentContainerStyle={styles.container}>
          {/* calculations */}
          <View style={styles.calcWrapper}>
            <CustomText style={styles.planName}>{plan.name}</CustomText>
            <CustomText variant={"heading"} style={styles.roi}>
              ${formatAmount(plan.amount, false)}
            </CustomText>
            <CustomText variant={"title"} style={styles.planTargetAmount}>
              by {format(new Date(plan.date), "dd MMMM yyyy")}
            </CustomText>

            <View style={styles.investmentOutlineWrapper}>
              <View style={styles.investOutlineWrapper}>
                <View
                  style={[
                    styles.investOutlineBullet,
                    { backgroundColor: "#94A1AD" },
                  ]}
                />
                <CustomText style={styles.investOutline}>
                  Investments • $50,400
                </CustomText>
              </View>
              <View style={styles.investOutlineWrapper}>
                <View style={styles.investOutlineBullet} />
                <CustomText style={styles.investOutline}>
                  Returns • $20,803
                </CustomText>
              </View>
            </View>
          </View>
          {/* graph*/}
          <GestureHandlerRootView>
            <View style={styles.graphWrapper}>
              <ReanimatedGraph
                ref={graphRef}
                xAxis={data.xAxis}
                yAxis={data.yAxis}
                color={"#0898A0"}
                selectionLineColor={"#22D8E2"}
                showXAxisLegend={true}
                showYAxisLegend={true}
                containerStyle={styles.graphContainerStyle}
                showExtremeValues={false}
                selectionAreaData={[2, 3]}
                showBlinkingDot={true}
                showSelectionDot={true}
                renderYAxisLegend={(value: number, index: number) => (
                  <CustomText style={styles.graphTextStyle}>
                    ${value}
                  </CustomText>
                )}
                renderXAxisLegend={(value: number, index: number) => (
                  <CustomText style={styles.graphTextStyle}>
                    ${value}
                  </CustomText>
                )}
              />
            </View>
          </GestureHandlerRootView>
          {/*
          <GestureHandlerRootView>
            <ReanimatedGraph
              ref={graphRef}
              xAxis={data.xAxis}
              yAxis={data.yAxis}
              // Add any other props as needed
            />
          </GestureHandlerRootView>
*/}
          <View style={styles.wrap}>
            {/* estimated */}
            <View style={styles.estimatedWrapper}>
              <CustomText style={styles.estimated}>
                Estimated monthly investment
              </CustomText>
              <CustomText variant={"title2"} style={styles.estimatedValue}>
                $120
              </CustomText>
            </View>

            <View style={styles.divider} />

            {/* disclosure */}
            <View style={styles.disclosureWrapper}>
              <CustomSvgXml svg={InfoIcon} />
              <CustomText style={styles.disclosure}>
                Returns not guaranteed. Investing{"\n"}involves risk. Read our
                Disclosures.
              </CustomText>
            </View>
            <CustomText style={{ textAlign: "center" }}>
              These are your starting settings, they can always be updated.
            </CustomText>
          </View>
          {/* buttons*/}
          <View style={styles.buttonWrapper}>
            <CustomButton
              onPress={onContinue}
              title={"Agree & Continue"}
              loading={isLoading}
            />
            <CustomButton
              variant={"secondary"}
              onPress={() => navigation.navigate("GoalName")}
              title={"Start over"}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
    paddingBottom: 30,
  },
  calcWrapper: {
    paddingHorizontal: 45,
    alignItems: "center",
    marginBottom: 25,
  },
  planName: {
    fontSize: 12,
    lineHeight: 16.8,
  },
  investOutline: {
    fontSize: 12,
    lineHeight: 16.8,
    color: GlobalStyles.colors.text.title2,
  },
  roi: {
    fontSize: 24,
    lineHeight: 28,
    marginVertical: 4,
  },
  planTargetAmount: {
    fontFamily: GlobalStyles.fontFamily.sans.regular,
  },
  investmentOutlineWrapper: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  investOutlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  investOutlineBullet: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: GlobalStyles.colors.accent.teal001,
  },
  estimatedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    backgroundColor: "rgba(113, 135, 156, 0.20)",
    height: 1,
  },
  wrap: {
    paddingHorizontal: 20,
    rowGap: 28,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    rowGap: 10,
    marginVertical: 28,
  },
  disclosureWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 17,
    padding: 10,
    backgroundColor: "rgba(113, 135, 156, 0.05)",
    borderRadius: 8,
  },
  disclosure: {
    flex: 1,
  },
  estimated: {},
  estimatedValue: {},
  graphWrapper: {},
  graphTextStyle: {
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
    lineHeight: 13,
    color: "#94A1AD",
    fontSize: 11,
  },
  graphContainerStyle: {
    paddingHorizontal: 17,
    marginVertical: 27,
  },
});
