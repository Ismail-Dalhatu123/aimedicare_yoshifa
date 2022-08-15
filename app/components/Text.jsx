import { StyleSheet, Text as RNText } from "react-native";
import colors from "../tools/colors";
import { FontVariations, TextAlign } from "../tools/fonts";

export default function Text({
  children,
  fontSize = 14,
  color = colors.gray.g2,
  style = {},
  variation = FontVariations.Urbanist_500Medium,
  Wrapper = RNText,
  textAlign = TextAlign.Auto,
  ...others
}) {
  return (
    <Wrapper
      {...others}
      style={{
        ...styles.text,
        color,
        fontSize,
        textAlign,
        fontFamily: variation,
        ...style,
      }}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  text: {},
});
