import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import StoreSelector from './singleMultiStoreSelector';

export default function Header() {
  return (
    <Toolbar style={{ container: { backgroundColor: "white", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}, leftElement: {color: "black"}, titleText: {color: "black"}}}
        leftElement = "menu"
        centerElement = "GrocerEZ"
        rightElement = {
            <StoreSelector/>
        }
    />
    
  );
}

const styles = StyleSheet.create({

});