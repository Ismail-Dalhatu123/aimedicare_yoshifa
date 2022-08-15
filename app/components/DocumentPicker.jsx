import { Platform, TouchableOpacity } from "react-native";
import * as EDocumentPicker from "expo-document-picker";

export default function DocumentPicker({
  image = false,
  onSelect = () => {},
  children,
  ...props
}) {
  const selectFile = async () => {
    const res = await EDocumentPicker.getDocumentAsync({
      type: image ? "image/*" : "*/*",
    });

    if (res.type === "cancel") return;
    if (res.size / (1024 * 1024) > 50)
      return alert("Selected file should be less than 50mb");

    let { name: fname, size, uri } = res;

    if (Platform.OS === "android" && uri[0] === "/") {
      uri = `file://${uri}`;
      uri = uri.replace(/%/g, "%25");
    }

    let nameParts = fname.split(".");
    let fileType = nameParts[nameParts.length - 1];
    var fileToUpload = {
      name: fname,
      size: size,
      uri: uri,
      type: "application/" + fileType,
    };
    onSelect(fileToUpload);
  };

  return (
    <TouchableOpacity onPress={selectFile} {...props}>
      {children}
    </TouchableOpacity>
  );
}
