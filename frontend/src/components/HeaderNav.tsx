import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import StoreSelector from './StoreSelectorButton';
import { HeaderStates, GlobalStates } from '../constants/States';
import { State, Item } from '../constants/Interfaces';
import { ActionTypes } from '../constants/ActionTypes';
import { querySuggestions, storeItems} from './Helper/AsyncCalls';
import temporaryDB from '../../temporaryDB.json'; // FIXME: will be removed later

interface Props {
    currState: HeaderStates,
    items: Item[]
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

    // for clearing users current list
    const clearButtonPressed = () => {
        Alert.alert("Clear current list?", 
            "Are you sure you want to clear your current shopping list?", 
            [
                {
                    text: "Yes",
                    style: "default",
                    onPress: () => {
                        // replace current list with empty list
                        dispatch({type: ActionTypes.replaceItems, newItems: []})
                        // update local storage
                        storeItems([])
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

    // for adding an item to the current users list
    const addButtonPressed = () => {
        // currently implemented for testing with button
        const item = {...(temporaryDB['testItems'][Math.floor(Math.random() * 9)])} // get a new copy of a random item
        item.id = props.items.length //prevents duplicate ids
        dispatch({type: ActionTypes.addItem, addedItem: item})
        // update local storage
        const items = [...props.items]
        items.push(item)
        storeItems(items)
    }
  
    return (
        <Appbar.Header>
            <Appbar.Content title="GrocerEZ"/>
            <Appbar.Action       // for testing
            icon = "plus"
            onPress={addButtonPressed}
            />
            <Appbar.Action
            icon = "delete-empty"
            onPress={clearButtonPressed}
            />
        </Appbar.Header>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currState: state.headerState,
        items: state.store.items
    }
}

export default connect(mapStateToProps)(HeaderNav);