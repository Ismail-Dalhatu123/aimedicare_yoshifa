import { StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations, TextAlign } from "../tools/fonts";
import STACK_NAMES from "../tools/stackNames";
import { vitals } from "../tools/vitals";
import Button from "./Button";
import CircularProgress from "./CircularProgress";
import Text from "./Text";

const excluded = ["ECG", "Sleep", "HRV"];

const VitalsPrev = ({ navigation }) => {
  return (
    <View>
      <View style={styles.options}>
        <Text
          variation={FontVariations.Urbanist_700Bold}
          fontSize={20}
          color={colors.gray.g5}
        >
          My Vitals
        </Text>
        <Button
          onPress={() => navigation.navigate(STACK_NAMES.SmartWatch)}
          shadow={false}
          style={styles.btn}
          color={colors.main.primary}
          title="View all"
        />
      </View>
      <View style={styles.card}>
        {vitals
          .filter((v) => !excluded.includes(v.title))
          .map(({ value, title, label }, idx) => (
            <View key={idx} style={styles.vital}>
              <CircularProgress
                // changeColor={40}
                fontSize={12}
                size={60}
                strokeWidth={8}
                progressPercent={0}
              />
              <Text
                variation={FontVariations.Urbanist_500Medium}
                color={colors.neurals.black}
                textAlign={TextAlign.Center}
                fontSize={11}
              >
                {title}
              </Text>
              <Text
                variation={FontVariations.Urbanist_600SemiBold}
                color={colors.main.primary}
                textAlign={TextAlign.Center}
              >
                {value}
              </Text>
              <Text
                color={colors.gray.g7}
                fontSize={9}
                textAlign={TextAlign.Center}
              >
                {label}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};
export default VitalsPrev;
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
  card: {
    padding: 10,
    backgroundColor: colors.neurals.white,
    flexDirection: "row",
    marginVertical: 15,
    borderRadius: 20,
  },
  vital: {
    width: "25%",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
