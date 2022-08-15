import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import svg from "../tools/svg";
import Svg from "./Svg";
const Input = ({
  style,
  lsvg,
  rsvg,
  isSecure,
  inputStyle,
  fontVariation = FontVariations.Urbanist_500Medium,
  setRef,
  righIconStyle,
  leftIconStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isSecure);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);
  const toggleIsFocus = () => setIsFocused(!isFocused);

  useEffect(() => {
    if (typeof setRef === "function") setRef(inputRef);
  }, [inputRef]);

  const hanldeFocus = () => {
    if (typeof onFocus === "function") onFocus();
    toggleIsFocus();
  };

  const handleBlur = () => {
    if (typeof onBlur === "function") onBlur();
    toggleIsFocus();
  };

  return (
    <View style={[styles.input, style, isFocused ? styles.focused : {}]}>
      {lsvg ? (
        <View style={[styles.icon, leftIconStyle]}>
          <Svg source={lsvg} />
        </View>
      ) : (
        <></>
      )}
      <TextInput
        {...props}
        onFocus={hanldeFocus}
        onBlur={handleBlur}
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        style={[
          styles.inputText,
          inputStyle,
          { fontFamily: fontVariation, paddingLeft: lsvg ? 5 : 15 },
        ]}
      />
      {isSecure ? (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
          <Svg source={secureTextEntry ? svg.eye.close : svg.eye.open} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {rsvg ? (
        <View style={[styles.icon, righIconStyle]}>
          <Svg source={rsvg} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: colors.gray.g6,
    height: 60,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    padding: 5,
    height: 50,
  },
  focused: {
    borderWidth: 1,
    borderColor: colors.main.primary,
    backgroundColor: colors.main.varients.primary,
  },
});
