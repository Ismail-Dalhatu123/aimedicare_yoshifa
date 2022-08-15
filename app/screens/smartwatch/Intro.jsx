import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Screen from "../../Screen";
import watch from "../../../assets/images/watch.png";
import colors from "../../../tools/colors";
import Text from "../../../components/Text";
import Switch from "../../../components/Switch";
import { FontVariations } from "../../../tools/fonts";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import SCREEN_NAMES from "../../../tools/screenNames";
import Alert from "../../../components/Alert";
import ENUMS from "../../../tools/enums";
import useScreen from "../../../hooks/useScreen";
import { requestPermissions } from "../../../utils/permissions";
import WatchModule from "../../../modules/WatchModule";

const Intro = ({ navigation }) => {
  const [showBluetoothOnAlert, setShowBluetoothOnAlert] = useState(false);
  const [showBluetoothOffAlert, setShowBluetoothOffAlert] = useState(false);
  const [isBluetoothSupported, setIsBluetoothSupported] = useState(true);
  const [isBluetoothOn, setIsBlutoothOn] = useState(false);

  const checkIsBluetoothSupported = async () => {
    const isSupported = await WatchModule.isBluetoothSupported();
    const isBluetoothOn = await WatchModule.isBluetoothEnabled();
    setIsBlutoothOn(isBluetoothOn);
    setIsBluetoothSupported(isSupported);
    if (Platform.OS === "android") {
      requestPermissions();
    }
  };

  useEffect(() => {
    checkIsBluetoothSupported();
  }, []);

  useEffect(() => {
    if (isBluetoothOn) {
      setShowBluetoothOnAlert(true);
    }
  }, [isBluetoothOn]);

  return (
    <Screen
      scrollable={false}
      header={{
        title: "Set up watch",
        navigation,
        renderRight: () => (
          <TouchableOpacity style={styles.skip}>
            <Text
              color={colors.main.primary}
              variation={FontVariations.Urbanist_600SemiBold}
            >
              Skip
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <View style={styles.watchContainer}>
        {!isBluetoothSupported ? (
          <View style={styles.bluetoothNotSupported}>
            <Text>Bluetooth not supported on this device</Text>
          </View>
        ) : (
          <></>
        )}
        <Image source={watch} style={styles.watch} />
      </View>
      <Text
        variation={FontVariations.Urbanist_600SemiBold}
        fontSize={23}
        color={colors.gray.g1}
      >
        Instructions
      </Text>
      <Text style={styles.more}>
        If the device battery is enough, and close to the cell phone still cant
        find the device, you can turn of the phone bluetooth and turn it on
        after a moment, and try searching again.
      </Text>
      <View style={styles.bluetoothSwith}>
        <Text
          fontSize={16}
          variation={FontVariations.Urbanist_600SemiBold}
          color={colors.gray.g1}
        >
          Bluetooth
        </Text>
        <Switch
          disabled={!isBluetoothSupported}
          onChange={(v) => {
            if (v) {
              WatchModule.turnOnBluetooth();
            } else {
              WatchModule.turnOffBluetooth();
            }
            setIsBlutoothOn(v);
            if (!v) {
              setShowBluetoothOffAlert(true);
            }
          }}
          on={isBluetoothOn}
        />
      </View>
      <Button
        onPress={() =>
          navigation.navigate(SCREEN_NAMES.SmartWatch.SearchDevices)
        }
        disabled={!isBluetoothOn}
        style={styles.btn}
        title="Scan for Devices"
      />
      <Alert
        seconds={1000}
        visible={showBluetoothOnAlert}
        remove={() => setShowBluetoothOnAlert(false)}
        style={styles.alert}
        type={ENUMS.INFO}
        message="Bluetooth turned on."
      />
      <Alert
        seconds={1000}
        visible={showBluetoothOffAlert}
        remove={() => setShowBluetoothOffAlert(false)}
        style={{ ...styles.alert, bottom: showBluetoothOnAlert ? 60 : 0 }}
        type={ENUMS.WARN}
        message="Bluetooth turned off."
      />
    </Screen>
  );
};
export default Intro;
const styles = StyleSheet.create({
  bluetoothSwith: {
    backgroundColor: colors.gray.g6,
    padding: 10,
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  skip: {
    marginLeft: "auto",
    padding: 6,
  },
  watchContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  btn: {
    marginTop: "auto",
    marginBottom: 32,
  },
  more: {
    marginTop: 10,
  },
  bluetoothNotSupported: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.alert.varients.danger,
    marginBottom: 10,
    position: "absolute",
    zIndex: 1,
    top: 10,
  },
  alert: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: useScreen.width,
  },
});
