import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,StatusBar} from 'react-native'
import AppStyles from '../appstyles';
import colors from '../constants/colors';
import TextView from './textView';
import {
    back,
    burger,
    logo
} from '../constants/images';
import fonts from '../constants/fonts';
import download from '../assets/images/download.png' ;
import name from '../assets/images/name.png';

const toolbar = (props) => {
    return (
        <View style={styles.row}>
                        <StatusBar barStyle={'light-content'} backgroundColor ={colors.darkBlue} translucent={false} /> 

            <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <TouchableOpacity onPress={()=>
                 props.home ? 
                  props.navigation.toggleDrawer()
                   :
                    props.clearBackStack? 
                     props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                { name: 'Home' },
                        
                              ],
                            })
                          )
                          :
                      props.onPressStack ? 
                       props.s
                        :
                         props.navigation.goBack() }>
                             
                        <Image style={AppStyles.smallMediumImage}
                         source={props.home ? burger : back}/>

                </TouchableOpacity>
               
            </View>
            {props.home ? 
            
        <Image style={{alignSelf:'center',width:130,height:45,resizeMode:'contain'}} source={logo}/> :  <TextView 
        fontSize={18}
        fontFamily={fonts.Sofia_Pro_Light_Az}
       text={props.header}
       /> }
                

                <TouchableOpacity onPress={()=> props.profile? props.navigation.navigate('Profile') : null}
                     style={{marginRight:10}} >
                        <Image style={[AppStyles.smallMediumImage,{tintColor:'white'}]}
                        source={props.download ?download : props.profile ? name : null}/>

                </TouchableOpacity>
{/* 
            <View style={{flexDirection:'row'}}>
                <Image style={[AppStyles.smallImage,{marginHorizontal:10}]} source={home}/>
                <Image style={AppStyles.smallImage} source={search}/>

            </View> */}
        </View>
    )
}

export default toolbar ;

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        alignItems:'center'
        ,backgroundColor:colors.blue,
    },

})
