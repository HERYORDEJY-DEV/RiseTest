import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { imageAssets, svgAssets } from "~assets";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import StackScreensNavBar from "~components/general/StackScreensNavBar";
import { useQueryPlans } from "~hooks/useQueryPlans";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import { fetchPlans } from "~store/slices/plansSlice";
import { GlobalStyles } from "~styles";
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
    plans: { PlanItemArrowRightWhite },
  } = svgAssets,
  { PlanItemImage, PlanBg1, PlanBg3, PlanBg2 } = imageAssets;

const bgImages = [
  PlanBg1,
  PlanBg2,
  PlanBg3,
  PlanBg2,
  PlanBg3,
  PlanBg1,
  PlanBg3,
  PlanBg1,
  PlanBg2,
  PlanBg1,
];

export default function ChoosePlanToFund(props: Props): JSX.Element {
  const plansQuery = useQueryPlans();

  const random = Math.floor(Math.random() * 4) + 1;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainNavigationParamList, "ChoosePlanToFund">
    >();

  const [plans, setPlans] = useState<Array<PlanType>>([]);

  const dispatch = useAppDispatch(),
    plansState = useAppSelector(state => state.plans);

  const myPlans = plansState.plans.items;

  console.log("\n\n 0%5 :>> \t\t", 1 % 6, "\n\n---");

  const keyExtractor = useCallback(
    (item: (typeof myPlans)[0], index: number) => {
      return `${index}`;
    },
    [],
  );
  const getItemLayout = (data: any, index: number) => ({
    length: 35,
    offset: 35 * index,
    index,
  });
  const onSearchPlans = (query: string) => {
    if (!Boolean(query)) {
      return true;
    }
    const queried = plansState.plans.items.filter(
      ({ plan_name, invested_amount }) =>
        `${plan_name}`.toLowerCase().includes(`${query}`.toLowerCase()) ||
        `${invested_amount}`.toLowerCase().includes(`${query}`.toLowerCase()),
    );
    setPlans(queried);
  };

  const renderPlanItem: ListRenderItem<PlanType> = useCallback(
    ({ item: plan, index }) => {
      console.log("\n\n index % random :>> \t\t", index % random, "\n\n---");
      return (
        <TouchableOpacity
          style={styles.slideItemPlan}
          key={`${index}`}
          onPress={() => navigation.navigate("SelectBank", { plan })}
        >
          <ImageBackground source={index % random} style={styles.planItemImage}>
            <View style={styles.slideItemWrapper}>
              <View style={styles.descWrapper}>
                <View style={styles.descWrapperRight}>
                  <CustomText style={styles.planName}>
                    {plan.plan_name}
                  </CustomText>
                  <CustomText style={styles.amount}>
                    ${plan.invested_amount}
                  </CustomText>
                  <CustomText style={styles.assetType}>Mixed assets</CustomText>
                </View>
                <CustomSvgXml svg={PlanItemArrowRightWhite} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    },
    [],
  );

  const renderListHeader = (
    <View style={{ backgroundColor: "#FFF" }}>
      <CustomText style={styles.headerText}>
        Tap on any of the plans to select
      </CustomText>
    </View>
  );

  useEffect(() => {
    dispatch(fetchPlans(plansQuery.data));
  }, []);

  return (
    <CustomScreenContainer>
      <>
        <StackScreensNavBar title={"Choose from plans"} />
        <FlatList
          data={myPlans}
          renderItem={renderPlanItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          stickyHeaderIndices={[0]}
          getItemLayout={getItemLayout}
          numColumns={2}
          contentContainerStyle={{
            rowGap: 19,
            columnGap: 10,
            paddingHorizontal: 20,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            columnGap: 20,
          }}
        />
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
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
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  assetType: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 18,
    letterSpacing: -0.36,
    textTransform: "capitalize",
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
  },
  slideItemPlan: {
    // maxWidth: 188,
    height: 243,
    backgroundColor: GlobalStyles.colors.offWhites003,
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E1E8ED",
  },
  searchBar: {
    height: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: GlobalStyles.colors.inputs.borderActive,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginVertical: 10,
  },
  searchInput: {
    fontSize: 12,
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
