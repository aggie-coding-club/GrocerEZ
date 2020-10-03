import React, { useState } from 'react';
import { State } from "../../constants/Interfaces";
import { connect} from "react-redux";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { queryItemSearch } from '../Helper/AsyncCalls';

interface Props {
    searchQuery: string | undefined
}

function SearchResultPage(props: Props) {
    let [results, setResults] = useState(() => []);
    let [loading, setLoading] = useState(() => true);
    let result; 
    if (loading) {
        // set result to loading
        if (props.searchQuery) {
            queryItemSearch(props.searchQuery, 0).then((response) => {
                setResults(response);
                setLoading(false);
            });
        }
    }
    else {
        // use results from backend
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
        searchQuery: state.store.searchQuery
    }
}

export default connect(mapStateToProps)(SearchResultPage);