import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import fonts from '../constants/fonts'

const button = (props) => {
    return (
        <TouchableOpacity 
        
            onPress={()=>props.onPress()}
            style={[styles.btn,{backgroundColor:props.backgroundColor? colors.btnGrey : colors.lightBlue}]}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default button

const styles= StyleSheet.create({
    btn:{
        backgroundColor:colors.lightBlue,
        width:'86%',
        height:50,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
        borderRadius:15
    },
    text:{
        color:'white',
        fontFamily:fonts.Sofia_Pro_Black_Az,
        fontSize:17
    }
})
