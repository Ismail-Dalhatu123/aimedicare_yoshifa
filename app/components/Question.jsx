import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import client from "../api/client";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import SCREEN_NAMES from "../tools/screenNames";
import svg from "../tools/svg";
import { formatDate } from "../utils/dateFormatter";
import ProfileImage from "./ProfileImage";
import Svg from "./Svg";
import Text from "./Text";

const PostIcon = ({ svg, label, style, ...props }) => (
  <TouchableOpacity {...props} style={[styles.icon, style]}>
    <Svg source={svg} />
    <Text fontSize={10}>{label}</Text>
  </TouchableOpacity>
);

const Question = ({ style, navigation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState((Math.random() * 20).toFixed(0));
  const [randomUser, setRandomUser] = useState({
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "John Doe",
    date: Date.now(),
  });
  const getRandomUser = async () => {
    const { data, ok } = await client.get("https://randomuser.me/api/");
    if (!ok) return;
    const user = data.results[0];
    setRandomUser({
      name: `${user.name.first} ${user.name.last}`,
      image: user.picture.thumbnail,
      date: user.registered.date,
    });
  };

  const like = () => {
    if (isLiked) {
      setLikes(parseInt(likes) - 1);
      setIsLiked(false);
      return;
    }
    setLikes(parseInt(likes) + 1);
    setIsLiked(true);
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREEN_NAMES.Home.ViewConversation)}
      style={[styles.card, style]}
    >
      <View style={styles.profile}>
        <ProfileImage width={40} source={randomUser.image} />
        <View style={styles.name}>
          <Text
            fontSize={15}
            color={colors.gray.g1}
            variation={FontVariations.Urbanist_700Bold}
          >
            {randomUser.name}
          </Text>
          <Text fontSize={9}>{formatDate(randomUser.date)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>
          Lorem ipsum carrots, enhanced undergraduate developer, but they do
          occaecat time and vitality, Lorem ipsum carrots.{" "}
        </Text>
        <View style={styles.icons}>
          <PostIcon
            style={styles.first}
            label={(Math.random() * 20).toFixed(0)}
            svg={svg.comment}
          />
          <PostIcon
            onPress={like}
            label={likes}
            svg={isLiked ? svg.heart.full : svg.heart.outline}
          />
          <PostIcon label={(Math.random() * 20).toFixed(0)} svg={svg.share} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Question;
const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: colors.neurals.white,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    shadowColor: colors.gray.g4,
    elevation: 14,
    borderRadius: 25,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  content: {
    paddingLeft: 50,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  first: {
    justifyContent: "flex-start",
    // backgroundColor: "red",
    paddingLeft: "8%",
  },
});
