import React from 'react'
import { StyleSheet, Text, View,TextInput, Dimensions, Image } from 'react-native'
import AppStyles from '../appstyles'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
const passWordTextInput = (props) => {
    if(props.withimage){
        return (
            <View style={[styles.input1,{width:props.width ? '44%' : '95%',paddingHorizontal:10}]}>


                <Image source={props.image} style={AppStyles.smallMediumImage}/>
                <TextInput
                style={{width:'90%',marginHorizontal:10,fontFamily:fonts.Sofia_Pro_Light_Az}}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}>
                 </TextInput>
            </View>
        )
    }
    else{
        return (
            <TextInput
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            style={[styles.input,{width:props.width ? '44%' : '85%',paddingHorizontal:10}]}>
            
            </TextInput>
        )
    }
    
}

export default passWordTextInput

const styles = StyleSheet.create({
    input:{
        borderColor:'white',
        borderWidth:1,
        alignSelf:'center',
        marginHorizontal:3,
        marginVertical:10,
        fontFamily:fonts.Sofia_Pro_RegularAz,
        color:'black',
        backgroundColor:'white',
        borderRadius:5,
        height:Dimensions.get('window').height / 11,
        
    
    },
    input1:{
        borderColor:'silver',
        borderWidth:1,
        alignSelf:'center',
        marginHorizontal:3,
        marginVertical:1,
        marginBottom:15,
        fontFamily:fonts.Sofia_Pro_RegularAz,
        color:'black',
        backgroundColor:'white',
        borderRadius:2,
        height:Dimensions.get('window').height / 12,
        alignItems:'center',
        flexDirection:'row'
        
    
    }
})
