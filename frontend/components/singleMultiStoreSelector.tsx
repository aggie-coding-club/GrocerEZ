import React from 'react';
import { View, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';

export default function StoreSelector() {
    return (
        <View style={{flexDirection: "row", paddingRight: 10}}>
            <TouchableOpacity style= {{margin: 0, borderColor: "#00E676", borderWidth: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderRightWidth: 0}}>
                <Icon name="store" size={25} style={{paddingHorizontal: 8, paddingVertical: 3}}/>
            </TouchableOpacity>
            <TouchableOpacity style= {{backgroundColor: "#B9F6CA", margin: 0, borderColor: "#00E676", borderWidth: 1, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderLeftWidth: 0}}>
                <View style={{paddingHorizontal: 5, paddingVertical: 3}}>
                    <Svg width={30} height={27} viewBox="0 0 30 27" fill="none">
                        <Path
                            d="M26.667 9.667H13.333v1.666h13.334V9.667zM27.5 18v-1.667l-.833-4.166H13.333l-.833 4.166V18h.833v5h8.334v-5H25v5h1.667v-5h.833zM20 21.333h-5V18h5v3.333z"
                            fill="#000"
                        />
                        <Path
                            d="M16.667 3.333H3.333V5h13.334V3.333zm.833 8.334V10l-.833-4.167H3.333L2.5 10v1.667h.833v5h8.334v-5H15v5h1.667v-5h.833zM10 15H5v-3.333h5V15z"
                            fill="#000"
                        />
                    </Svg>
                </View>
            </TouchableOpacity>
        </View>
    );
}