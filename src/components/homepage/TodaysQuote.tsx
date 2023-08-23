import React from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";
import { imageAssets, svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { LinearGradient } from "react-native-linear-gradient";

interface Props {
  //
}

const { QuoteShareIcon } = svgAssets;
const { TealBg } = imageAssets;

export default function TodaysQuote(props: Props): JSX.Element {
  return (
    <View style={styles.quoteContainer}>
      <ImageBackground source={TealBg} style={styles.quoteBg}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.60)", "rgba(255, 255, 255, 0.60)"]}
          locations={[0, 1]}
          style={styles.quoteContent}
        >
          <CustomText style={styles.quoteHeading}>TODAY’S QUOTE</CustomText>
          <CustomText style={styles.quoteText}>
            We have no intention of rotating capital out of strong multi-year
            investments because they’ve recently done well or because ‘growth’
            has out performed ‘value’.
          </CustomText>
          <View style={styles.quoteBottom}>
            <CustomText style={styles.quoteAuthor}>Carl Sagan</CustomText>
            <Pressable style={styles.quoteShare}>
              <CustomSvgXml svg={QuoteShareIcon} />
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  quoteContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  quoteBg: {
    width: "100%",
  },
  quoteContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quoteHeading: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    marginBottom: 22.98,
    color: "#000000",
    opacity: 0.5,
  },
  quoteDivider: {
    borderColor: GlobalStyles.colors.white,
    borderWidth: 2,
    width: 30,
    marginVertical: 20,
  },
  quoteText: { color: "#222", marginBottom: 10 },
  quoteBottom: {
    color: GlobalStyles.colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quoteAuthor: {
    color: "#94A1AD",
    fontSize: 15,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
  },
  quoteShare: {
    backgroundColor: GlobalStyles.colors.white,
    width: 60.32,
    height: 63.06,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
