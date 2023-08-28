import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";

interface Props {
  onKeyPress: (e: string) => void;
  onClear: () => void;
  containerStyle?: ViewStyle;
}

const { NumberPadClearIcon } = svgAssets;

export default function CustomNumberPad(props: Props): JSX.Element {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {/* row 2 */}
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("1")}>
          <CustomText style={styles.text}>1</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("2")}>
          <CustomText style={styles.text}>2</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("3")}>
          <CustomText style={styles.text}>3</CustomText>
        </Pressable>
      </View>

      {/* row 2 */}
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("4")}>
          <CustomText style={styles.text}>4</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("5")}>
          <CustomText style={styles.text}>5</CustomText>
        </Pressable>
        <Pressable style={styles.button}>
          <CustomText style={styles.text} onPress={() => props.onKeyPress("6")}>
            6
          </CustomText>
        </Pressable>
      </View>

      {/* row 3 */}
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("7")}>
          <CustomText style={styles.text}>7</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("8")}>
          <CustomText style={styles.text}>8</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("9")}>
          <CustomText style={styles.text}>9</CustomText>
        </Pressable>
      </View>

      {/* row 3 */}
      <View style={styles.row}>
        <Pressable style={styles.button}>
          <CustomText style={styles.text}>.</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => props.onKeyPress("0")}>
          <CustomText style={styles.text}>0</CustomText>
        </Pressable>
        <Pressable style={styles.button} onPress={props.onClear}>
          <CustomSvgXml svg={NumberPadClearIcon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  row: {
    flexDirection: "row",
    columnGap: 32,
    justifyContent: "space-between",
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(113, 135, 156, 0.10)",
  },
  text: {
    fontFamily: GlobalStyles.fontFamily.grotesk.bold,
    color: "#0898A0",
    fontSize: 30,
  },
});
