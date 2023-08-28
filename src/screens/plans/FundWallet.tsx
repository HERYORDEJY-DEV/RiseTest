import RBSheet from "@nonam4/react-native-bottom-sheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useRef } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { svgAssets } from "~assets";
import CustomButton from "~components/general/CustomButton";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import StackScreensNavBar from "~components/general/StackScreensNavBar";
import { useQueryBankRates } from "~hooks/useQueryBankRates";
import { useAppDispatch, useAppSelector } from "~hooks/useStore";
import generalApiRequests from "~services/generalRequests";
import { updateQuote } from "~store/slices/generalSlice";
import { GlobalStyles } from "~styles";
import { MainNavigationParamList } from "~types/navigation";
import { FundWalletType } from "~types/plans";
import { screenHeight } from "~utils/dimensions";
import { formatAmount } from "~utils/get-greeting";

interface Props {
  //
}

const {
  UsdCardIcon,
  CardIcon,
  BankIcon,
  BitcoinIcon,
  NairaBankIcon,
  CloseIcon,
} = svgAssets;

// const {}

export default function FundWallet(props: Props): React.JSX.Element {
  const bankRatesQuery = useQueryBankRates();
  const refRBSheet = useRef<RBSheet | null>(null);
  const dispatch = useAppDispatch(),
    bankRate = useAppSelector(state => state.general.rates);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainNavigationParamList, "FundWallet">
    >();

  const fundWalletData: Array<FundWalletType> = [
    {
      icon: BankIcon,
      title: "Naira Bank Transfer",
      timeline: "15 mins",
      rate: bankRate.sell_rate,
      fee: 1.5,
    },
    {
      icon: CardIcon,
      title: "Naira Debit card",
      timeline: "15 mins",
      rate: bankRate.sell_rate,
      fee: 1.5,
    },
    {
      icon: NairaBankIcon,
      title: "Naira Debit Card",
      timeline: "15 mins",
      fee: 0.5,
      rate: bankRate.sell_rate,
    },
    {
      icon: BitcoinIcon,
      title: "Crypto",
      timeline: "15 mins",
      fee: 1,
    },
  ];

  const keyExtractor = useCallback((item: FundWalletType, index: number) => {
    return `${index}`;
  }, []);

  const renderItem: ListRenderItem<FundWalletType> = useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={styles.item}
        >
          <View style={styles.icon}>
            <CustomSvgXml svg={item.icon} />
          </View>

          <View style={styles.body}>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText style={styles.timeline}>
              Timeline - {item.timeline}
            </CustomText>
          </View>

          <View style={styles.right}>
            <View style={{}}>
              {/*{item.rate && (*/}
              <CustomText style={styles.rate}>
                {Boolean(item?.rate) ? `Rate - $1 = ${item.rate}` : ""}
              </CustomText>
              {/*)}*/}
            </View>
            <CustomText style={styles.fee}>Fee - {item.fee}%</CustomText>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const onGetRate = async () => {
        try {
          const res = await generalApiRequests.getBankRates();
          dispatch(updateQuote(res.data));
        } catch (err) {
          //
        }
      };

      onGetRate();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <CustomScreenContainer>
      <>
        <StackScreensNavBar title={"Fund Wallet"} showCloseButton={true} />
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={fundWalletData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {},
            draggableIcon: {
              backgroundColor: "#CCC",
            },
            container: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          }}
          closeOnPressBack={true}
          height={screenHeight * 0.6}
        >
          <View style={styles.sheetWrapper}>
            <View style={styles.sheetHeader}>
              <Pressable
                style={styles.backButton}
                onPress={refRBSheet.current?.open}
              >
                <CustomSvgXml svg={CloseIcon} />
              </Pressable>

              <CustomText variant={"heading"} style={styles.sheetHeaderTitle}>
                About Exchange Rates
              </CustomText>
              <View
                style={[styles.backButton, { backgroundColor: "transparent" }]}
              ></View>
            </View>

            <View style={styles.sheetItemWrapper}>
              <View style={styles.seperator} />
              <View style={styles.sheetItem}>
                <View style={styles.sheetItemLeft}>
                  <CustomText style={styles.sheetItemTitle}>
                    USD Buy Rate
                  </CustomText>
                  <CustomText style={styles.sheetItemDesc}>
                    We buy US dollars at this rate
                  </CustomText>
                </View>
                <CustomText style={styles.sheetItemAmount}>
                  {formatAmount(1234, true)}
                </CustomText>
              </View>
              <View style={styles.seperator} />
              <View style={styles.sheetItem}>
                <View style={styles.sheetItemLeft}>
                  <CustomText style={styles.sheetItemTitle}>
                    USD Buy Rate
                  </CustomText>
                  <CustomText style={styles.sheetItemDesc}>
                    We buy US dollars at this rate
                  </CustomText>
                </View>
                <CustomText style={styles.sheetItemAmount}>
                  {formatAmount(1234, true)}
                </CustomText>
              </View>
              <View style={styles.seperator} />
            </View>

            <View style={styles.infoTextWrapper}>
              <CustomText style={styles.infoText}>
                These exhange rates are provided by independent third parties
                who handle fund conversions at the prevailing parallel rates and
                are not set, or controlled or by Rise. They are subject to
                change based on market trends.
              </CustomText>
            </View>
            <CustomButton
              onPress={() => {
                refRBSheet.current?.close();
                navigation.navigate("ChoosePlanToFund");
              }}
              title={"Accept & Continue"}
            />
          </View>
        </RBSheet>
      </>
    </CustomScreenContainer>
  );
}

//

const styles = StyleSheet.create({
  container: {
    //
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E1E8ED",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  icon: {
    backgroundColor: "rgba(113, 135, 156, 0.10)",
    height: 42,
    width: 42,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    rowGap: 2,
  },
  right: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  fee: {
    textAlign: "right",
    fontSize: 13,
  },
  rate: {
    textAlign: "right",
    fontSize: 13,
  },
  timeline: {
    fontSize: 13,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.title,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.10)",
  },
  sheetWrapper: {
    padding: 20,
    rowGap: 24,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetHeaderTitle: {
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
    fontSize: 20,
  },
  sheetItemWrapper: {
    // paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },
  sheetItem: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sheetItemLeft: {
    rowGap: 2,
  },
  sheetItemTitle: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.title,
  },
  sheetItemDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  sheetItemAmount: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.title,
  },
  infoTextWrapper: {},
});
