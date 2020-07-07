import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import StoreSelector from './StoreSelectorButton';
// import {  } from './SuggestionList';
import { headerStates, globalStates } from '../constants/States';
import { State } from '../constants/Interfaces';
import { actionTypes } from '../constants/ActionTypes';

interface Props {
    currState: headerStates
}

function HeaderNav(props: Props) {
    let [clearQuery, setClearQuery] = useState(() => false);
    let [query, setQuery] = useState(() => "");

    const dispatch = useDispatch();
    
    useEffect(() => {
        function backButtonPressed() {
            dispatch({type: globalStates.listSelection});
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress', backButtonPressed);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backButtonPressed);
        }
    })
    
    const backToItemList = () => {
        dispatch({type: globalStates.listSelection});
    }

    let result = (
        <Appbar.Header>
            <Appbar.Content title="GrocerEZ"/>
        </Appbar.Header>
    );
    switch (props.currState) {
        case headerStates.storeSelect:
            result = (
                <Appbar.Header>
                    <Appbar.BackAction onPress={backToItemList} />
                    <Appbar.Content title="GrocerEZ" />
                    <StoreSelector/>
                </Appbar.Header>
            );
            break;
        case headerStates.search:
            const updateQuery = (changedQuery: string) => {
                setQuery(changedQuery);
            }
        
            const submitQuery = () => {
                setClearQuery(true);
                dispatch({type: actionTypes.queryItem, payload: {searchQuery: query}});
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
            if (clearQuery) {
                setQuery("");
                setClearQuery(false);
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