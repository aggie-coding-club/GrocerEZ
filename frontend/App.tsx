import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {HeaderNav} from './components/HeaderNav';
import {headerStates, bottomStates} from './components/States';
import { BottomNav } from './components/BottomNav';

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
          <BottomNav currState={bottomStates.itemSelection}/>
        </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
