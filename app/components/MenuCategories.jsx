import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import SCREEN_NAMES from "../tools/screenNames";
import STACK_NAMES from "../tools/stackNames";
import svg from "../tools/svg";
import Button from "./Button";
import MenuCategory from "./MenuCategory";
import Text from "./Text";

const options = [
  {
    title: "Symptom checker",
    svg: svg.options.sympCheck,
    target: STACK_NAMES.SymptomsChecker,
  },
  {
    title: "My Doctors",
    svg: svg.options.doctors,
    target: STACK_NAMES.SmartWatch,
  },
  {
    title: "Smart Watch",
    svg: svg.options.watch,
    target: STACK_NAMES.SmartWatch,
  },
  {
    title: "My Hospital",
    svg: svg.options.hospitals,
    target: STACK_NAMES.SmartWatch,
  },
];

const MenuCategories = ({ navigation, showHead = true, limit = 4 }) => {
  return (
    <View style={styles.container}>
      {showHead ? (
        <View style={styles.options}>
          <Text
            variation={FontVariations.Urbanist_700Bold}
            fontSize={20}
            color={colors.gray.g5}
          >
            Category
          </Text>
          <Button
            onPress={() => navigation.navigate(SCREEN_NAMES.Home.Categories)}
            shadow={false}
            style={styles.btn}
            color={colors.main.primary}
            title="View all"
          />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.card}>
        {options.slice(0, limit).map((props, idx) => (
          <MenuCategory key={idx} {...props} navigation={navigation} />
        ))}
      </View>
    </View>
  );
};
export default MenuCategories;
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
  container: {
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 15,
    flexWrap: "wrap",
  },
});
