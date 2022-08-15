import { Image, ScrollView, StyleSheet, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import Button from "./Button";
import Text from "./Text";
import gloves from "../assets/images/gloves.png";

const RenderCard = () => {
  return (
    <View style={styles.board}>
      <View style={styles.texts}>
        <Text
          fontSize={20}
          variation={FontVariations.Urbanist_700Bold}
          color={colors.neurals.white}
        >
          Enjoy all benefits
        </Text>
        <Text style={styles.note} fontSize={12} color={colors.neurals.white}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium
          convallis mus arcu, purus. Ac adipiscing{" "}
        </Text>
        <Button
          fontSize={13}
          color={colors.gray.g1}
          style={styles.btn}
          title="Get Premium"
        />
      </View>
      <Image resizeMode="contain" style={styles.glovesImage} source={gloves} />
    </View>
  );
};

const Board = () => {
  return (
    <View>
      {/* <ScrollView horizontal pagingEnabled> */}
      {[1].map((n, idx) => (
        <RenderCard key={idx} />
      ))}
      {/* </ScrollView> */}
    </View>
  );
};
export default Board;
const styles = StyleSheet.create({
  board: {
    width: "100%",
    height: 180,
    borderRadius: 30,
    marginVertical: 20,
    padding: 20,
    overflow: "hidden",
    backgroundColor: colors.main.primary,
  },
  btn: {
    backgroundColor: colors.neurals.white,
    width: 120,
    height: 30,
    borderRadius: 14,
    marginTop: "auto",
  },
  texts: {
    flex: 1,
    width: "75%",
  },
  note: {
    marginTop: "auto",
  },
  glovesImage: {
    position: "absolute",
    right: -10,
    bottom: -15,
    // backgroundColor: "red",
    height: 160,
  },
});
