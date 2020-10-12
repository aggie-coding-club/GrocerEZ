import React from 'react';
import { State } from "../../constants/Interfaces";
import { connect, useDispatch } from "react-redux";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActionTypes } from '../../constants/ActionTypes';

interface Props {
    suggestions: string[]
}

// create list of suggestions for searching
function SuggestionList(props: Props) {
    const dispatch = useDispatch();

    // dispatch new query once a suggestion is chosen
    const newQuery = (query: string) => {
        // console.log(query);
        dispatch({type: ActionTypes.queryItem, searchQuery: query});
    }

    let suggest = [];
    for (let i = 0; i < props.suggestions.length; i++) {
        suggest.push(<TouchableOpacity style={styles.suggestItem} key={i} onPress={() => {newQuery(props.suggestions[i])}}><Text style={styles.suggestItemText}>{props.suggestions[i]}</Text></TouchableOpacity>);
    }

    return (
        <ScrollView style={styles.fullPage}>
            {suggest}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fullPage: {
        flexGrow: 1,
    },
    suggestItem: {
        padding: 10,
    },
    suggestItemText: {
        fontSize: 16
    }
});

const mapStateToProps = (state: State) => {
    return {
        suggestions: state.store.suggestions
    }
}

export default connect(mapStateToProps)(SuggestionList);