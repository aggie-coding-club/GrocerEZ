import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {bottomStates, globalStates} from '../constants/States';
import { FAB } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { State, Item } from '../constants/Interfaces';
import { connect, useDispatch } from 'react-redux';

interface Props {
    currState: bottomStates
    items: Item[]
}

function BottomNav(props: Props) {
        const dispatch = useDispatch();

        let result= (<View></View>);
        switch (props.currState) {
            case bottomStates.itemSelection:
                let numItem = props.items.length;
                
                const queryItemScreen = () => {
                    dispatch({type: globalStates.searchQuery});
                }

                const storeSelectDialog = () => {
                    dispatch({type: globalStates.finalListSelection, payload: {updatedItems: []}});
                    // dispatch({type: globalStates.optionsDialog});
                }

                result = (
                    <View style={styles.bottom}>
                        <FAB 
                        icon="plus"
                        onPress={queryItemScreen}
                        style={styles.centerButton}
                        />
                        <View style={styles.bar}>
                            <Text style={styles.bottomText}>
                                {numItem} Items
                            </Text>
                            <TouchableOpacity onPress={storeSelectDialog}>
                                <Text style={styles.nextText}>
                                    Next >
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case bottomStates.total:
                const totalPrice = props.items.length > 0 ? props.items.reduce((total, {price}) => total + (price ? price : 0), 0) : 0;

                result = (
                    <View style={styles.bottom}>
                        <View style={styles.bar}>
                            <Text style={styles.bottomText}>
                                TOTAL
                            </Text>
                            <Text style={styles.bottomText}>
                                ${totalPrice}
                            </Text>
                        </View>
                    </View>
                );
                break;
        }

        return result;
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

const mapStateToProps = (state: State) => {
    return {
        currState: state.bottomState,
        items: state.store.items
    }
}

export default connect(mapStateToProps)(BottomNav);