import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import SCREEN_NAMES from "../../tools/screenNames";
import Stack from "./Stack";

const Auth = () => {
  return (
    <Stack
      screens={[
        {
          name: SCREEN_NAMES.Auth.Login,
          component: Login,
        },
        {
          name: SCREEN_NAMES.Auth.Register,
          component: Register,
        },
      ]}
    />
  );
};
export default Auth;
