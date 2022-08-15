import HomeScreen from "../../screens/home/Home";
import SCREEN_NAMES from "../../tools/screenNames";
import Stack from "./Stack";

const Home = () => {
  return (
    <Stack
      screens={[
        {
          name: SCREEN_NAMES.Home.Home,
          component: HomeScreen,
        },
      ]}
    />
  );
};
export default Home;
