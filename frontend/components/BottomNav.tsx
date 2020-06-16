import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {bottomStates} from './States';
import { FAB, Appbar } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

export interface Props {
    currState: string;
}

export class BottomNav extends Component {
    
    constructor(props: Props) {
        super(props)
        let currState = bottomStates.itemSelection;
        if (props != null && props.currState) {
            currState = props.currState;
        }
        this.state = {currState}
    }

    render() {
        let result;
        switch (this.state.currState) {
            case bottomStates.itemSelection:
                result = (
                    <View style={styles.bottom}>
                        <FAB 
                        icon="plus"
                        onPress={()=>{}}
                        style={styles.centerButton}
                        />
                        <View style={styles.bar}>
                        </View>
                    </View>
                );
                break;
            case bottomStates.total:

                break;
        }

        return (
            result
         );
    }
}

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        
        width: "100%",
    },
    centerButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20
    },
    bar: {
        width: "100%",
        backgroundColor: "black",
    }
});