import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import CustomScreenContainer from "~components/general/CustomScreenContainer";
import StackScreensNavBar from "~components/general/StackScreensNavBar";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";

interface Props {
  //
}

const { ChevronRight } = svgAssets;

const banks = [
  {
    id: 1,
    accountName: "Elon Musk",
    accountNumber: "0123456789",
    bankName: "GTBank PLC",
  },
  {
    id: 2,
    accountName: "Mack Zuckerberg",
    accountNumber: "6145785229",
    bankName: "Fidelity Bank",
  },
];

export default function SelectBank(props: Props): JSX.Element {
  return (
    <CustomScreenContainer>
      <>
        <StackScreensNavBar title={"Select bank"} />
        <View style={styles.container}>
          {banks.map((bank, index) => {
            return (
              <>
                <View style={styles.item}>
                  <View style={{ rowGap: 2 }}>
                    <View style={styles.itemNameWrapper}>
                      <CustomText style={styles.accountNumber}>
                        {bank.accountNumber} •{" "}
                      </CustomText>
                      <CustomText style={styles.bankName}>
                        {bank.bankName}
                      </CustomText>
                    </View>
                    <CustomText style={styles.accountName}>
                      {bank.accountName}
                    </CustomText>
                  </View>
                  <CustomSvgXml svg={ChevronRight} />
                </View>
                <View style={styles.seperator} />
              </>
            );
          })}
        </View>
      </>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  itemNameWrapper: { flexDirection: "row" },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E1E8ED",
  },
  accountNumber: {
    color: "012224",
    fontSize: 15,
    lineHeight: 22,
  },
  accountName: {
    color: "012224",
    fontSize: 15,
    lineHeight: 22,
  },
  bankName: {},
});
