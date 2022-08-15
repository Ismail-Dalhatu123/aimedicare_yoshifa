import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar as RSB,
} from "react-native";
import AppScroller from "../components/AppScroller";
import Header from "../components/Header";
import Modal from "../components/Modal";
import colors from "../tools/colors";

const Screen = ({
  children,
  style,
  statusBarStyle = "dark",
  screenStyle,
  header,
  scrollable = true,
  scrollProp = { min100: true, paddingHorizontal: 16 },
  modalProps,
  accent,
}) => {
  const [isOffSetting, setIsOffSetting] = useState(false);
  return (
    <>
      <SafeAreaView
        style={[styles.screen, screenStyle, accent ? styles.accent : {}]}
      >
        <StatusBar style={statusBarStyle} />
        {header ? (
          <Header {...header} style={{ paddingHorizontal: 16 }} />
        ) : (
          <></>
        )}
        <View
          style={[
            {
              ...styles.container,
              paddingHorizontal: scrollable ? 0 : 16,
              borderColor: colors.gray.g4,
              borderTopWidth: isOffSetting ? 1 : 0,
              // marginTop: 15,
            },
            style,
          ]}
        >
          {scrollable ? (
            <AppScroller
              isOffSetting={isOffSetting}
              setIsOffSetting={setIsOffSetting}
              {...scrollProp}
            >
              {children}
            </AppScroller>
          ) : (
            children
          )}
        </View>
      </SafeAreaView>
      <Modal {...modalProps} />
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neurals.white,
    paddingTop: Platform.OS === "android" ? RSB.currentHeight : 0,
  },
  container: {
    flex: 1,

    borderColor: colors.neurals.white,
  },
  accent: {
    backgroundColor: colors.gray.g6,
  },
});
