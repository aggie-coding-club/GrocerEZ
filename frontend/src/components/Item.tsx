import React from 'react';
import { Item } from '../constants/Interfaces';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Defs, ClipPath, Circle, Image } from 'react-native-svg';


interface Props {
    item: Item
}

let picHeight = 60;
let picWidth = 60;

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
                <Svg width={picWidth} height={picHeight}>
                    <Defs>
                        <ClipPath id="clipPath">
                            <Circle r={picHeight/2} cx={picWidth/2} cy={picHeight/2}/>
                        </ClipPath>
                    </Defs>
                    <Image width={picWidth} height={picHeight} preserveAspectRatio="xMidYMid slice" href={{uri: props.item.pic}} clipPath="#clipPath"/>
                </Svg>
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
                <Svg width={picWidth} height={picHeight}>
                    <Defs>
                        <ClipPath id="clipPath">
                            <Circle r={picHeight/2} cx={picWidth/2} cy={picHeight/2}/>
                        </ClipPath>
                    </Defs>
                    <Image width={picWidth} height={picHeight} preserveAspectRatio="xMidYMid slice" href={{uri: props.item.pic}} clipPath="#clipPath"/>
                </Svg>
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