import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import STACK_NAMES from "../tools/stackNames";
import svg from "../tools/svg";
import Svg from "./Svg";
import Text from "./Text";

const tabs = [
  {
    title: "Home",
    target: STACK_NAMES.Home,
    svgs: {
      active: svg.tab.home.active,
      outline: svg.tab.home.outline,
    },
  },
  {
    title: "Appointment",
    target: STACK_NAMES.Appointments,
    svgs: {
      active: svg.tab.appointment.active,
      outline: svg.tab.appointment.outline,
    },
  },
  {
    title: "Explore",
    target: STACK_NAMES.Explore,
    svgs: {
      active: svg.tab.search.active,
      outline: svg.tab.search.outline,
    },
  },
  {
    title: "Messaging",
    target: STACK_NAMES.Messaging,
    svgs: {
      active: svg.tab.messaging.active,
      outline: svg.tab.messaging.outline,
    },
  },
  //   {
  //     title: "Activity",
  //     target: STACK_NAMES.Activity,
  //     svgs: {
  //       active: svg.tab.activity.active,
  //       outline: svg.tab.activity.outline,
  //     },
  //   },
  {
    title: "Profile",
    target: STACK_NAMES.Profile,
    svgs: {
      active: svg.tab.profile.active,
      outline: svg.tab.profile.outline,
    },
  },
];

const Tab = ({ active = STACK_NAMES.Home, navigation }) => {
  return (
    <View style={styles.tab}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.list}>
          {tabs.map(({ target, title, svgs }, idx) => (
            <TouchableOpacity
              onPress={() => {
                if (active === target) return;
                navigation.navigate(target);
              }}
              key={idx}
              style={styles.tanItem}
            >
              <Svg
                style={styles.tabSvg}
                source={active === target ? svgs.active : svgs.outline}
              />
              <Text
                variation={
                  active === target
                    ? FontVariations.Urbanist_700Bold
                    : FontVariations.Urbanist_500Medium
                }
                color={active === target ? colors.main.primary : colors.gray.g2}
                fontSize={10}
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Tab;
const styles = StyleSheet.create({
  tab: {
    width: "100%",
    height: Platform.OS === "ios" ? 90 : 70,
    backgroundColor: colors.neurals.white,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    shadowColor: colors.gray.g4,
    elevation: 14,
  },
  tanItem: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  list: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  safeArea: {},
  tabSvg: {
    marginBottom: 5,
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
});
