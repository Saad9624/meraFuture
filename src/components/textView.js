import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native' ;
import fonts from '../constants/fonts';

const TextView =(props) =>{
    return(
        <View>
            <Text
            numberOfLines={props.numberOfLines}
            style={{
                backgroundColor:props.backgroundColor,
                 textDecorationLine: props.textDecorationLine,
                 textDecorationStyle:props.textDecorationStyle,  
                 fontSize:props.fontSize ? props.fontSize : 20,
                 color:props.fontColor,
                 width:props.fontWidth,
                 height:props.fontHeigth,
                 marginHorizontal:props.marginHorizontal ? props.marginHorizontal : 10 , 
                 marginVertical:props.marginVertical ? props.marginVertical : 10,
                 fontWeight:props.fontWeight,
                 alignSelf:props.alignSelf,
                 marginTop:props.marginTop,
                 alignItems:props.alignItems,
                 fontFamily:props.fontFamily ? props.fontFamily : fonts.Sofia_Pro_RegularAz ,
                 color:props.color?props.color:'white'

            }}
            >{props.text}</Text>
        </View>
    )
}

export default TextView ;

const styles = StyleSheet.create({

})
