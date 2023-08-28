import React from "react";
import { StyleSheet } from "react-native";
import { SvgProps, SvgXml } from "react-native-svg";

interface Props extends SvgProps {
  svg: React.FC<SvgProps>;
}

export default function CustomSvgXml(props: Props): JSX.Element {
  return <SvgXml xml={`${props.svg}`} {...props} />;
}

const styles = StyleSheet.create({
  container: {},
});
