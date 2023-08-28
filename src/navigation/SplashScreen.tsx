import React, { useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";
import CustomText from "~components/general/CustomText";
import { GlobalStyles } from "~styles";
import { imageAssets, svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import { calcNormalLineHeight } from "~styles/constants";

interface Props {
  isAppReady: boolean;
}

enum SplashState {
  LOADING_IMAGE = "LOADING_IMAGE",
  FADE_IN_IMAGE = "FADE_IN_IMAGE",
  WAIT_FOR_APP_TO_BE_READY = "WAIT_FOR_APP_TO_BE_READY",
  FADE_OUT = "FADE_OUT",
  HIDDEN = "HIDDEN",
}

const { SplashLogo } = svgAssets,
  { SplashLogo: SplashLogoImage } = imageAssets;

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

export default function SplashScreen(props: Props): React.JSX.Element | null {
  // const safeAreaInset = useSafeAreaInsets();
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<SplashState>(SplashState.LOADING_IMAGE);

  useEffect(() => {
    if (state === SplashState.FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === SplashState.WAIT_FOR_APP_TO_BE_READY) {
      if (props.isAppReady) {
        setState(SplashState.FADE_OUT);
      }
    }
  }, [props.isAppReady, state]);

  useEffect(() => {
    if (state === SplashState.FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === SplashState.HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[styles.container, { opacity: containerOpacity }]}
    >
      <StatusBar
        backgroundColor={"transparent"}
        barStyle={"light-content"}
        translucent={true}
      />

      <Animated.View style={styles.top}>
        <CustomSvgXml
          svg={SplashLogo}
          onLayout={() => setState(SplashState.FADE_IN_IMAGE)}
        />
        <CustomText style={styles.slogan}>
          Dollar investments that{"\n"}help you grow{" "}
        </CustomText>
      </Animated.View>

      <Animated.View style={[styles.bottom]}>
        <CustomText style={styles.copywright}>
          All rights reserved{"\n"}(c) 2021
        </CustomText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: GlobalStyles.colors.accent.teal001,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GlobalStyles.colors.accent.teal001,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  slogan: {
    color: GlobalStyles.colors.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 35,
    lineHeight: calcNormalLineHeight(18),
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
    letterSpacing: -0.36,
  },
  copywright: {
    color: GlobalStyles.colors.white,
    fontSize: 12,
    textAlign: "center",
    lineHeight: calcNormalLineHeight(12),
    fontFamily: GlobalStyles.fontFamily.grotesk.regular,
  },
  top: {
    paddingTop: 125,
    alignItems: "center",
    flex: 1,
  },
  bottom: {
    alignItems: "center",
    paddingBottom: 50,
  },
});

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady && children}

      <SplashScreen isAppReady={isAppReady} />
    </>
  );
}
