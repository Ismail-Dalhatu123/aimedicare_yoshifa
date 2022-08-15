import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StackNavigator = createNativeStackNavigator();

const Stack = ({ screens = [], options = {}, ...props }) => {
  return (
    <StackNavigator.Navigator
      {...props}
      screenOptions={{ headerShown: false, ...options }}
    >
      {screens.map((s, idx) => (
        <StackNavigator.Screen {...s} key={idx} />
      ))}
    </StackNavigator.Navigator>
  );
};

export default Stack;
