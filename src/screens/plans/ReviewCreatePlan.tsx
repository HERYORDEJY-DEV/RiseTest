import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import CustomButton from "~components/buttons/CustomButton";
import { BarChart } from "react-native-gifted-charts";

const data = {
  // Your data points here
  xAxis: [0, 1, 2, 3, 4],
  yAxis: [0, 5, 2, 7, 4],
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

  // const graphRef = useRef<ReanimatedGraphPublicMethods>(null);

  const lineData = [
    { value: 0, label: "001", labelComponent: () => <></> },
    { value: 20, label: "002", labelComponent: () => <></> },
    { value: 18, label: "003", labelComponent: () => <></> },
    { value: 40, label: "004", labelComponent: () => <></> },
    { value: 36, label: "005", labelComponent: () => <></> },
    { value: 60, label: "006", labelComponent: () => <></> },
    { value: 54, label: "007", labelComponent: () => <></> },
    { value: 85, label: "008", labelComponent: () => <></> },
  ];
  const updateGraphData = () => {
    // Call this function to update the data displayed on the graph
    if (graphRef.current) {
      graphRef.current.updateData(data);
    }
  };

  return (
    <CustomScreenContainer>
      <>
        <CreatePlansNavBar title={"Review"} />

        <ScrollView style={styles.container}>
          {/* calculations */}
          <View style={styles.calcWrapper}>
            <CustomText style={styles.planName}>{plan.name}</CustomText>
            <CustomText variant={"heading"} style={styles.roi}>
              $10,930.75
            </CustomText>
            <CustomText variant={"title"} style={styles.planDate}>
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

          <View>
            <View
              style={{
                marginVertical: 100,
                paddingVertical: 50,
                backgroundColor: "#414141",
              }}
            >
              <BarChart
                areaChart
                hideDataPoints
                isAnimated
                animationDuration={1200}
                startFillColor="#0BA5A4"
                startOpacity={1}
                endOpacity={0.3}
                initialSpacing={0}
                data={lineData}
                spacing={30}
                thickness={5}
                hideRules
                hideYAxisText
                yAxisColor="#0BA5A4"
                showVerticalLines
                verticalLinesColor="rgba(14,164,164,0.5)"
                xAxisColor="#0BA5A4"
                color="#0BA5A4"
              />
            </View>
          </View>

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
              onPress={() =>
                navigation.navigate("CreatePlanSuccessful", { plan })
              }
              title={"Agree & Continue"}
            />
            <CustomButton
              variant={"secondary"}
              onPress={() => navigation.navigate("GoalName")}
              title={"Start over"}
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
  planDate: {
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
});

const dPoint = () => {
  return (
    <View
      style={{
        width: 14,
        height: 14,
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 7,
        borderColor: "#07BAD1",
      }}
    />
  );
};

const lcomp = (text: string) => {
  return <CustomText>{text}</CustomText>;
};

const latestData = [
  {
    value: 100,
    labelComponent: () => lcomp("22 Nov"),
    customDataPoint: dPoint,
  },
  {
    value: 120,
    hideDataPoint: true,
  },
  {
    value: 210,
    customDataPoint: dPoint,
  },
  {
    value: 250,
    hideDataPoint: true,
  },
  {
    value: 320,
    labelComponent: () => lcomp("24 Nov"),
    customDataPoint: dPoint,
  },
  {
    value: 310,
    hideDataPoint: true,
  },
  {
    value: 270,
    customDataPoint: dPoint,
  },
  {
    value: 240,
    hideDataPoint: true,
  },
  {
    value: 130,
    labelComponent: () => lcomp("26 Nov"),
    customDataPoint: dPoint,
  },
  {
    value: 120,
    hideDataPoint: true,
  },
  {
    value: 100,
    customDataPoint: dPoint,
  },
  {
    value: 210,
    hideDataPoint: true,
  },
  {
    value: 270,
    labelComponent: () => lcomp("28 Nov"),
    customDataPoint: dPoint,
  },
  {
    value: 240,
    hideDataPoint: true,
  },
  {
    value: 120,
    hideDataPoint: true,
  },
  {
    value: 100,
    customDataPoint: dPoint,
  },
  {
    value: 210,
    labelComponent: () => lcomp("28 Nov"),
    customDataPoint: dPoint,
  },
  {
    value: 20,
    hideDataPoint: true,
  },
  {
    value: 100,
    customDataPoint: dPoint,
  },
];
