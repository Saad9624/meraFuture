import {
    Dimensions,
    StyleSheet
} from 'react-native'
import fonts from '../constants/fonts';


const HEIGHT = Dimensions.get('window').height ;
const WIDHT = Dimensions.get('window').width ;


const AppStyles = StyleSheet.create({

    row:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:10
    },
    title:{
        marginHorizontal:10,
        fontFamily:fonts.Sofia_Pro_RegularAz,
        fontSize:18,
        marginVertical:10
    },
    largeImage2:{
            width:150,
            height:150,
            resizeMode:'contain',
            marginVertical:5
    }, 
    largeImage3:{
        width:250,
        height:180,
        resizeMode:'contain',
        marginVertical:5
},  
largeImage4:{
    width:'90%',
    height:180,
    resizeMode:'contain',
    marginVertical:5
}, 
    normalText:{
        marginHorizontal:10,
        fontFamily:fonts.Sofia_Pro_Light_Az,
        fontSize:16,
    },
    bottom:{
        width:'100%',
        marginVertical:10,
        marginBottom:50,
        marginTop:90
    },
    rowalign:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:10
    },
    rowJustify:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:5,
        marginVertical:10,
        justifyContent:'space-between'
    },
    smallImage:{
        width:20,
        height:13,
        resizeMode:'contain',
        marginHorizontal:0
    },
    smallMediumImage:{
        width:20,
        height:20,
        resizeMode:'contain',
        marginHorizontal:0
    },
    mediumImage:{
        width:40,
        height:40,
        resizeMode:'contain',
        marginVertical:5,
        alignSelf:'center'
    },
    semiLarge:{
        width:100,
        height:100,
        resizeMode:'contain',
        alignSelf:'center',
    },
    largeImage:{
        width:160,
        height:140,
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:50
    },
    largeImage1:{
        width:200,
        height:40,
        resizeMode:'contain',
        alignSelf:'center',
        marginVertical:5
    },
    alignBottom:{
        bottom:0,
        position:'absolute',
        marginBottom:20,
        width:'100%'
    },
    pickerItemStyle:{
       fontFamily:fonts.Sofia_Pro_RegularAz ,
       fontSize:20
    },
    line:{
        width:'90%',
        marginVertical:10,
        height:1,
        marginHorizontal:10,
        backgroundColor:'silver'
    }
})

export default AppStyles ; 