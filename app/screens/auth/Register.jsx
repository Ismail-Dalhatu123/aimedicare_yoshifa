import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import DocumentPicker from "../../components/DocumentPicker";
import Input from "../../components/Input";
import Svg from "../../components/Svg";
import colors from "../../tools/colors";
import { FontVariations } from "../../tools/fonts";
import SCREEN_NAMES from "../../tools/screenNames";
import svg from "../../tools/svg";
import Screen from "../Screen";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../../components/Text";
import useClient from "../../hooks/useClient";
import useScreen from "../../hooks/useScreen";
import Alert from "../../components/Alert";
import ENUMS from "../../tools/enums";
import urls from "../../api/urls";
import AppContext from "../../contexts/AppContext";
import store from "../../store";

const Register = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [fullname, setFullName] = useState(null);
  const [id, setId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [gender, setGender] = useState(null);
  //   const [dateOfBirthD, setDateOfBirthD] = useState(null);
  //   const [dateOfBirthM, setDateOfBirthM] = useState(null);
  //   const [dateOfBirthY, setDateOfBirthY] = useState(null);
  const [cardExpiryD, setcardExpiryD] = useState(null);
  const [cardExpiryM, setcardExpiryM] = useState(null);
  const [cardExpiryY, setcardExpiryY] = useState(null);

  const { setUser } = useContext(AppContext);

  const { isLoading, post } = useClient();

  const register = async () => {
    setErrorMessage(null);
    if (!selectedImage) return setErrorMessage("Please select an image");
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("id", parseInt(id.replace(new RegExp("YFA22", "ig"), "")));
    formData.append("fullname", fullname);
    formData.append("phoneNumber", phoneNumber);
    formData.append("expiry", `${cardExpiryD}/${cardExpiryM}/${cardExpiryY}`);
    formData.append("gender", gender);
    const { error, data } = await post(urls.players.baseUrl, formData);
    if (error) return setErrorMessage(error.message);
    await store.storeData("playerId", data.data.account.id);
    setUser(data.data.account);
  };

  return (
    <>
      <Screen header={{ navigation, title: "Create Your Profile" }}>
        <View style={styles.avatar}>
          {selectedImage ? (
            <Image
              style={styles.profileImage}
              source={{ uri: selectedImage.uri }}
            />
          ) : (
            <Svg source={svg.avatar} />
          )}
          <DocumentPicker
            image
            onSelect={setSelectedImage}
            style={styles.picker}
          >
            <FontAwesome size={15} name="pencil" color={colors.neurals.white} />
          </DocumentPicker>
        </View>
        <Input
          inputStyle={styles.inputStyle}
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullName}
        />
        <Input
          inputStyle={styles.inputStyle}
          style={styles.input}
          placeholder="Player I.D"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
        />
        {/* <Text
            variation={FontVariations.Urbanist_600SemiBold}
            style={{ paddingLeft: 15, marginBottom: 10 }}
          >
            Date of birth
          </Text>
          <View style={styles.dateOfBirth}>
            <Input
              value={dateOfBirthD}
              onChangeText={setDateOfBirthD}
              inputStyle={styles.dateInput}
              righIconStyle={styles.rightIconStyle}
              maxLength={2}
              keyboardType="numeric"
              style={styles.shortInput}
              placeholder="Date"
              rsvg={svg.outline.calender}
            />
            <Input
              value={dateOfBirthM}
              onChangeText={setDateOfBirthM}
              inputStyle={styles.dateInput}
              righIconStyle={styles.rightIconStyle}
              maxLength={2}
              keyboardType="numeric"
              style={styles.shortInput}
              placeholder="Month"
              rsvg={svg.outline.calender}
            />
            <Input
              value={dateOfBirthY}
              onChangeText={setDateOfBirthY}
              inputStyle={styles.dateInput}
              righIconStyle={styles.rightIconStyle}
              maxLength={4}
              keyboardType="numeric"
              style={styles.shortInput}
              placeholder="Year"
              rsvg={svg.outline.calender}
            />
          </View> */}
        <Input
          inputStyle={styles.inputStyle}
          style={styles.input}
          placeholder="Gender"
          rsvg={svg.chv}
          value={gender}
          onChangeText={setGender}
        />
        <Input
          inputStyle={styles.inputStyle}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text
          variation={FontVariations.Urbanist_600SemiBold}
          style={{ paddingLeft: 15, marginBottom: 10 }}
        >
          Card Expiry
        </Text>
        <View style={styles.dateOfBirth}>
          <Input
            inputStyle={styles.dateInput}
            righIconStyle={styles.rightIconStyle}
            maxLength={2}
            keyboardType="numeric"
            style={styles.shortInput}
            placeholder="Date"
            rsvg={svg.outline.calender}
            value={cardExpiryD}
            onChangeText={setcardExpiryD}
          />
          <Input
            inputStyle={styles.dateInput}
            righIconStyle={styles.rightIconStyle}
            maxLength={2}
            keyboardType="numeric"
            style={styles.shortInput}
            placeholder="Month"
            rsvg={svg.outline.calender}
            value={cardExpiryM}
            onChangeText={setcardExpiryM}
          />
          <Input
            inputStyle={styles.dateInput}
            righIconStyle={styles.rightIconStyle}
            maxLength={4}
            keyboardType="numeric"
            style={styles.shortInput}
            placeholder="Year"
            rsvg={svg.outline.calender}
            value={cardExpiryY}
            onChangeText={setcardExpiryY}
          />
        </View>
        <Button
          loading={isLoading}
          onPress={register}
          style={styles.submit}
          title="Continue"
        />
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
export default Register;
const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    alignSelf: "flex-end",
    marginLeft: "auto",
    marginRight: "auto",
  },
  submit: {
    marginTop: 40,
    marginBottom: 20,
  },
  scroller: {
    paddingBottom: 20,
  },
  picker: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.main.primary,
    position: "absolute",
    bottom: -5,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    fontFamily: FontVariations.Urbanist_600SemiBold,
    color: colors.gray.g1,
  },
  shortInput: {
    width: "30%",
  },
  dateOfBirth: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 140,
    height: 140,
    backgroundColor: colors.main.primary,
    borderRadius: 70,
  },
  rightIconStyle: {
    width: 30,
    height: 30,
  },
  dateInput: {
    textAlign: "center",
  },
  alert: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: useScreen.width,
  },
});
