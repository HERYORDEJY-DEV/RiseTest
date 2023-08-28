import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { imageAssets, svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import generalApiRequests from "~services/generalRequests";
import { updateQuote } from "~store/slices/generalSlice";
import { GlobalStyles } from "~styles";

interface Props {
  //
}

const { QuoteShareIcon } = svgAssets;
const { TealBg } = imageAssets;

export default function TodaysQuote(props: Props): JSX.Element {
  const dispatch = useAppDispatch(),
    todaysQuote = useAppSelector(state => state.general.quote);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const onGetTodayQuote = async () => {
        try {
          const res = await generalApiRequests.getTodaysQuote();
          dispatch(updateQuote(res.data));
        } catch (err) {
          //
        }
      };

      onGetTodayQuote();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={styles.quoteContainer}>
      <View style={styles.quoteContent}>
        <CustomText style={styles.quoteHeading}>TODAY’S QUOTE</CustomText>
        <CustomText style={styles.quoteText}>{todaysQuote.quote}</CustomText>
        <View style={styles.quoteBottom}>
          <CustomText style={styles.quoteAuthor}>
            {todaysQuote.author}
          </CustomText>
          <Pressable style={styles.quoteShare}>
            <CustomSvgXml svg={QuoteShareIcon} />
          </Pressable>
        </View>
      </View>
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
    backgroundColor: "rgba(64, 187, 195, 0.15)",
  },
  quoteBg: {
    width: "100%",
  },
  quoteContent: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: GlobalStyles.colors.accent.teal001,
    borderColor: GlobalStyles.colors.accent.teal002,
    borderWidth: 2,
  },
  quoteHeading: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    marginBottom: 22.98,
    color: "#FFFFFF",
  },
  quoteDivider: {
    borderColor: GlobalStyles.colors.white,
    borderWidth: 2,
    width: 30,
    marginVertical: 20,
  },
  quoteText: { color: "#FFFFFF", marginBottom: 10 },
  quoteBottom: {
    color: GlobalStyles.colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quoteAuthor: {
    color: "#FFFFFF",
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
