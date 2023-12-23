import React from 'react';
import {AnimatedFastImage} from './AnimatedFastImage';
import {StyleSheet} from 'react-native';

export const ImageComponent = () => {
  return (
    <AnimatedFastImage
      style={styles.image}
      source={require('../assets/images/reanimated.png')}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
});
