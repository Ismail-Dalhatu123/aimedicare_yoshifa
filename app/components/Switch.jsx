import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../tools/colors";
import Loader from "./Loader";

const Switch = ({ onChange, on, loading, disabled }) => {
  const [isOn, setIsOn] = useState(false);
  const toggleOn = () => {
    if (typeof onChange === "function") onChange(!isOn);
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (on && !isOn) setIsOn(true);
  }, [on]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={toggleOn}
      style={[styles.container, isOn ? styles.on : {}]}
    >
      {loading ? (
        <Loader loading />
      ) : (
        <View style={[styles.ball, isOn ? styles.ballOn : {}]}></View>
      )}
    </TouchableOpacity>
  );
};
export default Switch;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray.g8,
    padding: 2,
    borderRadius: 20,
    width: 50,
    height: 28,
  },
  on: {
    backgroundColor: colors.main.primary,
  },
  ball: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neurals.white,
  },
  ballOn: {
    marginLeft: "auto",
  },
});
