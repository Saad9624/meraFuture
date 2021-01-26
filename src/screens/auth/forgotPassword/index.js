import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Image
} from 'react-native' ;
import {
    Title,
    Subheading,
    HelperText,
    Snackbar,
  } from 'react-native-paper';
import fonts from '../../../constants/fonts';
import TextInput from '../../../components/textInput';
import TextView from '../../../components/textView' ;
import Button from '../../../components/button' ;
import Toolbar from '../../../components/toolbar';
import colors from '../../../constants/colors';
import name from '../../../assets/images/name.png';
import email from '../../../assets/images/emai.png';
import confirmpass from '../../../assets/images/confrmpas.png';
import Faecbook from '../../../assets/images/facebook.png';
import google from '../../../assets/images/google.png';
import AppStyles from '../../../appstyles';
import {fieldValidate} from '../../../constants/utils';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Axios from 'axios';
import { API } from '../../../api/endPoints';
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    LoginManager,
    GraphRequestManager,
  } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage' ;

class Login extends React.Component{

    state={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        snackbarMsg: '',
        visible: false,
        loading:false,
        emailError: {
            error: false,
            helperText: '',
          },
          passwordError: {
            error: false,
            helperText: '',
          },
          userInfo: {},

    }
 
 

      newSignup=()=>{
 
              this.setState({loading:true})
        let URL = API.forgotPassword
          try{
      
              var details = {};
        
      var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
        formBody = formBody.join("&");
      
      
            fetch(URL,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' ,
              },
              body:JSON.stringify({
                'email': this.state.email,
              })
              
               })
          .then((res) => res.json())
          .then(res=>{
              console.log("if",res)
              this.setState({
                loading:false
            })
              if(res.pwdResetStatus){
                this.setState({snackbarMsg:res.message,visible:true})
                // /this.props.navigation.goBack()
                   
                
              }
              else{
                  if(res.userRegMessage){
                    this.setState({snackbarMsg:res.userRegMessage,visible:true})

                   
                  }
                  else{
                    this.setState({snackbarMsg:res.message,visible:true})

                  }
                  
              }
          })
          .catch(err=>{
            console.log("err1",err)
          })
         }
          catch(e){
            this.setState({
                loading:false
            })
            console.log("err2",err)
          }
      
}
onDismissSnackBar = () => {
    this.setState({visible: false});
    };


    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Toolbar navigation={this.props.navigation} header="FORGOT PASSWORD" />
                <ScrollView>

                <View style={{marginTop:20}}/>
               
                <TextView color="black" fontSize={20}  marginVertical={1} alignSelf="center" text="Enter Email to reset your password"/>  
                
                <View style={{marginTop:20}}/>
                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Email" 
                    marginVertical={1}/>
                <TextInput 
                onChangeText={(email)=>this.setState({email})}
                image={email} 
                    keyboardType="email-address"
                    withimage />

          

             



                <TouchableOpacity
               onPress={()=> this.newSignup()}
               // onPress={()=> this.props.navigation.navigate('DrawerStack')}
                style={styles.btn1}>
                {!this.state.loading &&   <TextView
                   fontSize={15}
                   fontFamily={fonts.Sofia_Pro_Light_Az}
                text="SUBMIT"/> }
                  {this.state.loading &&  <Bubbles size={6} color="#FFF" /> }
                </TouchableOpacity>

              

            
                
                
                </ScrollView>
                <Snackbar
                duration={1000}
        visible={this.state.visible}
        onDismiss={()=> this.onDismissSnackBar()}
        action={{
          onPress: () => {
            this.onDismissSnackBar();
          },
        }}>
        {this.state.snackbarMsg}
      </Snackbar>
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
        width:'60%',
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
        width:'50%',
        height:40,
        alignSelf:'center',
        marginVertical:10
    },

    text:{
        fontFamily:fonts.Sofia_Pro_Light_Az,

    },
    bold:{
        fontFamily:fonts.Sofia_Pro_MediumAz
    }
})