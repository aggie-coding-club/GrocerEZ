import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {BottomStates, GlobalStates} from '../constants/States';
import { FAB } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { State, Item } from '../constants/Interfaces';
import { connect, useDispatch } from 'react-redux';
import { ActionTypes } from '../constants/ActionTypes';
import { findItemsWithRoute } from './Helper/AsyncCalls';

interface Props {
    currState: BottomStates
    items: Item[]
}

// bottom navigation of app
function BottomNav(props: Props) {
        const dispatch = useDispatch();

        let result= (<View></View>);
        switch (props.currState) {
            case BottomStates.itemSelection: // initial item selection
                let numItem = props.items.length;
                
                // for transitioning to search page
                const queryItemScreen = () => {
                    dispatch({type: GlobalStates.searchQuery});
                }

                // for transitioning to final results page
                const storeSelectDialog = () => {
                    Alert.alert("Route Selection", 
                    "Do you want to limit your trip to one store or are you willing to go to multiple stores to get better prices?", 
                    [
                        {
                            text: "One Stop",
                            style: "default",
                            onPress: () => {
                                dispatch({type: ActionTypes.changeStoreOpt, isSingleStore: true});
                                dispatch({type: GlobalStates.loadingScreen})
                                findItemsWithRoute(dispatch, props.items);
                            }
                        },
                        {
                            text: "Multi Store",
                            style: "default",
                            onPress: () => {
                                dispatch({type: ActionTypes.changeStoreOpt, isSingleStore: false});
                                dispatch({type: GlobalStates.loadingScreen})
                                findItemsWithRoute(dispatch, props.items);
                            }
                        }
                    ]
                    )
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
                                    Next &gt;
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case BottomStates.total: // final item selection page
                // calculate price
                let price = props.items.length > 0 ? props.items.reduce((total, {price}) => total + (price ? price : 0), 0) : 0;
                let totalPrice = (price / 100).toFixed(2)

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
        display: "flex",
        justifyContent: 'flex-end',
        width: "100%",
        position: "absolute",
        zIndex: 10,
        bottom: 0
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