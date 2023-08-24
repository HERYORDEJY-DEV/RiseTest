import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import { getGreetingOfDay } from "~utils/get-greeting";
import { imageAssets, svgAssets } from "~assets";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalStyles } from "~styles";
import BalanceCardSwipe from "~components/homepage/BalanceCardSwipe";
import CustomButton from "~components/buttons/CustomButton";
import YourPlansSwipe from "~components/homepage/YourPlansSwipe";
import CustomSvgXml from "~components/general/CustomSvgXml";
import TodaysQuote from "~components/homepage/TodaysQuote";

interface Props {
  //
}

const { NotificationIcon, PlusIcon, NeedHelpIcon, ScreenRiseIcon } = svgAssets;
const { HomepageGradBg } = imageAssets;

export default function Homepage(props: Props): JSX.Element {
  const greetingOfDay = getGreetingOfDay();
  const safeAreaInset = useSafeAreaInsets();

  return (
    <CustomScreenContainer containerStyle={{ paddingTop: 0 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* bg */}
        <View style={styles.bgOverlay}>
          <Image source={HomepageGradBg} style={styles.imageOverlay} />
        </View>
        {/* nav bar */}
        <View style={[styles.navBar, { marginTop: safeAreaInset.top + 14.5 }]}>
          <View style={styles.navBarLeft}>
            <Text style={styles.greeting}>{greetingOfDay}</Text>
            <Text style={styles.name}>Yusuf</Text>
          </View>
          <View style={styles.navBarRight}>
            <Pressable style={styles.bonusButton}>
              <Text style={styles.bonusDesc}>Get 3% bonus</Text>
            </Pressable>
            <Pressable style={styles.notificationBtn}>
              <CustomSvgXml svg={NotificationIcon} />
            </Pressable>
          </View>
        </View>

        {/* balance swipe*/}
        <View style={styles.balanceSwipeWrapper}>
          <BalanceCardSwipe />

          <CustomButton
            variant={"secondary"}
            title={"Add balance"}
            onPress={() => {}}
            containerStyle={styles.addBalanceButton}
            leftElement={<SvgXml xml={`${PlusIcon}`} />}
          />
        </View>

        <View style={styles.planWrapper}>
          {/* your plans*/}
          <YourPlansSwipe />

          {/*   need help */}
          <View style={styles.needHelpWrapper}>
            <View style={styles.needHelp}>
              <CustomSvgXml svg={NeedHelpIcon} />
              <Text style={{ color: "#171C22" }}>Need help?</Text>
            </View>
            <CustomButton
              variant={"primary"}
              title={"Contact us"}
              onPress={() => {}}
              containerStyle={styles.contactUsButton}
            />
          </View>
        </View>

        {/* todays'y quote */}
        <TodaysQuote />
        <View style={styles.logoWrapper}>
          <CustomSvgXml svg={ScreenRiseIcon} />
        </View>
      </ScrollView>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  navBar: {
    paddingHorizontal: GlobalStyles.spacing.ScreenPadding,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBarLeft: {},
  navBarRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  },
  bonusDesc: {
    color: GlobalStyles.colors.white,
  },
  bonusButton: {
    backgroundColor: GlobalStyles.colors.accent.teal001,
    padding: 8,
    borderRadius: 16,
  },
  greeting: {
    color: GlobalStyles.colors.gray1s,
    fontFamily: "DM Sans",
    fontSize: 15,
    lineHeight: 22,
  },
  name: {
    color: GlobalStyles.colors.gray1s,
    fontFamily: "DM Sans",
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  notificationBtn: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: 500,
    height: 376,
    alignSelf: "center",
    flex: 1,
    top: 0,
    left: "auto",
    right: "auto",
  },
  imageOverlay: { flex: 1, width: undefined, height: undefined },
  balanceSwipeWrapper: {
    padding: GlobalStyles.spacing.ScreenPadding,
    rowGap: 24,
    marginBottom: 31,
  },
  planWrapper: {
    rowGap: 31,
  },
  addBalanceButton: {
    height: 54,
    backgroundColor: GlobalStyles.colors.white,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.offWhitesLight,
  },
  needHelpWrapper: {
    marginHorizontal: 20,
    marginBottom: 31,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 66,
    shadowColor: "rgb(53, 71, 89)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  contactUsButton: {
    flex: 0.5,
    height: 42,
  },
  needHelp: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  quoteWrapper: {},
  logoWrapper: {
    marginVertical: 32,
    alignItems: "center",
  },
});
