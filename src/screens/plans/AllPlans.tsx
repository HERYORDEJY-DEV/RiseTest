import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomText from "~components/general/CustomText";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainNavigationParamList } from "~types/navigation";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import plansApiRequests from "~services/plansRequests";
import { fetchPlans } from "~store/slices/plansSlice";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { imageAssets, svgAssets } from "~assets";
import { GlobalStyles } from "~styles";
import { PlanType } from "~types/plans";
import StackScreensNavBar from "~components/general/StackScreensNavBar";
import { useQueryPlans } from "~hooks/useQueryPlans";

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

export default function AllPlans(props: Props): JSX.Element {
  const plansQuery = useQueryPlans();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainNavigationParamList, "AllPlans">
    >();

  const [plans, setPlans] = useState<Array<PlanType>>([]);

  const dispatch = useAppDispatch(),
    plansState = useAppSelector(state => state.plans);

  const myPlans = plansState.plans.items;

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
      return (
        <TouchableOpacity
          style={styles.slideItemPlan}
          key={`${index}`}
          onPress={() => navigation.navigate("PlanDetails", { plan })}
        >
          <ImageBackground source={PlanItemImage} style={styles.planItemImage}>
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
                <CustomSvgXml svg={PlanItemArrowRight} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      );
    },
    [],
  );

  const renderSearchbar = (
    <View style={{ backgroundColor: "#FFF" }}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={onSearchPlans}
          style={styles.searchInput}
          placeholder={"Search Plan"}
          placeholderTextColor={GlobalStyles.colors.accent.teal001}
        />
      </View>
    </View>
  );

  useEffect(() => {
    dispatch(fetchPlans(plansQuery.data));
  }, []);

  return (
    <CustomScreenContainer>
      <>
        <StackScreensNavBar title={"All Plans"} />
        <FlatList
          data={myPlans}
          renderItem={renderPlanItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderSearchbar}
          stickyHeaderIndices={[0]}
          getItemLayout={getItemLayout}
          numColumns={2}
          contentContainerStyle={{
            rowGap: 10,
            columnGap: 10,
            paddingHorizontal: 20,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            columnGap: 10,
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
    color: "#171C22",
    fontSize: 13,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  assetType: {
    color: "#171C22",
    fontSize: 13,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  amount: {
    color: "#171C22",
    fontSize: 16,
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
});
