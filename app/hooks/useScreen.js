import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const useScreen = {
  width,
  height,
  getWidthPercentage: (value) =>
    value < 1 ? width * value : value > 100 ? width : (value / 100) * width,
  getHeightPercentage: (value) =>
    value < 1 ? height * value : value > 100 ? height : (value / 100) * height,
  subtractFromWidth: (value) => width - value,
  subtractFromHeight: (value) => height - value,
};

export default useScreen;
