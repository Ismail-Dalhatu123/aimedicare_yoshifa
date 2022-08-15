import { NativeModules, NativeEventEmitter, Platform } from "react-native";

const { WatchModule } = NativeModules;

export const eventEmitter =
  Platform.OS === "ios" ? null : new NativeEventEmitter();

export default WatchModule;
