import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import SCREEN_NAMES from "../tools/screenNames";
import Button from "./Button";
import Question from "./Question";
import Text from "./Text";

const Conversations = ({ navigation }) => {
  return (
    <View>
      <View style={styles.options}>
        <Text
          variation={FontVariations.Urbanist_700Bold}
          fontSize={20}
          color={colors.gray.g5}
        >
          Conversations
        </Text>
        <Button
          onPress={() => navigation.navigate(SCREEN_NAMES.Home.Conversations)}
          shadow={false}
          style={styles.btn}
          color={colors.main.primary}
          title="View all"
        />
      </View>
      <Question navigation={navigation} />
    </View>
  );
};
export default Conversations;
const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "30%",
    backgroundColor: "transparent",
    height: 30,
    alignItems: "flex-end",
  },
});
