import { TouchableOpacity } from "react-native";
import svg from "../tools/svg";
import Svg from "./Svg";

const Back = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={
        navigation && navigation.canGoBack()
          ? () => navigation.goBack()
          : () => {}
      }
      style={{
        padding: 10,
        paddingHorizontal: 35,
        paddingLeft: 5,
      }}
    >
      <Svg source={svg.back} />
    </TouchableOpacity>
  );
};
export default Back;
