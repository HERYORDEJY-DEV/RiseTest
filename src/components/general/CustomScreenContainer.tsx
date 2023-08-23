import React from "react";
import {
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends StatusBarProps {
  children: React.JSX.Element;
  containerStyle: ViewStyle;
}

export default function CustomScreenContainer(props: Props): React.JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInset.top },
        props.containerStyle,
      ]}
    >
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={props.barStyle ?? "dark-content"}
      />
      <View style={styles.content}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: GlobalStyles.colors.screen.background,
  },
  content: {
    flex: 1,
  },
});
