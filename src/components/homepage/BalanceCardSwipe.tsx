import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import { screenWidth } from "~utils/dimensions";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { GlobalStyles } from "~styles";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import { useFocusEffect } from "@react-navigation/native";
import authenticationApiRequests from "~services/authenticationRequests";
import { updateUserOnSession } from "~store/slices/authSlice";
import { updateWalletOnSession } from "~store/slices/walletSlice";

interface Props {
  //
}

const slideWidth = screenWidth - 40,
  slideHeight = 175;

const slides = [...Array(3).keys()];

const { GainsArrowIcon, BalanceEyeIcon } = svgAssets;

const BalanceCardSwipe = React.memo((props: Props): JSX.Element => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  const dispatch = useAppDispatch(),
    walletState = useAppSelector(state => state.wallet);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const onGetSessions = async () => {
        try {
          const res = await authenticationApiRequests.getSession();
          if (Boolean(res.data.id)) {
            const resData = {
              email_address: res.data.email_address,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              username: res.data.username,
              id: res.data.id,
              iat: res.data.iat,
              exp: res.data.exp,
            };
            dispatch(updateUserOnSession(resData));
            dispatch(
              updateWalletOnSession({
                total_balance: res.data.total_balance,
                total_returns: res.data.total_returns,
              }),
            );
          }
        } catch (err) {
          //
        }
      };

      onGetSessions();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.80)", "rgba(255, 255, 255, 0.00)"]}
      style={styles.container}
      locations={[0, 1]}
      useAngle={true}
      angle={156}
    >
      <View style={styles.content}>
        <Animated.ScrollView
          contentContainerStyle={styles.slide}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToInterval={slideWidth}
          decelerationRate="fast"
          onScroll={scrollHandler}
        >
          {slides.map((slide, index: number) => (
            <Animated.View style={styles.wrapper} key={`${index}`}>
              {/*title*/}
              <View style={styles.titleWrapper}>
                <CustomText style={styles.balance}>Total Balance</CustomText>
                <CustomSvgXml svg={BalanceEyeIcon} />
              </View>
              {/*amount*/}
              <View style={styles.titleWrapper}>
                <CustomText style={styles.amount}>
                  ${walletState.total_balance}
                </CustomText>
              </View>
              {/*desc*/}
              <View style={[styles.titleWrapper, { columnGap: 4 }]}>
                <CustomText style={styles.gain}>Total Balance</CustomText>
                <CustomSvgXml svg={GainsArrowIcon} />
                <CustomText fontSize={16}>0.00%</CustomText>
              </View>
            </Animated.View>
          ))}
        </Animated.ScrollView>
        <View style={styles.indicatorWarpper}>
          {slides.map((_, index) => {
            return (
              <Indicator
                key={index}
                index={index}
                scrollOffset={scrollOffset}
              />
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
});

export default BalanceCardSwipe;

const styles = StyleSheet.create({
  container: {
    height: 175,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.white,
  },
  content: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    rowGap: 12,
    width: screenWidth - 40,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
  },
  indicatorWarpper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    columnGap: 6,
  },
  balance: {
    fontSize: 15,
  },
  amount: {
    fontSize: 24,
    color: GlobalStyles.colors.text.title2,
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
  },
  gain: {
    fontSize: 15,
  },
});

const Indicator = ({ scrollOffset, index }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [index - 1, index, index + 1];
    const animatedColor = interpolateColor(input, inputRange, [
      "rgba(113, 135, 156, 0.20)",
      "#0898A0",
      "rgba(113, 135, 156, 0.20)",
    ]);

    return {
      width: interpolate(input, inputRange, [6, 12, 6], Extrapolate.CLAMP),
      backgroundColor: animatedColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 6,
          width: 6,
          borderRadius: 6,
          backgroundColor: GlobalStyles.colors.accent.teal001,
        },
        animatedStyle,
      ]}
    />
  );
};
