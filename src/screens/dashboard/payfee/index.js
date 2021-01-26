import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native' ;
import fonts from '../../../constants/fonts';
import TextInput from '../../../components/textInput';
import TextView from '../../../components/textView' ;
import Button from '../../../components/button' ;
import Toolbar from '../../../components/toolbar';
import colors from '../../../constants/colors';
import AppStyles from '../../../appstyles';
import name from '../../../assets/images/name.png';
import email from '../../../assets/images/emai.png';
import phone from '../../../assets/images/phone.png';
import address from '../../../assets/images/address.png';

import creditCard from '../../../assets/images/creditCard.png';
import bankTransfer from '../../../assets/images/bankTransfer.png';
import jazz from '../../../assets/images/jazz.png';
import { RadioButton } from 'react-native-paper';

import {
 fillBox,box
} from '../../../constants/images' ;

class Login extends React.Component{

    state={
        checked:''
    }

    render(){
        const {checked}= this.state ;
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Toolbar navigation={this.props.navigation} header="PAY FEE" />
                <View style={{marginVertical:10}}/>
                <ScrollView>
                <TextView color="grey" fontSize={11} 
                 marginVertical={1} alignSelf="center" text="Pay securely via Debit/Credit Card, Jazz Cash Mobile Account,"/>  
  <TextView color="grey" fontSize={11} 
                 marginVertical={1} alignSelf="center" text="or Jazz Cash Voucher"/>  

                <View style={[AppStyles.row,{marginTop:10}]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <RadioButton
                                                value="first"
                                                status={ checked === 'first' ? 'checked' : 'unchecked' }
                                                onPress={() => this.setState({checked:'first'})}
                                            />

                         {/* <Image source={fillBox} style={AppStyles.smallImage}/> */}
                         <TextView color={'black'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={14}
                    text="Pay for Test" 
                    marginVertical={1}/>
                    </View>
                    <TextView color={'black'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Black_Az}
                    fontSize={14}
                    text="PKR, 1000" 
                    marginVertical={1}/>
                </View>
                <View style={{marginVertical:10}}/>

                <View style={AppStyles.row}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <RadioButton
                                                value="second"
                                                status={ checked === 'second' ? 'checked' : 'unchecked' }
                                                onPress={() => this.setState({checked:'second'})}
                                            />
                         {/* <Image source={box} style={AppStyles.smallImage}/> */}
                         <TextView color={'black'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={14}
                    text="Pay for Counselling Session" 
                    marginVertical={1}/>
                    </View>
                    <TextView color={'black'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Black_Az}
                    fontSize={14}
                    text="PKR, 5000" 
                    marginVertical={1}/>
                </View>
             

                <View style={{marginTop:20}}/>
                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={14}
                    text="Name" 
                    marginVertical={1}/>
                <TextInput
                
                image={name}
                withimage />

                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Email" 
                    marginVertical={1}/>
                <TextInput 
                image={email}
                    keyboardType="email-address"
                    withimage />

                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Phone" 
                    marginVertical={1}/>
                <TextInput 
                image={phone}
                    withimage />

                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Confirm Password" 
                    marginVertical={1}/>
                <TextInput 
                image={address}
                    withimage />



                <TouchableOpacity style={styles.btn1}>
                   <TextView
                   fontSize={15}
                   fontFamily={fonts.Sofia_Pro_Light_Az}
                   text="PAY BY CASH ON DELIVERY"/>
                </TouchableOpacity>

                <TextView color="black" fontSize={20} 
                 marginVertical={1} alignSelf="center" text="OR?"/>  

                <TouchableOpacity >
                <Image source={creditCard} style={AppStyles.largeImage1}/>
                </TouchableOpacity>
                
                <TouchableOpacity >
                <Image source={jazz} style={AppStyles.largeImage1}/>
                </TouchableOpacity>

                <TouchableOpacity >
                <Image source={bankTransfer} style={AppStyles.largeImage1}/>
                </TouchableOpacity>
                </ScrollView>
             </View>
        )
    }
}
export default Login ;

const styles = StyleSheet.create({
    btn:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        flexDirection:'row',
        backgroundColor:'white',
        borderColor:'silver',
        borderRadius:20,
        width:'70%',
        height:40,
        alignSelf:'center',
        marginVertical:10,
        borderWidth:1
    },
    btn1:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        flexDirection:'row',
        backgroundColor:colors.blue,
        borderRadius:20,
        width:'65%',
        height:40,
        alignSelf:'center',
        marginVertical:10
    },

    text:{
        fontFamily:fonts.Sofia_Pro_Light_Az,

    }
})