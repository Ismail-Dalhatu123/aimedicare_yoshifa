import { SvgXml } from "react-native-svg";

const Svg = ({ source, style = {}, onPress, ...props }) => {
  return <SvgXml {...props} onPress={onPress} xml={source} style={style} />;
};

export default Svg;
