import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu, Store } from '@material-ui/icons';

export default function Header() {
  return (
    <View>
      <AppBar position="static" style={{background: "white"}}>
      <Toolbar style={{justifyContent: "space-between"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <IconButton edge="start" aria-label="menu" style={{color: "grey"}}>
                <Menu />
            </IconButton>
            <Typography style={{color: "grey", paddingLeft: 10, fontSize: 18, fontWeight: 700 }}>
                GrocerEZ
            </Typography>
        </View>
        
        <View style={{flexDirection: "row"}}>
            <Button variant="outlined" style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 0, borderBottomRightRadius: 0}}> <Store/> </Button>
            <Button variant="outlined" style={{borderTopRightRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}> 
            {/* <Svg width={30} height={27} viewBox="0 0 30 27" fill="none">
                <Path
                    d="M26.667 9.667H13.333v1.666h13.334V9.667zM27.5 18v-1.667l-.833-4.166H13.333l-.833 4.166V18h.833v5h8.334v-5H25v5h1.667v-5h.833zM20 21.333h-5V18h5v3.333z"
                    fill="#000"
                />
                <Path
                    d="M16.667 3.333H3.333V5h13.334V3.333zm.833 8.334V10l-.833-4.167H3.333L2.5 10v1.667h.833v5h8.334v-5H15v5h1.667v-5h.833zM10 15H5v-3.333h5V15z"
                    fill="#000"
                />
            </Svg> */}
            </Button>
        </View>
        </Toolbar>
      </AppBar>
    </View>
  );
}

const styles = StyleSheet.create({

});