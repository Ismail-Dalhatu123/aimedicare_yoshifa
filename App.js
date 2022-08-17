import { useFonts } from "@expo-google-fonts/urbanist";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Fonts } from "./app/tools/fonts";
import * as ExSplashScreen from "expo-splash-screen";
import rootNavigation from "./app/navigation/refs/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./app/screens/SplashScreen";
import AppContext from "./app/contexts/AppContext";
import InitSmartWatch from "./app/components/InitSmartWatch";
import Auth from "./app/navigation/stacks/Auth";
// import Home from "./app/navigation/stacks/HomeStack";
// import Vitals from "./app/screens/smartwatch/Vitals";
import SmartWatch from "./app/navigation/stacks/SmartWatch";

const App = () => {
  const [isSmartWatchConnected, setIsSmartWatchConnected] = useState(false);
  const [isSmartWatchConnecting, setIsWatchConnecting] = useState(false);
  const [isUserRestored, setIsUserRestored] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [smartWatchData, setSmartWatchData] = useState({});
  const [smartWatchInfo, setSmartWatchInfo] = useState(null);
  const [user, setUser] = useState(null);
  let [fontsLoaded] = useFonts(Fonts);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await ExSplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSmartWatchConnecting,
        isSmartWatchConnected,
        setIsSmartWatchConnected,
        setIsWatchConnecting,
        smartWatchData,
        setSmartWatchData,
        smartWatchInfo,
        setSmartWatchInfo,
      }}
    >
      <InitSmartWatch />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationContainer ref={rootNavigation}>
            {isUserRestored ? (
              user ? (
                <SmartWatch />
              ) : (
                <Auth />
              )
            ) : (
              <SplashScreen
                setUser={setUser}
                setIsUserRestored={setIsUserRestored}
              />
            )}
          </NavigationContainer>
        </View>
      </KeyboardAvoidingView>
    </AppContext.Provider>
  );
};
export default App;
