import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../tools/colors";

const ProfileImage = ({ width = 60, source }) => {
  const imgStyle = { width, borderRadius: width / 2 };
  return (
    <View style={[imgStyle, styles.container]}>
      <Image
        resizeMode="cover"
        source={{ uri: source }}
        style={[imgStyle, styles.container]}
      />
    </View>
  );
};
export default ProfileImage;
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    backgroundColor: colors.gray.g3,
  },
});
