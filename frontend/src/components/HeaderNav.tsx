import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import StoreSelector from './StoreSelectorButton';
import { HeaderStates, GlobalStates } from '../constants/States';
import { State } from '../constants/Interfaces';
import { ActionTypes } from '../constants/ActionTypes';

interface Props {
    currState: HeaderStates
}

function HeaderNav(props: Props) {
    const dispatch = useDispatch();
    let [clearQuery, setClearQuery] = useState(() => false);
    let [query, setQuery] = useState(() => "");
    
    // Used to tell whether or not back button eventlistening has been added on Android devices
    let [hasBackEvent, setHasBackEvent] = useState(() => false);
    function backButtonPressed() {
        dispatch({type: GlobalStates.listSelection});
        return true;
    }
    
    const backToItemList = () => {
        dispatch({type: GlobalStates.listSelection});
    }

    let result = (
        <Appbar.Header>
            <Appbar.Content title="GrocerEZ"/>
        </Appbar.Header>
    );
    switch (props.currState) {
        case HeaderStates.storeSelect:
            result = (
                <Appbar.Header>
                    <Appbar.BackAction onPress={backToItemList} />
                    <Appbar.Content title="GrocerEZ" />
                    <StoreSelector/>
                </Appbar.Header>
            );
            break;
        case HeaderStates.search:
            // Implemented for convenient back button functionality for Android devices
            if (!hasBackEvent) {
                BackHandler.addEventListener('hardwareBackPress', backButtonPressed);
                setHasBackEvent(true);
            }

            const updateQuery = (changedQuery: string) => {
                setQuery(changedQuery);
            }
        
            const submitQuery = () => {
                setClearQuery(true);
                // console.log(query);
                dispatch({type: ActionTypes.queryItem, searchQuery: query});
            }
        
            result = (
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
            break;
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

    return result;
}

const mapStateToProps = (state: State) => {
    return {
        currState: state.headerState
    }
}

export default connect(mapStateToProps)(HeaderNav);