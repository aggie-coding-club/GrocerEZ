import React from 'react';
import { Item } from '../constants/Interfaces';
import { View, Text, StyleSheet } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';


interface Props {
    item: Item
}

export function ItemTag(props: Props) {
    let tags = [];
    let firstTag = true;

    for (let t in props.item.tags) {
        let tempComp = <Text key={t}>, {props.item.tags[t]}</Text>;
        if (firstTag) {
            tempComp = <Text key={t}>{props.item.tags[t]}</Text>;
            firstTag = false;
        }
        tags.push(tempComp);
    }
    
    return (
        <View style={styles.item}>
            <View style={styles.itemPicContainer}>
                <View style={styles.itemPic}></View>
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                    {props.item.name}
                </Text>
                <View style={styles.itemDetail}>{tags}</View>
            </View>
        </View>
    )
}

export function ItemPrice(props: Props) {    
    let price = ((props.item.price as number) / 100).toFixed(2);
    
    return (
        <View style={styles.item}>
            <View style={styles.itemPicContainer}>
                <View style={styles.itemPic}></View>
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                    {props.item.name}
                </Text>
                <Text style={styles.itemDetail}>{props.item.store}</Text>
            </View>
            <View style={styles.ItemPriceContainer}>
                <Text style={styles.itemPrice}>${price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        borderTopColor: "lightgrey",
        borderTopWidth: 1,
        width: "100%"
    },
    itemPicContainer: {
        display: "flex",
        justifyContent: "center",
        padding: 5,
        marginHorizontal: 10
    },
    itemPic: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: "black",
        overflow: "hidden"
    },
    itemInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    itemName: {
        color: "black",
        fontSize: 17
    },
    itemDetail: {
        display: "flex",
        flexDirection: "row",
        color: "black",
        opacity: 0.6,
        fontSize: 12,
    },
    ItemPriceContainer: {
        flexGrow: 1, 
        alignItems: "flex-end", 
        justifyContent: "center",
        paddingRight: 20
    },
    itemPrice: {
        fontSize: 18
    }
});