import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { GlobalStyles } from "~styles";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { calcNormalLineHeight } from "~styles/constants";

interface Props {
  //
}

const slideWidth = 188,
  slideHeight = 243;

const slides = [...Array(3).keys()];

const { CreatePlanPlusIcon, ViewPlansIcon, ViewPlansActiveIcon } = svgAssets;

const YourPlansSwipe = React.memo((props: Props): JSX.Element => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{}}>
      {/*  header */}
      <View style={styles.header}>
        <CustomText variant={"heading"} style={styles.headerTitle}>
          Create Plan
        </CustomText>

        <View style={styles.viewAllWrapper}>
          <CustomText style={styles.viewAll}>View all plans</CustomText>
          <CustomSvgXml svg={ViewPlansIcon} stroke={"#e51313"} />
        </View>
      </View>
      {/* description */}
      <CustomText style={styles.desc}>
        Start your investment journey by creating a{"\n"}plan
      </CustomText>

      {/* slide */}
      <ScrollView
        contentContainerStyle={styles.slide}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={slideWidth + 20}
        decelerationRate="fast"
      >
        <View style={styles.slideItemCreate}>
          <CustomSvgXml svg={CreatePlanPlusIcon} />
          <CustomText style={styles.createTitle}>
            Create an{"\n"}investment plan
          </CustomText>
        </View>
        {slides.map((i, index) => (
          <View style={styles.slideItemPlan} key={`${index}`}></View>
        ))}
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
  },
  slide: {
    columnGap: 20,
    paddingHorizontal: 20,
  },
  desc: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
