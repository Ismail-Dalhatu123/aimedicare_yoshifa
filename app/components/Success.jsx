import { StyleSheet, View } from "react-native";
import useScreen from "../hooks/useScreen";
import colors from "../tools/colors";
import { FontVariations, TextAlign } from "../tools/fonts";
import svg from "../tools/svg";
import Button from "./Button";
import Svg from "./Svg";
import Text from "./Text";

const Success = ({
  closeModal,
  title,
  svgBg = colors.main.primary,
  rsvg = svg.filled.done,
  note,
  closeText = "Ok",
}) => {
  return (
    <View style={styles.success}>
      <View style={styles.content}>
        <View style={styles.shapes}>
          <View style={{ ...styles.svg, backgroundColor: svgBg }}>
            <Svg source={rsvg} />
          </View>
        </View>
        <Text
          textAlign={TextAlign.Center}
          variation={FontVariations.Urbanist_700Bold}
          color={colors.main.primary}
          fontSize={24}
        >
          {title}
        </Text>
        <Text fontSize={17} style={styles.note} textAlign={TextAlign.Center}>
          {note}
        </Text>
      </View>
      <Button onPress={closeModal} style={styles.closeBtn} title={closeText} />
    </View>
  );
};
export default Success;
const styles = StyleSheet.create({
  success: {
    width: useScreen.getWidthPercentage(90),
    height: useScreen.getHeightPercentage(60),
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 40,
    padding: 30,
  },
  closeBtn: {
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingBottom: "15%",
  },
  note: {
    marginTop: 10,
  },
  shapes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
});
