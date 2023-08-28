import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { svgAssets } from "~assets";
import CustomText from "~components/general/CustomText";
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  TabBarIndicatorProps,
  TabBarItemProps,
  TabScreenValue,
  toBottomBarRouteName,
} from "~types/navigation";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { GlobalStyles } from "~styles";

const {
  navTab: { HomeTabIcon, PlansTabIcon, WalletTabIcon, FeedTabIcon },
} = svgAssets;
const { width: windowWidth } = Dimensions.get("window");

function getIcon({
  title,
  isSelected,
}: {
  title: string;
  isSelected: boolean;
}) {
  switch (title) {
    case "Home":
      return isSelected ? (
        <CustomSvgXml svg={HomeTabIcon} />
      ) : (
        <CustomSvgXml svg={HomeTabIcon} />
      );

    case "Plans":
      return isSelected ? (
        <CustomSvgXml svg={PlansTabIcon} />
      ) : (
        <CustomSvgXml svg={PlansTabIcon} />
      );

    case "Wallet":
      return isSelected ? (
        <CustomSvgXml svg={WalletTabIcon} />
      ) : (
        <CustomSvgXml svg={WalletTabIcon} />
      );

    case "Feed":
      return isSelected ? (
        <CustomSvgXml svg={FeedTabIcon} />
      ) : (
        <CustomSvgXml svg={FeedTabIcon} />
      );

    case "Account":
      return (
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </View>
      );

    default:
      return null;
  }
}

const TabBarIndicator = ({ tabCount, animatedStyle }: TabBarIndicatorProps) => {
  return (
    <Animated.View
      style={[
        {
          height: 8.489,
          width: 8.489,
          backgroundColor: GlobalStyles.colors.accent.teal002,
          borderRadius: 8.489,
        },
        animatedStyle,
      ]}
    />
  );
};

const TabBarItem = ({
  title,
  isSelected,
  onPress,
  routeNames,
  animatedStyle,
}: TabBarItemProps) => {
  const icon = getIcon({ title, isSelected });
  return (
    <>
      <Pressable style={styles.tabBarItemContainer} onPress={onPress}>
        <View style={styles.iconsWrapper}>{icon}</View>
        <View style={styles.titleWrapper}>
          {!isSelected && (
            <CustomText style={styles.tabBarItemSelected}>{title}</CustomText>
          )}
        </View>
      </Pressable>
    </>
  );
};

type BottomTabBarProps = ReactNavigationBottomTabBarProps;

const CustomBottomTabBar = ({
  state: { routeNames, index: selectedTab },
  navigation,
}: BottomTabBarProps) => {
  const tabWidth = windowWidth / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }],
  }));
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={{ height: 90 }}>
      <SafeAreaView edges={["bottom"]}>
        <View
          style={[
            styles.tabsContainer,
            { height: 90 - bottom, alignItems: "center" },
          ]}
        >
          {routeNames.map((routeName, index) => (
            <TabBarItem
              key={`${index}`}
              routeNames={routeNames}
              animatedStyle={animatedStyle}
              key={routeName}
              title={toBottomBarRouteName(routeName as TabScreenValue)}
              isSelected={selectedTab === index}
              onPress={() => navigation.navigate(routeName)}
            />
          ))}
        </View>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: tabWidth,
            bottom: bottom === 0 ? 20 : 40,
          }}
        >
          <TabBarIndicator
            tabCount={routeNames.length}
            animatedStyle={animatedStyle}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomBottomTabBar;

export const styles = StyleSheet.create({
  bottomtabar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  bottomTabButton: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  avatarWrapper: {
    width: 24,
    height: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  avatar: {
    flex: 1,
  },
  tabBarItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarItemSelected: { fontSize: 12, color: "#94A1AD" },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#E4E7EB",
  },
  iconsWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    height: 16,
  },
});
