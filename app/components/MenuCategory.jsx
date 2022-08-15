import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations, TextAlign } from "../tools/fonts";
import Svg from "./Svg";
import Text from "./Text";

const MenuCategory = ({ navigation, svg, title, target }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(target)}
      style={styles.menu}
    >
      <View style={styles.svg}>
        <Svg source={svg} />
      </View>
      <Text
        variation={FontVariations.Urbanist_700Bold}
        color={colors.gray.g7}
        textAlign={TextAlign.Center}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default MenuCategory;
const styles = StyleSheet.create({
  menu: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  svg: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.varients.primary,
    width: "80%",
    aspectRatio: 1,
    borderRadius: 20,
    marginBottom: 10,
  },
});
