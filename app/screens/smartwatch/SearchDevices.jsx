import { useContext, useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import List from "../../components/List";
import Loader from "../../components/Loader";
import Svg from "../../components/Svg";
import Text from "../../components/Text";
import colors from "../../tools/colors";
import { FontVariations } from "../../tools/fonts";
import svg from "../../tools/svg";
import Screen from "../Screen";
import { FontAwesome } from "@expo/vector-icons";
import Success from "../../components/Success";
import SCREEN_NAMES from "../../tools/screenNames";
import WatchModule, { eventEmitter } from "../../modules/WatchModule";
import EVENTS from "../../modules/Events";
import AppContext from "../../contexts/AppContext";
import { connectToWatch } from "../../modules/Listeners";
// import WatchModule from "../../modules/WatchModule";

const SearchDevices = ({ navigation }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foundDevices, setFoundDevices] = useState([]);
  const foundDevicesRef = useRef(foundDevices);
  const {
    isSmartWatchConnecting,
    setIsWatchConnecting,
    isSmartWatchConnected,
  } = useContext(AppContext);
  const toggleIsModalVisible = () => setIsModalVisible(!isModalVisible);
  const timeoutRef = useRef(null);
  const toggleSearching = () => setIsSearching(!isSearching);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const addDevice = (device) => {
    const foundDevices = foundDevicesRef.current.filter(
      (f) => f.address !== device.address
    );
    setFoundDevices([device, ...foundDevices]);
    foundDevicesRef.current = [device, ...foundDevices];
  };

  const startSearch = () => {
    if (isSearching) return;
    toggleSearching();
    resetTimeout();
    timeoutRef.current = setTimeout(stopSearch, 3000);
    WatchModule.startScan();
  };
  const stopSearch = () => {
    setIsSearching(false);
    resetTimeout();
    WatchModule.stopScan();
  };

  useEffect(() => {
    const ev1 = eventEmitter.addListener(EVENTS.DEVICE_FOUND, (device) => {
      addDevice(device);
    });

    startSearch();
    return () => {
      resetTimeout();
      ev1.remove();
    };
  }, []);

  const initConnectDevice = () => {
    stopSearch();
    connectToWatch(setIsWatchConnecting, selectedDevice);
  };

  useEffect(() => {
    if (isSmartWatchConnected) {
      setIsModalVisible(true);
    }
  }, [isSmartWatchConnected]);

  return (
    <Screen
      modalProps={{
        visible: isModalVisible,
        render: () => (
          <Success
            svgBg="transparent"
            rsvg={svg.filled.checkFull}
            closeModal={() => {
              toggleIsModalVisible();
              navigation.navigate(SCREEN_NAMES.SmartWatch.Vitals);
              WatchModule.startDetectHeart();
            }}
            title={"Device Connected"}
            note={`Connected to ${selectedDevice?.name}`}
          />
        ),
      }}
      scrollable={false}
      header={{
        title: "Search Device",
        navigation,
        renderRight: () => (
          <TouchableOpacity onPress={startSearch} style={styles.refresh}>
            {isSearching ? (
              <Loader loading color={colors.neurals.black} />
            ) : (
              <FontAwesome size={20} name="refresh" />
            )}
          </TouchableOpacity>
        ),
      }}
    >
      <View style={styles.watchs}>
        <List
          items={foundDevices}
          refreshControl={
            isSearching ? null : (
              <RefreshControl refreshing={false} onRefresh={startSearch} />
            )
          }
          renderItem={({ name, address }) => (
            <TouchableOpacity
              onPress={() => setSelectedDevice({ name, address })}
              style={[
                styles.watch,
                selectedDevice?.address === address ? styles.selected : {},
              ]}
            >
              <View style={styles.svg}>
                <Svg style={styles.svg_} source={svg.watch} />
              </View>
              <View>
                <Text style={styles.name} fontSize={12} color={colors.gray.g7}>
                  {name?.toUpperCase()}
                </Text>
                <Text
                  variation={FontVariations.Urbanist_700Bold}
                  color={colors.gray.g1}
                  fontSize={16}
                >
                  {address}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Button
        loading={isSmartWatchConnecting}
        onPress={initConnectDevice}
        style={styles.btn}
        disabled={!selectedDevice}
        title="Connect"
      />
    </Screen>
  );
};
export default SearchDevices;
const styles = StyleSheet.create({
  watchs: {
    flex: 1,
  },
  btn: {
    marginBottom: 36,
  },
  watch: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "transparent",
  },
  svg: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: colors.main.varients.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  selected: {
    borderColor: colors.main.primary,
  },
  name: {
    marginBottom: 5,
  },
  svg_: {
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
  refresh: {
    marginLeft: "auto",
  },
});
