import { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import urls from "../../api/urls";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Svg from "../../components/Svg";
import Text from "../../components/Text";
import AppContext from "../../contexts/AppContext";
import useClient from "../../hooks/useClient";
import useScreen from "../../hooks/useScreen";
import store from "../../store";
import colors from "../../tools/colors";
import ENUMS from "../../tools/enums";
import { FontVariations, TextAlign } from "../../tools/fonts";
import SCREEN_NAMES from "../../tools/screenNames";
import svg from "../../tools/svg";
import Screen from "../Screen";

const Login = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const { setUser } = useContext(AppContext);
  const { get, isLoading } = useClient();
  const handleLogin = async () => {
    setErrorMessage(null);
    if (!playerId) return setErrorMessage("Please provide player valid I.D");
    const id = parseInt(playerId.replace(new RegExp("YFA22", "ig"), ""));
    if (isNaN(id)) return setErrorMessage("Please provide player valid I.D");
    const { error, data } = await get(urls.players.getById + id);
    if (error) return setErrorMessage(error.message);
    await store.storeData("playerId", id);
    setUser(data.data.player);
  };
  return (
    <>
      <Screen header={{ navigation }}>
        <View style={styles.logo}>
          <Svg style={styles.svg} source={svg.logo} />
          <Text
            variation={FontVariations.Urbanist_700Bold}
            fontSize={32}
            textAlign={TextAlign.Center}
            color={colors.gray.g1}
          >
            Log in to your account
          </Text>
        </View>
        <Input
          lsvg={svg.envelope}
          placeholder="Player I.D"
          value={playerId}
          onChangeText={setPlayerId}
          style={styles.input}
        />
        <Button loading={isLoading} onPress={handleLogin} title="Sign in" />
        <View style={styles.moreContainer}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.Auth.Register)}
          style={styles.nextOption}
        >
          <Text variation={FontVariations.Urbanist_300Light}>
            Don't have an account?{" "}
            <Text
              variation={FontVariations.Urbanist_700Bold}
              color={colors.main.primary}
            >
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </Screen>
      <Alert
        seconds={2000}
        visible={errorMessage}
        remove={() => setErrorMessage(null)}
        style={styles.alert}
        type={ENUMS.ERROR}
        message={errorMessage}
      />
    </>
  );
};
export default Login;
const styles = StyleSheet.create({
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  svg: {
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
  },
  moreContainer: {
    // flex: 1,
    marginTop: "auto",
    paddingTop: 30,
    borderTopWidth: 1,
    borderColor: colors.gray.g4,
  },
  option: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray.g4,
    borderRadius: 20,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neurals.white,
  },
  optionsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  nextOption: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 36,
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
  },
  continueText: {
    backgroundColor: colors.neurals.white,
    alignSelf: "flex-end",
    position: "absolute",
    left: "37%",
    top: -11,
    paddingVertical: 2,
  },
  alert: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: useScreen.width,
  },
});
