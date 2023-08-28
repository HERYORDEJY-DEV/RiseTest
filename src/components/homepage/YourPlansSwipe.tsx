import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { imageAssets, svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import plansApiRequests from "~services/plansRequests";
import { fetchPlans } from "~store/slices/plansSlice";
import { GlobalStyles } from "~styles";
import { calcNormalLineHeight } from "~styles/constants";
import { MainNavigationParamList } from "~types/navigation";
import { PlanType } from "~types/plans";

interface Props {
  //
}

const slideWidth = 188,
  slideHeight = 243,
  slides = [...Array(3).keys()],
  {
    CreatePlanPlusIcon,
    ViewPlansIcon,
    ViewPlansActiveIcon,
    plans: { PlanItemArrowRight },
  } = svgAssets,
  { PlanItemImage } = imageAssets;

const YourPlansSwipe = React.memo((props: Props): JSX.Element => {
  // const plansQuery = useQuery("plans", fetchPlansQuery);
  const scrollOffset = useSharedValue(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParamList, "Tab">>();

  const dispatch = useAppDispatch(),
    plansState = useAppSelector(state => state.plans);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  const myPlans = plansState.plans?.items;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const onGetPlans = async () => {
        try {
          const res = await plansApiRequests.getPlans();
          dispatch(fetchPlans(res.data));
        } catch (err) {
          //
        }
      };

      onGetPlans();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={{}}>
      {/*  header */}
      <View style={styles.header}>
        {plansState.plans?.item_count === 0 ? (
          <CustomText variant={"heading"} style={styles.headerTitle}>
            Create Plan
          </CustomText>
        ) : (
          <CustomText variant={"heading"} style={styles.headerTitle}>
            Your plans
          </CustomText>
        )}

        <Pressable
          onPress={() => navigation.navigate("AllPlans")}
          style={styles.viewAllWrapper}
        >
          <CustomText style={styles.viewAll}>View all plans</CustomText>
          <CustomSvgXml svg={ViewPlansIcon} />
        </Pressable>
      </View>
      {/* description */}
      {plansState.plans?.item_count === 0 && (
        <CustomText style={styles.desc}>
          Start your investment journey by creating a{"\n"}plan
        </CustomText>
      )}

      {/* slide */}
      <ScrollView
        contentContainerStyle={styles.slide}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={slideWidth + 20}
        decelerationRate="fast"
      >
        <Pressable
          onPress={() => navigation.navigate("CreatePlan")}
          style={styles.slideItemCreate}
        >
          <CustomSvgXml svg={CreatePlanPlusIcon} />
          <CustomText style={styles.createTitle}>
            Create an{"\n"}investment plan
          </CustomText>
        </Pressable>
        {myPlans?.map(
          (plan: PlanType, index: number) =>
            index < 5 && (
              <TouchableOpacity
                style={styles.slideItemPlan}
                key={`${index}`}
                onPress={() => navigation.navigate("PlanDetails", { plan })}
              >
                <ImageBackground
                  source={PlanItemImage}
                  style={styles.planItemImage}
                >
                  <View style={styles.slideItemWrapper}>
                    <View style={styles.descWrapper}>
                      <View style={styles.descWrapperRight}>
                        <CustomText style={styles.planName}>
                          {plan.plan_name}
                        </CustomText>
                        <CustomText style={styles.amount}>
                          ${plan.invested_amount}
                        </CustomText>
                        <CustomText style={styles.assetType}>
                          Mixed assets
                        </CustomText>
                      </View>
                      <CustomSvgXml svg={PlanItemArrowRight} />
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ),
        )}
      </ScrollView>
    </View>
  );
});

export default YourPlansSwipe;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    letterSpacing: -0.36,
    lineHeight: calcNormalLineHeight(18),
  },
  viewAllWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  viewAll: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    color: GlobalStyles.colors.text.inactive,
  },
  slideItemCreate: {
    width: 188,
    height: 243,
    backgroundColor: GlobalStyles.colors.offWhites003,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 8,
  },
  createTitle: {
    textAlign: "center",
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    color: GlobalStyles.colors.text.title2,
  },
  slideItemPlan: {
    width: 188,
    height: 243,
    backgroundColor: GlobalStyles.colors.offWhites003,
    borderRadius: 12,
    overflow: "hidden",
  },
  slide: {
    columnGap: 20,
    paddingHorizontal: 20,
  },
  desc: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  planItemImage: {
    width: "100%",
    height: "100%",
  },
  slideItemWrapper: {
    paddingHorizontal: 13,
    paddingVertical: 16,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  descWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  descWrapperRight: {
    // rowGap: 10,
  },
  planName: {
    color: "#171C22",
    fontSize: 15,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  assetType: {
    color: "#171C22",
    fontSize: 15,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  amount: {
    color: "#171C22",
    fontSize: 18,
    letterSpacing: -0.36,
    textTransform: "capitalize",
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
  },
});
