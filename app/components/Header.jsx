import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import Back from "./Back";
import Text from "./Text";

const Header = ({ navigation, style, renderRight, title }) => {
  return (
    <View style={[styles.header, style]}>
      <Back navigation={navigation} />
      <Text
        numberOfLines={1}
        variation={FontVariations.Urbanist_700Bold}
        color={colors.gray.g5}
        fontSize={23}
        style={{ marginBottom: 1, flex: 1 }}
      >
        {title}
      </Text>
      {typeof renderRight === "function" ? renderRight() : <></>}
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
