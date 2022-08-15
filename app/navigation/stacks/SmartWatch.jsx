import DeviceColor from "../../screens/smartwatch/DeviceColor";
import Help from "../../screens/smartwatch/Help";
import Intro from "../../screens/smartwatch/Intro";
import PInfo from "../../screens/smartwatch/PInfo";
import SearchDevices from "../../screens/smartwatch/SearchDevices";
import Vitals from "../../screens/smartwatch/Vitals";
import SCREEN_NAMES from "../../tools/screenNames";
import Stack from "./Stack";

const SmartWatch = () => {
  return (
    <Stack
      //   initialRouteName={SCREEN_NAMES.SmartWatch.Vitals}
      screens={[
        {
          name: SCREEN_NAMES.SmartWatch.Intro,
          component: Intro,
        },
        {
          name: SCREEN_NAMES.SmartWatch.DeviceType,
          component: DeviceColor,
        },
        {
          name: SCREEN_NAMES.SmartWatch.Help,
          component: Help,
        },
        {
          name: SCREEN_NAMES.SmartWatch.SearchDevices,
          component: SearchDevices,
        },
        {
          name: SCREEN_NAMES.SmartWatch.PInfo,
          component: PInfo,
        },
        {
          name: SCREEN_NAMES.SmartWatch.Vitals,
          component: Vitals,
        },
      ]}
    />
  );
};
export default SmartWatch;
