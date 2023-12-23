import React, {FC, ReactElement, useMemo} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedFastImageComponent: any = Animated.createAnimatedComponent(
  FastImage as any,
);

const MAX_SCALE = 2;
const MIN_SCALE = 1;

export const AnimatedFastImage: FC<FastImageProps> = ({
  resizeMode = FastImage.resizeMode.contain,
  style,
  ...props
}): ReactElement => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});

  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate(e => {
          scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
          savedScale.value = scale.value;
          if (savedScale.value < MIN_SCALE) {
            //do not allow zooming out below original/min scale
            scale.value = withSpring(MIN_SCALE, {
              stiffness: 60,
              overshootClamping: true,
            });
            savedScale.value = MIN_SCALE;
          } else if (savedScale.value > MAX_SCALE) {
            //do not allow zooming beyond max scale
            scale.value = withSpring(MAX_SCALE, {
              stiffness: 60,
              overshootClamping: true,
            });
            savedScale.value = MAX_SCALE;
          }
        }),
    [scale, savedScale],
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .averageTouches(true)
        .enabled(true)
        .onUpdate(e => {
          offset.value = {
            x: e.translationX + start.value.x,
            y: e.translationY + start.value.y,
          };
        })
        .onEnd(() => {
          //if user take off finger while moving image in x and y direction, take image to its original place.
          offset.value = {
            x: withSpring(0, {
              stiffness: 60,
              overshootClamping: true,
            }),
            y: withSpring(0, {
              stiffness: 60,
              overshootClamping: true,
            }),
          };
          start.value = {
            x: 0,
            y: 0,
          };
        }),
    [offset, start],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: offset.value.x},
      {translateY: offset.value.y},
    ],
  }));

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={composed}>
      <AnimatedFastImageComponent
        {...props}
        style={[animatedStyle, style]}
        resizeMode={resizeMode}
      />
    </GestureDetector>
  );
};
