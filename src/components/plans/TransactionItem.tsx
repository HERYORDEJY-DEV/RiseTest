import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { format } from "date-fns";
import { formatAmount } from "~utils/get-greeting";
import { GlobalStyles } from "~styles";

interface Props {
  id: number;
  title: string;
  amount: number;
  date: Date;
  type: string;
}

const {
  plans: { TransactionInIcon, TransactionOutIcon },
} = svgAssets;

export default function TransactionItem(props: Props): React.JSX.Element {
  const isTransactionIn = props.type === "in";
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor:
              props.type === "in"
                ? "rgba(76, 217, 100, 0.15)"
                : props.type === "out"
                ? "rgba(235, 87, 87, 0.15)"
                : "transparent",
          },
        ]}
      >
        {props.type && (
          <CustomSvgXml
            svg={isTransactionIn ? TransactionInIcon : TransactionOutIcon}
          />
        )}
      </View>
      <View style={styles.body}>
        <CustomText style={styles.title}>{props.title}</CustomText>
        {props.date && (
          <CustomText style={styles.date}>
            {format(props.date, "MMM do, yyyy")}
          </CustomText>
        )}
      </View>

      <View>
        {props.type && (
          <CustomText variant={"heading"} style={styles.amount}>
            {isTransactionIn ? "+" : "-"} {formatAmount(props.amount, "$")}
          </CustomText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: "rgba(76, 217, 100, 0.15)",
    marginRight: 11,
  },
  amount: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.title2,
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.text.title2,
  },
  date: {
    fontSize: 13,
    lineHeight: 19,
  },
  body: {
    flex: 1,
  },
});
