import { StyleSheet, View } from "react-native";
import useScreen from "../hooks/useScreen";
import colors from "../tools/colors";

const Modal = ({ render, visible, style }) => {
  if (!visible) return null;
  return <View style={[styles.modal, style]}>{render()}</View>;
};
export default Modal;
const styles = StyleSheet.create({
  modal: {
    width: useScreen.width,
    height: useScreen.height,
    position: "absolute",
    top: 0,
    backgroundColor: colors.neurals.varients.black,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
