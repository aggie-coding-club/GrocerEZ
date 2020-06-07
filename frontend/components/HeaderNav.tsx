import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import StoreSelector from './StoreSelectorButton';
import { headerStates } from './States';

export class HeaderNav extends Component {
    
    constructor(props) {
        super(props)
        let currState = headerStates.title;
        if (props != null && props.currState) {
            currState = props.currState;
        }
        this.state = {currState, searchQuery: ''};
    }

    render() {
        let result;
        switch (this.state.currState) {
            case headerStates.total:
                result = (
                    <Appbar.Header>
                        <Appbar.BackAction onPress={()=>{}} />
                        <Appbar.Content title="GrocerEZ" />
                        <StoreSelector/>
                    </Appbar.Header>
                );
                break;
            case headerStates.search:
                result = (
                    <Appbar.Header>
                        <Searchbar 
                            style={{elevation: 0}}
                            placeholder="Search"
                            onChangeText={(query) => {this.setState({searchQuery: query})}}
                            value={this.state.searchQuery}    
                        />
                    </Appbar.Header>
                );
                break;
            default:
                result = (
                    <Appbar.Header>
                        <Appbar.Content title="GrocerEZ" />
                    </Appbar.Header>
                );
                break;
        }


        return (
            result
         );
    }
}

HeaderNav.defaultProps = {
    currState: headerStates.title,
};

HeaderNav.propTypes = {
    currState: PropTypes.string,
};

const styles = StyleSheet.create({

});