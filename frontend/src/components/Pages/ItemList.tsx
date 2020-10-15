import React from 'react';
import { Item, State } from "../../constants/Interfaces";
import { View } from "react-native";
import { ItemTag, ItemPrice } from '../Item';
import { PageStates } from '../../constants/States';

interface Props {
    items: Item[],
    currState: PageStates
}

// item list for items user selected
export default function ItemList(props: Props) {
    let outputedItems = [];

    for (const item of props.items) {
        if (props.currState === PageStates.itemListPrices) // item display with price and store
            outputedItems.push(<ItemPrice key={item.id} item={item}/>); 
        else
            outputedItems.push(<ItemTag key={item.id} item={item}/>); // item display with search requirments
    }
    // create empty space at end so the items can appear above bottom nav
    outputedItems.push(<View key={-1000} style={{height: 80}}></View>)

    return (<View>{outputedItems}</View>);
}
