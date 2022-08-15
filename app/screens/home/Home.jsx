import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import Text from "../../components/Text";
import AppContext from "../../contexts/AppContext";
import store from "../../store";
import { FontVariations } from "../../tools/fonts";
import Screen from "../Screen";
const Home = () => {
  const { user, setUser } = useContext(AppContext);
  const logout = async () => {
    await store.removeData("playerId");
    setUser(null);
  };
  return (
    <Screen header={{ title: "Home" }}>
      <Text variation={FontVariations.Urbanist_800ExtraBold}>
        {user.fullname}
      </Text>
      <Button title="Logout" onPress={logout} />
    </Screen>
  );
};
export default Home;
const styles = StyleSheet.create({});
