import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Appbar } from 'react-native-paper';
import StoreSelector from './singleMultiStoreSelector';

export default function Header() {
  return (

    <Appbar.Header>
        <Appbar.Action icon="menu" />
        <Appbar.Content title="GrocerEZ" />
        <StoreSelector/>
    </Appbar.Header>
    
  );
}

const styles = StyleSheet.create({

});