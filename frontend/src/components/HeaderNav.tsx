import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import StoreSelector from './StoreSelectorButton';
import { HeaderStates, GlobalStates } from '../constants/States';
import { State } from '../constants/Interfaces';
import { ActionTypes } from '../constants/ActionTypes';
import { querySuggestions, retrieveItems } from './Helper/AsyncCalls';

interface Props {
    currState: HeaderStates
}

// header navigation for app
function HeaderNav(props: Props) {
    const dispatch = useDispatch();
    let [clearQuery, setClearQuery] = useState(false);
    let [query, setQuery] = useState("");
    
    // Used to tell whether or not back button eventlistening has been added on Android devices
    let [hasBackEvent, setHasBackEvent] = useState(false);
    function backButtonPressed() {
        dispatch({type: GlobalStates.listSelection});
        return true;
    }
    
    const backToItemList = () => {
        dispatch({type: GlobalStates.listSelection});
    }

    const previousListButtonPressed = async() => {
        Alert.alert("Load previous list?", 
            "Are you sure you want to load the last shopping list you made? Doing so will replace your currently selected items.", 
            [
                {
                    text: "Yes",
                    style: "default",
                    onPress: async() => {
                        const newItems = await retrieveItems();
                        //console.log(newItems)
                        dispatch({type: ActionTypes.replaceItems, newItems: newItems})
                    }
                },
                {
                    text: "Cancel",
                    style: 'cancel'
                }
            ],
            {cancelable: true}
        );
    }

    switch (props.currState) {
        case HeaderStates.storeSelect: // for final item selection with route
            return (
                <Appbar.Header>
                    <Appbar.BackAction onPress={backToItemList} />
                    <Appbar.Content title="GrocerEZ" />
                    <StoreSelector/>
                </Appbar.Header>
            );
        case HeaderStates.search: // for search page
            // Implemented for convenient back button functionality for Android devices
            if (!hasBackEvent) {
                BackHandler.addEventListener('hardwareBackPress', backButtonPressed);
                setHasBackEvent(true);
            }

            const updateQuery = (changedQuery: string) => {
                setQuery(changedQuery);
                querySuggestions(dispatch, query);
            }
        
            const submitQuery = () => {
                setClearQuery(true);
                // console.log(query);
                dispatch({type: ActionTypes.queryItem, searchQuery: query});
            }
            
            return (
                <Appbar.Header>
                    <Appbar.BackAction onPress={backToItemList} />
                    <Searchbar 
                        style={{elevation: 0}}
                        placeholder="Search"
                        onChangeText={updateQuery}
                        value={query}
                        onSubmitEditing={submitQuery}
                        onIconPress={submitQuery}
                    />
                </Appbar.Header>
            );
        default:
            // clear state from search
            if (clearQuery) {
                setQuery("");
                setClearQuery(false);
            }
            if (hasBackEvent) {
                BackHandler.removeEventListener('hardwareBackPress', backButtonPressed);
                setHasBackEvent(false);
            }
            break;
    }
  
    return (
        <Appbar.Header>
            <Appbar.Action
            icon = "page-previous-outline"
            onPress={previousListButtonPressed}
            />
            <Appbar.Content title="GrocerEZ"/>
        </Appbar.Header>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currState: state.headerState
    }
}

export default connect(mapStateToProps)(HeaderNav);