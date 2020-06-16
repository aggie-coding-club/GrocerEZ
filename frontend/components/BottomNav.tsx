import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {bottomStates} from './States';
import { FAB } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Props {
    currState: string;
    numItems?: number;
    totalPrice?: number;
}

export class BottomNav extends Component {
    
    constructor(props: Props) {
        super(props)
        let currState = bottomStates.itemSelection;
        if (props != null && props.currState) {
            currState = props.currState;
        }
        this.state = {currState};
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
                            <Text style={styles.bottomText}>
                                13 Items
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.nextText}>
                                    Next >
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case bottomStates.total:
                result = (
                    <View style={styles.bottom}>
                        <View style={styles.bar}>
                            <Text style={styles.bottomText}>
                                TOTAL
                            </Text>
                            <Text style={styles.bottomText}>
                                $31.56
                            </Text>
                        </View>
                    </View>
                );
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
        justifyContent: 'flex-end',
        width: "100%",
    },
    centerButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
        zIndex: 1,
    },
    bar: {
        width: "100%",
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        paddingHorizontal: 20,
    },
    bottomText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    nextText: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#00E676'
    }
});