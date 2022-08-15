import { PermissionsAndroid } from "react-native";

export const requestPermissions = async () => {
  try {
    const bluetoothConnectPermssion = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const coarsLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    return {
      bluetoothConnectPermssion,
      coarsLocationPermission,
      fineLocationPermission,
    };
  } catch (err) {
    console.warn(err);
  }
};

/**
 * 
 * 
 * // const cameraPermission = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    //   {
    //     title: " Camera Permission",
    //     message:
    //       "AiMedicare needs access to your camera " +
    //       "For appointments and taking image.",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   }
    // );
    // const callPermssion = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CALL_PHONE
    // );
    // const storagePermssion = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    // );

    // const bluetoothScanPermission = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    // );
 * 
 */
