import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/Reducer';
import HeaderNav from './src/components/HeaderNav';
import BottomNav from './src/components/BottomNav';
import { HeaderStates, BottomStates, PageStates } from "./src/constants/States";
import { State } from "./src/constants/Interfaces";
import Page from './src/components/Page';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#00E676',
  },
};

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <HeaderNav/>
            <Page/>
            <BottomNav/>
          </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: '#FAFAFA',
    position: "relative",
    height: "100%"
  },
});
