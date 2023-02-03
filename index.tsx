import { ReactNode, useState } from "react";
import { Platform, Text, View } from "react-native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const HoldToCallButton = ({
  children,
  onHoldFinished,
  pressDownDurationMilliseconds = 800,
  disabled = false,
  loading,
  // customization
  primaryColor = "#17213B",
  inactiveColor = "#FFF",
  fontFamily = "normal",
  fontSize = 16,
  borderRadius = 10,
  ...props
}: {
  children: ReactNode;
  onHoldFinished: () => void;
  pressDownDurationMilliseconds?: number;
  disabled?: boolean;
  loading?: boolean;
  // customization
  primaryColor?: string;
  inactiveColor?: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: number;
}) => {
  const [animationStatus, setAnimationStatus] = useState(false);
  const animation = useSharedValue({ width: "0%" });
  const animationStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: pressDownDurationMilliseconds,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    };
  });

  return (
    <LongPressGestureHandler
      onBegan={() => {
        if (!disabled) {
          animation.value = {
            width: "100%",
          };
        }
      }}
      onFailed={() => {
        animation.value = { width: "0%" };
      }}
      onHandlerStateChange={async ({ nativeEvent }) => {
        if (
          nativeEvent.state === State.BEGAN &&
          !animationStatus &&
          !disabled
        ) {
          setAnimationStatus(true);
        }
        if (nativeEvent.state === State.FAILED && animationStatus) {
          // kinda hacky, but I don't think I can watch for the width to go back to 0
          await wait(400);
          setAnimationStatus(false);
        }

        if (nativeEvent.state === State.ACTIVE && !disabled) {
          onHoldFinished();
        }
      }}
      minDurationMs={pressDownDurationMilliseconds}
    >
      <View
        {...props}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: loading ? primaryColor : inactiveColor,
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius,
          overflow: "hidden",
          borderStyle: "solid",
          borderWidth: Platform.OS === "ios" ? 1 : 0,
          borderColor: Platform.OS === "ios" ? primaryColor : "transparent",
          // elevation
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          shadowColor: "#000",
          elevation: 3,
          zIndex: -1
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              borderRadius,
              backgroundColor: primaryColor,
            },
            animationStyle,
          ]}
        />
        <Text
          style={{
            color: animationStatus ? inactiveColor : primaryColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
          }}
        >
          {children}
        </Text>
      </View>
    </LongPressGestureHandler>
  );
};

const wait = (milliseconds: number) => {
  // @ts-ignore
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
