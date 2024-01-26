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

export const images = {
  1: require('../assets/images/reanimated.png'),
  2: require('../assets/images/reanimated2.png'),
  3: require('../assets/images/reanimated3.jpeg'),
  4: require('../assets/images/reanimated4.jpeg'),
  5: require('../assets/images/reanimated5.png'),
  6: require('../assets/images/reanimated6.jpeg'),
  7: require('../assets/images/reanimated7.jpeg'),
};
