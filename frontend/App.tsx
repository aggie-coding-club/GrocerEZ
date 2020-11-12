import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/Reducer';
import HeaderNav from './src/components/HeaderNav';
import BottomNav from './src/components/BottomNav';
import Page from './src/components/Page';
import {loadStoredItems} from './src/components/Helper/AsyncCalls'

// theme for react native
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#00E676',
  },
};

// creating store for the entire app
const store = createStore(rootReducer);

// load store with most recent list
loadStoredItems(store.dispatch)

// basic set up of the app
// for the most part don't need to modify as will change with state
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
