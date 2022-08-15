import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../../../components/Button";
import Svg from "../../../components/Svg";
import Text from "../../../components/Text";
import colors from "../../../tools/colors";
import { FontVariations } from "../../../tools/fonts";
import svg from "../../../tools/svg";
import Screen from "../../Screen";
import imageblack from "../../../assets/images/smart-watch/black.jpeg";
import imagered from "../../../assets/images/smart-watch/red.jpeg";
import imageblue from "../../../assets/images/smart-watch/blue.jpeg";
import useScreen from "../../../hooks/useScreen";
import Success from "../../../components/Success";
import SCREEN_NAMES from "../../../tools/screenNames";
import { Linking, Platform } from "react-native";

const handleOpenSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    Linking.openSettings();
  }
};

const dcolors = Object.values(colors.watchs);

const images = {
  [colors.watchs.black]: imageblack,
  [colors.watchs.blue]: imageblue,
  [colors.watchs.red]: imagered,
};

const DeviceColor = ({ navigation }) => {
  const [selcetedColor, setSelectedColor] = useState(colors.watchs.black);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalVisible = () => setIsModalVisible(!isModalVisible);
  return (
    <Screen
      modalProps={{
        visible: isModalVisible,
        render: () => (
          <Success
            closeModal={() => {
              toggleModalVisible();
              navigation.navigate(SCREEN_NAMES.SmartWatch.Vitals);
            }}
            svgBg="transparent"
            rsvg={svg.filled.checkFull}
            title="DIDOY2S"
            note="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
        ),
      }}
      header={{ title: "Device Color", navigation }}
    >
      <View style={styles.watch}>
        <View style={styles.image}>
          <Image
            style={styles.watchImage}
            resizeMode="contain"
            source={images[selcetedColor]}
          />
        </View>
        <Text
          fontSize={18}
          color={colors.gray.g1}
          variation={FontVariations.Urbanist_600SemiBold}
        >
          Choose your watch color
        </Text>
        <View style={styles.colors}>
          {dcolors.map((c, idx) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(c)}
              key={idx}
              style={[styles.watchColor, { backgroundColor: c }]}
            >
              {selcetedColor === c ? <Svg source={svg.checkCircle} /> : <></>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button
        onPress={toggleModalVisible}
        title="Continue"
        style={styles.btn}
      />
    </Screen>
  );
};

export default DeviceColor;
const styles = StyleSheet.create({
  btn: {
    marginBottom: 32,
  },
  watch: {
    flex: 1,
  },
  watchColor: {
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 16,
  },
  colors: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  watchImage: {
    width: useScreen.getWidthPercentage(80),
    height: useScreen.getWidthPercentage(80),
    // backgroundColor: "red",
  },
});
