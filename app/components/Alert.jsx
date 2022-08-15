import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import ENUMS from "../tools/enums";
import { FontAwesome } from "@expo/vector-icons";
import { FontVariations } from "../tools/fonts";
import Text from "./Text";
import { useEffect, useRef } from "react";

const bgColors = {
  [ENUMS.ERROR]: colors.alert.danger,
  [ENUMS.SUCCESS]: colors.alert.success,
  [ENUMS.INFO]: colors.alert.info,
  [ENUMS.WARN]: colors.alert.warning,
};
const icons = {
  [ENUMS.ERROR]: "warning",
  [ENUMS.SUCCESS]: "check-circle",
  [ENUMS.INFO]: "info-circle",
  [ENUMS.WARN]: "warning",
};

const Alert = ({ style, type, visible, message, remove, seconds = 3000 }) => {
  const timeoutRef = useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (visible) {
      timeoutRef.current = setTimeout(() => {
        if (typeof remove === "function") remove();
      }, seconds);
    }
  }, [visible]);

  useEffect(() => {
    return () => resetTimeout();
  }, []);

  if (!Object.values(ENUMS).includes(type) || !visible) return null;
  return (
    <View style={[styles.alert, style, { backgroundColor: bgColors[type] }]}>
      <Text
        variation={FontVariations.Urbanist_500Medium}
        color={colors.neurals.white}
        fontSize={16}
      >
        {message}
      </Text>
      <FontAwesome size={20} color={colors.neurals.white} name={icons[type]} />
    </View>
  );
};
export default Alert;
const styles = StyleSheet.create({
  alert: {
    width: "100%",
    padding: 20,
    zIndex: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
