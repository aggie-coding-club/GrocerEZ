import React from 'react';
import { State, Item } from "../constants/Interfaces";
import { PageStates } from "../constants/States";
import { connect } from "react-redux";
import ItemList from "./Pages/ItemList";
import { View, StyleSheet, ScrollView } from 'react-native';
import SuggestionList from './Pages/SuggestionList';

interface Props {
    currState: PageStates,
    items: Item[]
}

function Page(props: Props) {
    let result;
    if (props.currState == PageStates.itemList || props.currState == PageStates.itemListPrices) {
        result = <ItemList items={props.items} currState={props.currState}/>
    }
    else if (props.currState == PageStates.suggestionList) {
        result = <SuggestionList/>
    }
    return (
        <ScrollView style={styles.fullPage}>
            {result}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fullPage: {
        flexGrow: 1,

    }
});

const mapStateToProps = (state: State) => {
    return {
        currState: state.pageState,
        items: state.store.items
    }
}

export default connect(mapStateToProps)(Page);