import { View } from "react-native";
import colors from "../tools/colors";
import { FontVariations, TextAlign } from "../tools/fonts";
import svg from "../tools/svg";
import Svg from "./Svg";
import Text from "./Text";
const Oops = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Svg source={svg.oops} />
      <Text
        textAlign={TextAlign.Center}
        fontSize={30}
        color={colors.gray.g3}
        variation={FontVariations.Urbanist_900Black}
      >
        Oops...
      </Text>
    </View>
  );
};
export default Oops;
