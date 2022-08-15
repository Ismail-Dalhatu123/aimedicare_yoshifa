import { TouchableOpacity, StyleSheet } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import Loader from "./Loader";
import Svg from "./Svg";
import Text from "./Text";

const Button = ({
  title,
  disabled,
  loading = false,
  onPress,
  style,
  outline,
  fontSize = 16,
  color = colors.neurals.white,
  shadow = true,
  svg,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled ? styles.disabled : {},
        outline ? styles.outline : shadow ? styles.shadow : {},
      ]}
    >
      {svg && typeof svg === "object" ? (
        <Svg {...svg} />
      ) : loading ? (
        <Loader color={outline ? colors.main.primary : color} loading />
      ) : (
        <Text
          fontSize={fontSize}
          variation={FontVariations.Urbanist_700Bold}
          color={outline ? colors.main.primary : color}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.primary,
    borderRadius: 30,
    shadowColor: colors.main.primary,
    borderColor: colors.main.primary,
  },
  disabled: {
    backgroundColor: colors.gray.g4,
    shadowColor: colors.gray.g4,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  outline: {
    borderWidth: 2,
    backgroundColor: "transparent",
  },
});
