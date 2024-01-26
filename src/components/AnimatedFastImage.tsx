import React, {FC, ReactElement} from 'react';
import {View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {styles} from './styles';
import {
  AnimatedFastImageComponent,
  AnimatedTextInput,
  MAX_SCALE,
  MIN_SCALE,
  images,
} from '../helpers/constants';
import {useGesture} from '../hooks/useGesture';

Animated.addWhitelistedNativeProps({text: true});

export const AnimatedFastImage: FC<FastImageProps> = ({
  resizeMode = FastImage.resizeMode.contain,
  style,
  ...props
}): ReactElement => {
  const {scale, offset, composedGesture, scaleTextDerived, currentImageId} =
    useGesture();

  const animatedStyle = useAnimatedStyle(() => ({
    //change UI styles in UI thread.
    //this callback will be directly converted to worklet
    transform: [
      {scale: scale.value},
      {translateX: offset.value.x},
      {translateY: offset.value.y},
    ],
  }));

  const scaleAnimatedProps = useAnimatedProps(() => {
    //change text of scale in UI thread itself.
    return {
      text: scaleTextDerived.value,
      defaultValue: scaleTextDerived.value,
    };
  });

  const animatedBgColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scale.value,
        [MIN_SCALE, MAX_SCALE],
        ['black', 'grey', 'white'],
      ),
    };
  });

  const animatedTextColorStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scale.value,
        [MIN_SCALE, MAX_SCALE],
        ['white', 'black'],
      ),
    };
  });

  const getOpacityStyle = (id: string) => {
    return useAnimatedStyle(() => ({
      //change UI styles in UI thread.
      //this callback will be directly converted to worklet
      opacity: id.toString() === currentImageId.value.toString() ? 1 : 0,
    }));
  };

  return (
    <Animated.View style={[styles.container, animatedBgColorStyle]}>
      <Animated.View style={styles.scaleTextContainer}>
        <AnimatedTextInput
          underlineColorAndroid="transparent"
          editable={false}
          style={[styles.scaleText, animatedTextColorStyle]}
          animatedProps={scaleAnimatedProps}
        />
      </Animated.View>
      {Object.entries(images).map(eachItem => {
        return (
          <Animated.View
            key={eachItem[0]?.toString()}
            style={styles.image2Container}>
            <AnimatedFastImageComponent
              source={eachItem[1]}
              resizeMode={'contain'}
              style={[styles.image2, getOpacityStyle(eachItem[0])]}
            />
          </Animated.View>
        );
      })}
      <View style={styles.imageContainer}>
        <GestureDetector gesture={composedGesture}>
          <AnimatedFastImageComponent
            {...props}
            style={[animatedStyle, style]}
            resizeMode={resizeMode}
          />
        </GestureDetector>
      </View>
    </Animated.View>
  );
};
