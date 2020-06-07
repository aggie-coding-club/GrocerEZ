import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {HeaderNav} from './components/HeaderNav';
import {headerStates} from './components/States';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#00E676',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <HeaderNav currState={headerStates.search}/>
        </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
