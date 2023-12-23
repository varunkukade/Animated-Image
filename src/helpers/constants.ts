import {Dimensions, Platform} from 'react-native';

export const getWindowWidth = () => Dimensions.get('window').width;
export const getWindowHeight = () => Dimensions.get('window').height;
export const isIos = () => Platform.OS === 'ios';
