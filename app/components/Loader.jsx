import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import svg from "../tools/svg";
import Svg from "./Svg";
import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useEffect } from "react";
// import colors from "../utils/colors";

export default function Loader({
  loading = true,
  withStatus,
  color = colors.neurals.white,
  style = {},
}) {
  const rotate = useSharedValue(0);
  const loaderStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotate.value}deg` }],
    }),
    []
  );

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 700 }), -1, true);
  }, []);

  if (!loading) return null;

  return (
    <View style={[styles.loader, style]}>
      {withStatus && <StatusBar style="dark" />}
      <Animated.View style={[styles.view, loaderStyle]}>
        <Svg source={svg.loader.replace("{{stroke}}", color)} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    alignSelf: "flex-end",
  },
});
