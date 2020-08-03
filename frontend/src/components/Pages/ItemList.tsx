import React from 'react';
import { Item, State } from "../../constants/Interfaces";
import { connect } from "react-redux";
import { View } from "react-native";
import { ItemTag, ItemPrice } from '../Item';
import { PageStates } from '../../constants/States';

interface Props {
    items: Item[],
    currState: PageStates
}

export default function ItemList(props: Props) {
    let ouputedItems = [];

    for (const item of props.items) {
        if (props.currState == PageStates.itemListPrices)
            ouputedItems.push(<ItemPrice key={item.id} item={item}/>);
        else
            ouputedItems.push(<ItemTag key={item.id} item={item}/>);
    }

    ouputedItems.push(<View key={-1000} style={{height: 80}}></View>)

    return (<View>{ouputedItems}</View>);
}