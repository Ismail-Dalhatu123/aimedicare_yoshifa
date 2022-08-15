import { View } from "react-native";
import { Svg, Circle } from "react-native-svg";
import colors from "../tools/colors";
import { FontVariations } from "../tools/fonts";
import Text from "./Text";

const p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const CircularProgress = ({
  size = 70,
  strokeWidth = 10,
  progressPercent = 0,
  changeColor,
  fontSize = 14,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          width: size - strokeWidth - 10,
          aspectRatio: 1,
          position: "absolute",
          left: 10,
          top: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          fontSize={fontSize}
          color={colors.gray.g1}
          variation={FontVariations.Urbanist_900Black}
        >
          {progressPercent}%
        </Text>
      </View>
      <Svg width={size} height={size}>
        <Circle
          stroke={colors.main.varients.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />
        <Circle
          stroke={
            changeColor && progressPercent <= changeColor
              ? colors.alert.danger
              : colors.main.primary
          }
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="square"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />
      </Svg>
    </View>
  );
};

export default CircularProgress;
