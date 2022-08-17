import { StyleSheet } from "react-native";
import Svg from "../components/Svg";
import Text from "../components/Text";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import svg from "../tools/svg";
import Screen from "./Screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import store from "../store";
import urls from "../api/urls";
import useClient from "../hooks/useClient";

const SplashScreen = ({ setIsUserRestored, setUser }) => {
  const opacity = useSharedValue(0);
  const containerStyle = useAnimatedStyle(
    () => ({ opacity: opacity.value }),
    []
  );
  const { get } = useClient();

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
    const timeout = setTimeout(async () => {
      const id = await store.getData("playerId");
      if (!id) return setIsUserRestored(true);
      let details = await store.getData(urls.players.getById + id);
      if (!details) {
        const { data, error } = await get(urls.players.getById + id);
        if (error) return setIsUserRestored(true);
        console.log(data);
        details = data.data.players;
      }
      setUser(details.data.player);
      setIsUserRestored(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen scrollable={false} style={styles.screen}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Svg style={styles.svg} source={svg.logo} />
        <Text
          color={colors.gray.g1}
          variation={FontVariations.Urbanist_700Bold}
          fontSize={40}
        >
          AiMedicare
        </Text>
      </Animated.View>
    </Screen>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flexDirection: "row", alignItems: "center" },
  svg: { marginRight: 10 },
});
