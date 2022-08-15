import { View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import Text from "./Text";

const getText = () => {
  const hours = new Date().getHours();
  return hours <= 11 ? "Morning" : hours <= 18 ? "Afternoon" : "Evening";
};

const Greetings = ({ style }) => {
  return (
    <View style={style}>
      <Text fontSize={14} color={colors.gray.g7}>
        Good {getText()},
      </Text>
      <Text
        variation={FontVariations.Urbanist_700Bold}
        fontSize={21}
        color={colors.gray.g5}
      >
        Ismail Dalhatu
      </Text>
    </View>
  );
};
export default Greetings;
