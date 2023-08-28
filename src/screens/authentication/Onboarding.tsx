import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import { GlobalStyles } from "~styles";
import { screenHeight, screenWidth } from "~utils/dimensions";
import Animated, {
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import CustomButton from "~components/general/CustomButton";
import { StackActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthNavigationParamList } from "~types/navigation";
import CustomScreenContainer from "~components/general/CustomScreenContainer";

interface Props {
  //
}

const {
  onboarding: {
    OnboardingImage1,
    OnboardingImage2,
    OnboardingImage3,
    Onboarding1ArrowLeft,
    Onboarding1ArrowRight,
    Onboarding2ArrowLeft,
    Onboarding2ArrowRight,
  },
} = svgAssets;

const slideWidth = screenWidth;

export default function Onboarding(props: Props): JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthNavigationParamList, "Onboarding">
    >();

  const safeAreaInset = useSafeAreaInsets();
  const slide = onBoardingData[0];
  const [scrollState, setScrollState] = useState({
    nextText: "Next",
    activeIndex: 0,
  });

  const scrollRef = useAnimatedRef<ScrollView>();
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });
  const activeIndexValue = useDerivedValue(() => {
    return Math.round(scrollOffset.value / slideWidth);
  });
  const animatedBottomStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [0, 1, 2];

    const animatedBgColor = interpolateColor(input, inputRange, [
      onBoardingData[0].backgroundColor,
      onBoardingData[1].backgroundColor,
      onBoardingData[2].backgroundColor,
    ]);

    return {
      backgroundColor: animatedBgColor,
    };
  });

  const onNextSlide = useCallback(() => {
    scrollRef.current?.scrollTo({
      x: slideWidth * (activeIndexValue.value + 1),
    });
    setScrollState(prev => ({
      ...prev,
      activeIndex: activeIndexValue.value + 1,
    }));
  }, []);

  const onPrevSlide = useCallback(() => {
    scrollRef.current?.scrollTo({
      x: slideWidth * (activeIndexValue.value - 1),
    });
    setScrollState(prev => ({
      ...prev,
      activeIndex: activeIndexValue.value - 1,
    }));
  }, []);

  return (
    <CustomScreenContainer containerStyle={styles.container}>
      <>
        <View style={[styles.sliderContainer]}>
          <Animated.ScrollView
            contentContainerStyle={{}}
            style={[styles.slider]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            snapToInterval={slideWidth}
            decelerationRate="fast"
            onScroll={scrollHandler}
            // @ts-ignore
            ref={scrollRef}
            pagingEnabled={true}
            disableIntervalMomentum={false}
          >
            {onBoardingData.map((slide, slideIndex) => (
              <View
                key={`${slideIndex}`}
                style={[
                  styles.slideContainer,
                  {
                    paddingTop: safeAreaInset.top + 55,
                    backgroundColor: slide.backgroundColor,
                    justifyContent: "space-between",
                    paddingVertical: 30,
                  },
                ]}
              >
                <View style={styles.imageWrapper}>
                  <CustomSvgXml svg={slide.image} />
                </View>

                <View style={styles.dotContainer}>
                  {onBoardingData.map((dot, index) => (
                    <View
                      style={[
                        styles.dot,
                        slideIndex === index && {
                          backgroundColor: slide.titleColor,
                        },
                      ]}
                      key={`${index}`}
                    />
                  ))}
                </View>

                <View style={styles.textWrapper}>
                  <CustomText
                    style={[styles.slideTitle, { color: slide.titleColor }]}
                  >
                    {slide.title}
                  </CustomText>
                  <CustomText style={styles.slideDescription}>
                    {slide.description}
                  </CustomText>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
        <Animated.View style={[styles.bottomWrapper, animatedBottomStyle]}>
          {scrollState.activeIndex !== 2 ? (
            <View style={styles.horzBtns}>
              <Pressable
                style={styles.prevButton}
                onPress={onPrevSlide}
                disabled={scrollState.activeIndex === 0}
              >
                {scrollState.activeIndex === 0 && (
                  <CustomSvgXml svg={Onboarding1ArrowLeft} />
                )}
                {scrollState.activeIndex === 1 && (
                  <CustomSvgXml svg={Onboarding2ArrowLeft} />
                )}
              </Pressable>
              <Pressable style={styles.nextButton} onPress={onNextSlide}>
                <CustomText
                  style={[
                    styles.nextText,
                    {
                      color: onBoardingData[scrollState.activeIndex].titleColor,
                    },
                  ]}
                >
                  Next
                </CustomText>
                {scrollState.activeIndex === 0 && (
                  <CustomSvgXml svg={Onboarding1ArrowRight} />
                )}
                {scrollState.activeIndex === 1 && (
                  <CustomSvgXml svg={Onboarding2ArrowRight} />
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.vertBtns}>
              <CustomButton
                onPress={() =>
                  navigation.dispatch(
                    StackActions.replace(`CreateAccount`, {
                      showNavBarBackButton: false,
                    }),
                  )
                }
                title={"Sign Up"}
              />
              <CustomButton
                onPress={() =>
                  navigation.dispatch(StackActions.replace(`SignIn`))
                }
                title={"Sign In"}
                variant={"secondary"}
              />
            </View>
          )}
        </Animated.View>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
  },
  slider: {},
  slideContainer: {
    //
    height: screenHeight * 0.7,
    flex: 1,
    width: screenWidth,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: { rowGap: 12, paddingHorizontal: 20 },

  slideTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: GlobalStyles.fontFamily.grotesk.medium,
  },
  slideDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#222",
  },
  bottomWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 50,
  },
  horzBtns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevButton: {
    backgroundColor: "rgba(113, 135, 156, 0.10)s",
    width: 43,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "rgba(113, 135, 156, 0.10)s",
    width: 103,
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  nextText: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // columnGap: 8,
    width: 62,
    alignSelf: "center",
    paddings: 8,
    marginTop: 23,
    marginBottom: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#71879C",
  },
  sliderContainer: {
    // flex: 1,
  },
  vertBtns: {
    width: "100%",
    rowGap: 8,
  },
});

const onBoardingData: Array<{
  image: React.FC<SvgProps>;
  title: string;
  description: string;
  backgroundColor: string;
  titleColor: string;
}> = [
  {
    image: OnboardingImage1,
    title: "Quality assets",
    description:
      "Rise invests your money into the best dollar\ninvestments around the world.",
    backgroundColor: "#FEFAF7",
    titleColor: "#FE7122",
  },
  {
    image: OnboardingImage2,
    title: "Quality assets",
    description:
      "Our expert team and intelligent algorithms\nselect assets that beat the markets. \n",
    backgroundColor: "#FDF4F9",
    titleColor: "#B80074",
  },
  {
    image: OnboardingImage3,
    title: "Better Performance",
    description:
      "You earn more returns, achieve more of your\nfinancial goals and protect your money from\ndevaluation.\n",
    backgroundColor: "#F5FEFE",
    titleColor: "#0898A0",
  },
];
