import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import setState from './src/reducers/Reducer';
import HeaderNav from './src/components/HeaderNav';
import BottomNav from './src/components/BottomNav';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#00E676',
  },
};

const store = createStore(setState);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <HeaderNav/>
            <BottomNav/>
          </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
