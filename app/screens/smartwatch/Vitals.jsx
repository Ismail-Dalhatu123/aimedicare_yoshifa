import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import colors from "../../tools/colors";
// import Screen from "../../Screen";
import watch from "../../assets/images/watch-sm.png";
import Text from "../../components/Text";
import Svg from "../../components/Svg";
import svg from "../../tools/svg";
import { FontVariations, TextAlign } from "../../tools/fonts";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import useScreen from "../../hooks/useScreen";
import CircularProgress from "../../components/CircularProgress";
import { vitals } from "../../tools/vitals";
import colors from "../../tools/colors";
import Screen from "../Screen";
import AppContext from "../../contexts/AppContext";
import store from "../../store";

const options = [
  {
    title: "Today",
  },
  {
    title: "Yesterday",
  },
  {
    title: "2 days ago",
  },
];

const ecgOptions = [
  {
    title: "HR",
    value: 76,
  },
  {
    title: "QT",
    value: 64,
  },
  {
    title: "HRV",
    value: 21,
  },
];

const Vitals = ({ navigation }) => {
  const [currentOption, setCurrentOption] = useState(options[0]);
  const { setUser } = useContext(AppContext);
  const logout = async () => {
    await store.removeData("playerId");
    setUser(null);
  };
  return (
    <Screen
      screenStyle={styles.screen}
      // header={{ title: "Vitals", navigation, style: styles.screen }}
    >
      {/* <View style={{ width: 600, height: 400, backgroundColor: "red" }}>
        <LineChart
          width={500}
          height={300}
          data={[
            { label: "S", x: 0, y: 0 },
            { label: "M", x: 1, y: 40 },
            { label: "T", x: 2, y: 30 },
            { label: "W", x: 3, y: 10 },
            { label: "TH", x: 4, y: 40 },
            { label: "F", x: 5, y: 50 },
            { label: "S", x: 6, y: 40 },
          ]}
          horizontalGuides={6}
          precision={0}
          verticalGuides={1}
        />
      </View> */}

      <View style={[styles.card, styles.deviceInfo]}>
        <View style={styles.watchImage}>
          <Image style={styles.image} source={watch} />
          <View style={styles.shade}></View>
        </View>
        <View>
          <Text>DIDOY2S</Text>
          <Text
            style={styles.connected}
            variation={FontVariations.Urbanist_600SemiBold}
            fontSize={20}
            color={colors.main.primary}
          >
            Connected
          </Text>
          <View style={styles.battery}>
            <Svg style={styles.batteryIcon} source={svg.battery} />
            <Text
              variation={FontVariations.Urbanist_600SemiBold}
              color={colors.neurals.black}
            >
              86%
            </Text>
          </View>
        </View>
      </View>
      <Button style={styles.testBtn} title="Run Quick Test" />
      <View style={styles.btns}>
        {options.map(({ title, ...props }, idx) => (
          <Button
            onPress={() => setCurrentOption({ ...props, title })}
            fontSize={14}
            outline={currentOption.title !== title}
            style={[styles.btn]}
            key={idx}
            title={title}
          />
        ))}
      </View>
      <View style={styles.cards}>
        {vitals.map(({ title, value, label, isECG, svg }, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, styles.vitalsCard, isECG ? styles.ecg : {}]}
          >
            <View style={styles.cardHead}>
              <View style={styles.cardSvg}>
                <Svg source={svg} />
              </View>
              <Text
                variation={FontVariations.Urbanist_600SemiBold}
                fontSize={14}
                color={colors.gray.g1}
              >
                {title}
              </Text>
              {isECG ? (
                <Text style={styles.lastCheck}>Last Checked 14:56:46</Text>
              ) : (
                <></>
              )}
            </View>
            <View style={styles.chart}>
              {isECG ? (
                <View></View>
              ) : (
                <CircularProgress
                  size={72}
                  strokeWidth={10}
                  progressPercent={0}
                />
              )}
            </View>
            {!isECG ? (
              <Text
                variation={FontVariations.Urbanist_600SemiBold}
                color={colors.main.primary}
                fontSize={16}
                textAlign={TextAlign.Center}
              >
                {value} <Text>{label}</Text>
              </Text>
            ) : (
              <View style={styles.ecgOptions}>
                {ecgOptions.map((o, idx) => (
                  <Text
                    key={idx}
                    variation={FontVariations.Urbanist_600SemiBold}
                    color={colors.main.primary}
                    fontSize={16}
                    textAlign={TextAlign.Center}
                  >
                    {o.value} <Text>{o.title}</Text>
                  </Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Button style={{ marginBottom: 20 }} onPress={logout} title="Logout" />
    </Screen>
  );
};
export default Vitals;
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.gray.g6,
  },
  deviceInfo: {
    width: "100%",
    height: 150,
    borderRadius: 32,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.neurals.white,
  },
  watchImage: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shade: {
    width: 80,
    height: 80,
    backgroundColor: colors.main.varients.primary,
    borderRadius: 40,
    position: "absolute",
  },
  image: {
    marginLeft: 3,
    marginTop: 2,
  },
  battery: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryIcon: {
    transform: [{ scale: 0.75 }],
    marginLeft: -5,
  },
  connected: {
    marginVertical: 5,
  },
  testBtn: {
    marginVertical: 20,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "32%",
    height: 38,
  },
  vitalsCard: {
    width: useScreen.subtractFromWidth(useScreen.getWidthPercentage(50) + 32),
    height: useScreen.subtractFromWidth(useScreen.getWidthPercentage(50) + 32),
    marginVertical: 15,
    padding: 12,
    borderRadius: 32,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ecg: {
    width: "100%",
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardSvg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.main.varients.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  chart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lastCheck: { marginLeft: "auto" },
  ecgOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
