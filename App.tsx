import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ImageComponent} from './src/components/ImageComponent';
import {isIos} from './src/helpers/constants';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isIos() ? 'dark-content' : 'light-content'}
        backgroundColor={'black'}
      />
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.ghRootView}>
          <ImageComponent />
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  ghRootView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
