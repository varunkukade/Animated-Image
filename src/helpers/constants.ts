import {Dimensions, Platform, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';

export const getWindowWidth = () => Dimensions.get('window').width;
export const getWindowHeight = () => Dimensions.get('window').height;
export const isIos = () => Platform.OS === 'ios';

export const AnimatedFastImageComponent: any = Animated.createAnimatedComponent(
  FastImage as any,
);
export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const MAX_SCALE = 2;
export const MIN_SCALE = 1;
