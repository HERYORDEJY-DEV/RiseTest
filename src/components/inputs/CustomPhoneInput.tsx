import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "~styles";
import CustomText from "~components/general/CustomText";
import { svgAssets } from "~assets";
import CustomSvgXml from "~components/general/CustomSvgXml";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { screenHeight } from "~utils/dimensions";
import _ from "lodash";
import { CountriesWithFLag } from "~utils/countriesWithFLag";
import { SvgUri } from "react-native-svg";
import { CountryListType, CountryType } from "~types/utils";

interface Props extends TextInputProps {
  isError?: boolean;
  errorMessage?: Array<string | undefined>;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
  phone?: {
    dialCode: string;
    number: string;
  };
  onSelectCode?: (code: string) => void;
}

const {
  inputs: { PhoneChevronDown },
} = svgAssets;

export default function CustomPhoneInput(props: Props): JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [countries, setCountries] = useState<CountryListType>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryType>({
    dialCode: "",
    id: 0,
    name: "",
    isoCode: "",
    flagEmoji: "",
    flagSvg: "",
  });

  const errorMessages = props.errorMessage?.filter?.(message =>
      Boolean(message),
    ),
    isError = Boolean(errorMessages?.length);

  const focusRef = useRef(new Animated.Value(0)).current;
  const refList = useRef<FlatList>(null);

  const refRBSheet = useRef<RBSheet | null>(null);

  const animatedLabelFontSize = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });

  const animatedLabelColor = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [
      GlobalStyles.colors.inputs.label,
      GlobalStyles.colors.inputs.labelActive,
    ],
  });

  const animatedLabelContainerTopPosition = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -8],
  });

  const animatedLabelContainerLeftPosition = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 10],
  });

  const animatedLabelContainerHorzPadding = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const animatedBorderWidth = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const animatedBorderColor = focusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [
      GlobalStyles.colors.inputs.border,
      GlobalStyles.colors.inputs.borderActive,
    ],
  });

  const onChangeText = (text: string) => {
    setValue(text);
    props.onChangeText?.(text);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const keyExtractor = useCallback((item: CountryType, index: number) => {
    return `${index}`;
  }, []);

  const onSelectCountry = (country: CountryType) => {
    props.onSelectCode?.(country.dialCode);
    // setCode(country.dialCode);
    refRBSheet.current?.close();
    setSelectedCountry(country);
    setCountries(CountriesWithFLag);
  };

  const scrollIndex = () => {
    setTimeout(() => {
      if (refList && refList?.current) {
        const index = _.findIndex(
          countries,
          (e: CountryType) =>
            _.isEqual(selectedCountry.dialCode, _.get(e, "dialCode")) &&
            _.isEqual(selectedCountry.name, _.get(e, "name")),
        );
        if (index > -1 && index <= countries.length - 1) {
          refList?.current?.scrollToIndex({
            index: index,
            animated: false,
          });
        }
      }
    }, 200);
  };

  const getItemLayout = (data: any, index: number) => ({
    length: 35,
    offset: 35 * index,
    index,
  });
  const onSearchCountry = (query: string) => {
    if (!Boolean(query)) {
      return true;
    }
    const queriedCounties = CountriesWithFLag.filter(
      ({ name, dialCode }) =>
        `${name}`.toLowerCase().includes(`${query}`.toLowerCase()) ||
        `${dialCode}`.toLowerCase().includes(`${query}`.toLowerCase()),
    );
    setCountries(queriedCounties);
  };

  const renderItemCountryItem: ListRenderItem<CountryType> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onSelectCountry(item)}
      >
        <View style={styles.itemFlag}>
          <SvgUri width={20} height={20} uri={item.flagSvg} />
        </View>
        <CustomText style={styles.itemName}>{item.name}</CustomText>
        <CustomText style={styles.itemCode}>{item.dialCode}</CustomText>
      </TouchableOpacity>
    );
  };

  const renderSearchbar = (
    <View style={{ backgroundColor: "#FFF" }}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={onSearchCountry}
          style={styles.searchInput}
          placeholder={"Search Country"}
          placeholderTextColor={GlobalStyles.colors.accent.teal001}
        />
      </View>
    </View>
  );

  useEffect(() => {
    setCountries(CountriesWithFLag);

    Animated.timing(focusRef, {
      toValue: isFocused || Boolean(value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusRef, isFocused]);

  return (
    <>
      <View style={[styles.container, props.containerStyles]}>
        <Animated.View
          style={[
            styles.content,
            {
              borderWidth: animatedBorderWidth,
              borderColor: isError
                ? GlobalStyles.colors.inputs.error
                : animatedBorderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => refRBSheet.current?.open()}
          >
            <View style={[styles.flagWrap]}>
              <SvgUri width={20} height={20} uri={selectedCountry.flagSvg} />
            </View>
            <CustomText style={styles.code}>
              {!!selectedCountry.dialCode ? selectedCountry.dialCode : "+000"}
            </CustomText>
            <CustomSvgXml svg={PhoneChevronDown} />
            <View style={[styles.divider]} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            cursorColor={
              isError
                ? GlobalStyles.colors.inputs.error
                : GlobalStyles.colors.accent.teal001
            }
            {...props}
            style={[styles.input, props.inputStyles]}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            keyboardType={"phone-pad"}
          />
          <Animated.View
            style={[
              styles.labelContainer,
              {
                paddingHorizontal: animatedLabelContainerHorzPadding,
                left: animatedLabelContainerLeftPosition,
                top: props.value ? -9 : animatedLabelContainerTopPosition,
              },
            ]}
          >
            <Animated.Text
              onPress={() => inputRef?.current?.focus()}
              style={[
                styles.label,
                {
                  fontSize: props.value ? 10 : animatedLabelFontSize,
                  color: isError
                    ? GlobalStyles.colors.inputs.error
                    : animatedLabelColor,
                },
              ]}
            >
              {props.label ?? "Phone Number"}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        {isError && (
          <Animated.View style={[styles.errorWrapper]}>
            <CustomText style={styles.errorMessage}>
              {errorMessages?.join(". ")}*
            </CustomText>
          </Animated.View>
        )}
      </View>
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
        height={screenHeight * 0.7}
      >
        <FlatList
          ref={refList}
          data={countries}
          renderItem={renderItemCountryItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          ListHeaderComponent={renderSearchbar}
          stickyHeaderIndices={[0]}
          getItemLayout={getItemLayout}
        />
      </RBSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 15,
  },
  content: {
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.inputs.border,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    lineHeight: 22,
    fontSize: 15,
  },
  labelContainer: {
    position: "absolute",
    left: 120,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  label: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    fontSize: 15,
  },
  errorMessage: {
    fontSize: 12,
    color: GlobalStyles.colors.inputs.error,
  },
  errorWrapper: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  button: {
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginRight: 12,
  },
  flagWrap: {
    height: 18,
    width: 18,
    borderRadius: 18,
    backgroundColor: "#555",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    lineHeight: 25,
    fontSize: 23,
    position: "absolute",
    top: 0.5,
    left: -3,
    alignSelf: "center",
  },
  divider: { height: 34, width: 1, backgroundColor: "#E1E8ED" },
  code: {
    fontFamily: GlobalStyles.fontFamily.sans.bold,
    color: "#222",
    fontSize: 15,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: 20,
  },
  itemName: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 15,
    color: GlobalStyles.colors.text.title,
  },
  itemFlag: {
    flex: 0.05,
    color: GlobalStyles.colors.text.title,
  },
  itemCode: {
    fontSize: 15,
    color: GlobalStyles.colors.text.title,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E1E8ED",
  },
  searchBar: {
    height: 35,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: GlobalStyles.colors.inputs.borderActive,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  searchInput: {
    fontSize: 12,
    paddingHorizontal: 0,
  },
});
