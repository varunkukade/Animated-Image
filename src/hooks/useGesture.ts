import {useMemo} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {MAX_SCALE, MIN_SCALE} from '../helpers/constants';

export const useGesture = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const currentImageId = useSharedValue(1);

  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate(e => {
          scale.value = savedScale.value * e.scale;
          if (scale.value < 1.5 || scale.value > 2.7) {
            currentImageId.value = 1;
          }
          if (scale.value > 1.5 && scale.value < 1.7) {
            currentImageId.value = 2;
          } else if (scale.value > 1.7 && scale.value < 1.9) {
            currentImageId.value = 3;
          }
          if (scale.value > 1.9 && scale.value < 2.1) {
            currentImageId.value = 4;
          }
          if (scale.value > 2.1 && scale.value < 2.3) {
            currentImageId.value = 5;
          }
          if (scale.value > 2.3 && scale.value < 2.5) {
            currentImageId.value = 6;
          }
          if (scale.value > 2.5 && scale.value < 2.7) {
            currentImageId.value = 7;
          }
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
    [scale, savedScale, currentImageId],
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

  const scaleTextDerived = useDerivedValue(() => {
    //this function will be run whenever scale change
    if (scale) {
      return `Scale : ${scale.value.toFixed(2)}`;
    } else {
      return '';
    }
  });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return {
    scale,
    offset,
    composedGesture,
    scaleTextDerived,
    currentImageId,
  };
};
