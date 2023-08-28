import React, { useCallback, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "~components/general/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import { PlanType } from "~types/plans";
import plansApiRequests from "~services/plansRequests";
import { imageAssets, svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { GlobalStyles } from "~styles";
import { formatAmount } from "~utils/get-greeting";
import LinearProgressIndicator from "~components/plans/LinearProgressIndicator";
import { addDays, format } from "date-fns";
import { LineChart } from "react-native-chart-kit";
import TransactionItem from "~components/plans/TransactionItem";
import { calcNormalLineHeight } from "~styles/constants";
import { screenHeight } from "~utils/dimensions";
import CustomButton from "~components/general/CustomButton";

interface Props {
  //
}

const txData = [
  { key: "Total earnings", value: "12000.09" },
  { key: "Current earnings", value: "12000.09" },
  { key: "Deposit value", value: "50543.05" },
  { key: "Balance in Naira (*₦505)", value: "31918837.5" },
];

const graphData = {
  labels: ["1M", "3M", "6M", "9M", "All"],
  datasets: [
    {
      data: [
        Math.floor(Math.random() * 100 - 1),
        Math.floor(Math.random() * 100 - 1),
        Math.floor(Math.random() * 100 - 1),
        Math.floor(Math.random() * 100 - 1),
        Math.floor(Math.random() * 100 - 1),
      ],
    },
  ],
};

const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  propsForDots: {
    r: "0",
  },
  barRadius: 10,
};

const txList = [
  {
    id: 1,
    title: "Received from Bank Account (BOSUN TONY ADEMOSU)",
    amount: "320.90",
    date: new Date(),
    type: "in",
  },
  {
    id: 2,
    title: "Sent to Bank Account (ADEBAYO MUSILIU JAGUN)",
    amount: "2942.55",
    date: new Date(),
    type: "out",
  },
  {
    id: 3,
    title: "Sent to Service (PAYSTACK 001WA00948 - AMARDA VENTURES LIMITED)",
    amount: "500.12",
    date: new Date(),
    type: "out",
  },
  {
    id: 4,
    title: "Received from Bank Account (TITUS CLEOPATRA MEDINA)",
    amount: "1840.69",
    date: new Date(),
    type: "in",
  },
  {
    id: 5,
    title: "Received from Rise Plan (SAVE FOR SCHOOL)",
    amount: "528.04",
    date: new Date(),
    type: "in",
  },
];

const { PlanHeaderBg } = imageAssets;
const { ArrowLeft, MenuMoreIcon, MinusIcon, PlusIcon, ViewPlansIcon } =
  svgAssets;

export default function PlanDetails(props: Props): React.JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const navigation =
      useNavigation<
        NativeStackNavigationProp<MainNavigationParamList, "PlanDetails">
      >(),
    route = useRoute<RouteProp<MainNavigationParamList, "PlanDetails">>(),
    _plan = route.params.plan;

  const [plan, setPlan] = useState<PlanType>({
    created_at: "",
    id: "",
    invested_amount: 0,
    maturity_date: "",
    plan_name: "",
    returns: [],
    target_amount: 0,
    total_returns: 0,
    user_id: "",
  });
  const [selectedGraphMenu, setSelectedGraphMenu] = useState<string>("1M");

  useFocusEffect(
    useCallback(() => {
      setPlan(_plan);
      let isActive = true;

      const onGetPlans = async () => {
        try {
          const res = await plansApiRequests.getPlan(plan?.id);
          setPlan(prev => ({ ...prev, ...res.data }));
        } catch (err) {
          //
        }
      };

      if (Boolean(plan?.id.length)) {
        onGetPlans();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={[styles.header]}>
        <ImageBackground
          source={PlanHeaderBg}
          style={styles.imageBg}
          blurRadius={20}
          resizeMode={"cover"}
        >
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <Pressable style={styles.headerButton} onPress={navigation.goBack}>
              <CustomSvgXml svg={ArrowLeft} />
            </Pressable>
            <View style={styles.headerBody}>
              <CustomText variant={"heading"} style={styles.headerTitle}>
                {plan?.plan_name}
              </CustomText>
              {/*<CustomText style={styles.headerDesc}></CustomText>*/}
            </View>
            <Pressable style={styles.headerButton}>
              <CustomSvgXml svg={MenuMoreIcon} />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      {/*  body */}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* calculations */}
        <View style={styles.calcWrapper}>
          <CustomText style={styles.planName}>{plan?.plan_name}</CustomText>
          <CustomText variant={"heading"} style={styles.roi}>
            {formatAmount(plan?.invested_amount, "$")}
          </CustomText>
          <CustomText style={styles.planTargetAmount}>
            ~ {formatAmount(plan?.target_amount)}
          </CustomText>

          <View style={styles.gains}>
            <CustomText style={styles.gainsTitle}>Gains</CustomText>
            <CustomText style={styles.gainsAmount}>
              +{formatAmount("5000.43", "$")} • +12.4%{" "}
            </CustomText>
          </View>

          <View style={styles.investmentOutlineWrapper}>
            <View style={styles.investOutlineWrapper}>
              <CustomText style={styles.investOutline}>
                0.01 achieved
              </CustomText>
              <CustomText style={styles.investOutline}>
                Target: {formatAmount("20053.90", "$")}
              </CustomText>
            </View>
            <LinearProgressIndicator
              currentValue={1110.01}
              totalValue={20053}
            />
          </View>
        </View>

        <View style={{ rowGap: 23, marginBottom: 14 }}>
          {/*  results */}
          <View style={styles.resultsWrapper}>
            <CustomText style={styles.resultsText}>
              Results are updated monthly
            </CustomText>
          </View>

          {/*  fund button */}
          <View style={styles.fundButton}>
            <CustomButton
              variant={"secondary"}
              title={"Fund plan"}
              onPress={() => navigation.navigate("FundWallet")}
              containerStyle={styles.fundWallet}
              leftElement={<CustomSvgXml svg={PlusIcon} />}
            />
          </View>

          {/*   graph */}
          <View style={styles.graphContainer}>
            <View style={styles.graphDescWrapper}>
              <CustomText style={styles.graphTitle}>Performance</CustomText>
              <CustomText variant={"heading"} style={styles.graphRoi}>
                ${formatAmount("208.39", false)}
              </CustomText>
              {Boolean(plan?.created_at) && (
                <CustomText variant={"title"} style={styles.graphTargetDate}>
                  by {format(new Date(plan?.created_at), "dd MMMM yyyy")}
                </CustomText>
              )}

              <View style={styles.graphInvestmentOutlineWrapper}>
                <View style={styles.graphInvestOutlineWrapper}>
                  <View
                    style={[
                      styles.graphInvestOutlineBullet,
                      { backgroundColor: "#FFFFFF" },
                    ]}
                  />
                  <CustomText style={styles.graphInvestOutline}>
                    Investments • $50,400
                  </CustomText>
                </View>
                <View style={styles.graphInvestOutlineWrapper}>
                  <View style={styles.graphInvestOutlineBullet} />
                  <CustomText style={styles.graphInvestOutline}>
                    Returns • $20,803
                  </CustomText>
                </View>
              </View>
            </View>

            <View style={styles.graphWrapper}>
              <LineChart
                data={graphData}
                width={Dimensions.get("window").width - 76}
                height={280}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
                transparent={true}
                fromZero={false}
                withVerticalLabels={false}
                renderDotContent={({ x, y, index, indexData }) => {
                  const isShowAll = "All" === selectedGraphMenu;
                  return isShowAll ? (
                    <View
                      style={[styles.graphDot, { left: x - 5, top: y - 5 }]}
                    />
                  ) : (
                    graphData.labels[index] === selectedGraphMenu && (
                      <View
                        style={[styles.graphDot, { left: x - 5, top: y - 5 }]}
                      />
                    )
                  );
                }}
              />
            </View>

            <View style={styles.graphBottom}>
              {graphData.labels.map(label => {
                return (
                  <TouchableOpacity
                    key={`${label}`}
                    style={[
                      styles.graphBottomButton,
                      {
                        backgroundColor:
                          label === selectedGraphMenu
                            ? GlobalStyles.colors.white
                            : "transparent",
                      },
                    ]}
                    onPress={() => setSelectedGraphMenu(label)}
                  >
                    <CustomText
                      style={[
                        styles.graphBottomText,
                        {
                          color:
                            label === selectedGraphMenu
                              ? GlobalStyles.colors.accent.teal001
                              : GlobalStyles.colors.white,
                        },
                      ]}
                    >
                      {label}
                    </CustomText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ rowGap: 14, marginBottom: 14 }}>
            {/*  data */}
            <View style={styles.dataWrapper}>
              {txData.map(({ key, value }) => (
                <View style={styles.dataItem} key={`${index}`}>
                  <CustomText style={styles.dataKey}>{key}</CustomText>
                  <CustomText style={styles.dataValue}>
                    {formatAmount(value, key.includes("Naira") ? true : "$")}
                  </CustomText>
                </View>
              ))}

              {Boolean(plan?.created_at) && (
                <View style={styles.dataItem}>
                  <CustomText style={styles.dataKey}>
                    Plan created on
                  </CustomText>
                  <CustomText style={styles.dataValue}>
                    {format(new Date(plan?.created_at), "do MMMM yyyy")}
                  </CustomText>
                </View>
              )}

              {Boolean(plan?.created_at) && (
                <View style={styles.dataItem}>
                  <CustomText style={styles.dataKey}>Maturity date</CustomText>
                  <CustomText style={styles.dataValue}>
                    {format(new Date(plan?.maturity_date), "do MMMM yyyy")}4
                  </CustomText>
                </View>
              )}
            </View>

            {/* tx header */}
            <View style={styles.txHeader}>
              <CustomText variant={"heading"} style={styles.txHeaderTitle}>
                Recent transactions
              </CustomText>

              <Pressable
                onPress={() => navigation.navigate("AllPlans")}
                style={styles.viewAllWrapper}
              >
                <CustomText style={styles.viewAll}>View all</CustomText>
                <CustomSvgXml svg={ViewPlansIcon} />
              </Pressable>
            </View>

            {/*  recent transaction */}
            <View style={styles.txListWrapper}>
              {/*<FlatList*/}
              {/*  data={[...Array(6).keys()]}*/}
              {/*  renderItem={renderTransactionItem}*/}
              {/*  keyExtractor={keyExtractor}*/}
              {/*/>*/}
              {txList.map((tx, index) => {
                return (
                  <TransactionItem
                    key={`${index}`}
                    {...tx}
                    date={addDays(tx.date, index + 1)}
                    amount={Number(tx.amount)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  header: {
    height: 146.94,
    width: "100%",
  },
  imageBg: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  headerButton: {
    height: 36,
    width: 36,
    borderRadius: 36,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    fontSize: 24,
    fontFamily: GlobalStyles.fontFamily.grotesk.bold,
  },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "#FFFFFF05" },
  headerBody: {},
  contentContainer: {
    paddingTop: 30,
    paddingBottom: screenHeight * 0.2,
    // height: "100%",
  },
  calcWrapper: {
    paddingHorizontal: 45,
    alignItems: "center",
    marginBottom: 25,
  },
  planName: {
    fontSize: 15,
    lineHeight: 22,
  },
  investOutline: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.body,
  },
  roi: {
    fontSize: 24,
    lineHeight: 28,
    marginVertical: 4,
  },
  planTargetAmount: {
    fontSize: 16,
    lineHeight: 21.76,
  },
  investmentOutlineWrapper: {
    width: "100%",
    rowGap: 12,
  },
  investOutlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  gains: { rowGap: 3, alignItems: "center", marginTop: 12, marginBottom: 8.5 },
  gainsAmount: { color: "#27BF41", fontSize: 16, lineHeight: 21.76 },
  gainsTitle: { color: "#012224", fontSize: 15, lineHeight: 22 },
  resultsWrapper: {
    backgroundColor: GlobalStyles.colors.offWhites003,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  fundButton: {
    marginHorizontal: 20,
  },
  graphContainer: {
    backgroundColor: GlobalStyles.colors.accent.teal001,
    marginHorizontal: GlobalStyles.spacing.ScreenPadding,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: "rgba(43, 57, 75, 0.15)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 5,
  },
  graphInvestmentOutlineWrapper: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  graphInvestOutlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  graphInvestOutlineBullet: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: GlobalStyles.colors.accent.teal002,
  },
  graphTitle: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.white,
  },
  graphInvestOutline: {
    fontSize: 12,
    lineHeight: 16.8,
    color: GlobalStyles.colors.white,
  },
  graphRoi: {
    color: GlobalStyles.colors.white,
    fontSize: 24,
    lineHeight: 26,
    marginVertical: 4,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
  },
  graphTargetDate: {
    fontFamily: GlobalStyles.fontFamily.sans.regular,
    color: GlobalStyles.colors.white,
    fontSize: 13,
    lineHeight: 19,
  },
  graphDescWrapper: {
    alignItems: "center",
  },
  graphBottom: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 28,
  },
  graphBottomText: {
    color: GlobalStyles.colors.white,
  },
  graphBottomButton: {
    width: 65,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  graphWrapper: {
    marginTop: 17,
    // marginBottom: 22,
  },
  resultsText: {},
  graphDot: {
    position: "absolute",
    height: 11,
    width: 11,
    borderRadius: 11,
    backgroundColor: GlobalStyles.colors.accent.teal001,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  dataWrapper: {
    paddingHorizontal: 20,
  },
  dataItem: {
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "rgba(113, 135, 156, 0.10)",
    borderBottomWidth: 1,
  },
  dataKey: { fontSize: 15, lineHeight: 22 },
  dataValue: {
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
    color: GlobalStyles.colors.text.title,
    fontSize: 15,
    lineHeight: 20,
  },
  txListWrapper: { paddingHorizontal: 20, rowGap: 20 },
  txHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 12,
    paddingHorizontal: 20,
  },
  txHeaderTitle: {
    fontSize: 18,
    letterSpacing: -0.36,
    lineHeight: calcNormalLineHeight(18),
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
  },
  viewAllWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  viewAll: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    color: GlobalStyles.colors.accent.teal001,
  },
  fundWallet: {
    backgroundColor: GlobalStyles.colors.offWhites003,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 9,
    height: 56,
    // marginHorizontal: 20,
    borderRadius: 5,
  },
});
