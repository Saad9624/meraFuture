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
import PassWordTextInput from '../../../components/passWordText';
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
    componentDidMount(){
        GoogleSignin.configure({
          androidClientId:'830999258776-7v9belidjk9ju2omdu6n7gnllqll08le.apps.googleusercontent.com'
        });
    };

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id, name,  first_name, last_name,email',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, result) => {
            if (error) {
              console.log('login info has error: ' + error+ result);
            } else {
              this.setState({userInfo: result});
              this.socialLogin(result.first_name , result.last_name,result.email,result.name)
              console.log('result:', result);
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      };
      socialLogin=(firstName,lastName,emailAddress,username)=>{
      
        this.setState({loading:true})
      let URL = API.socialLogin
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
              "email"     : emailAddress,
              "deviceToken"   : "12345678",
              "image"         : "https://demo.com/image.jpg",
              "firstname"     : firstName,
              "lastname"      : lastName,
              "username"      : username
            })
            
            })
        .then((res) => res.json())
        .then(res=>{
          this.setState({loading:false})
            console.log("if",res)
            if(res.token){
            AsyncStorage.setItem("token",res.token)
            AsyncStorage.setItem("customer_id",res.customer_id)
            this.props.navigation.navigate('DrawerStack')
              // alert(res)
            }
            else{
              alert(res.message)
            }
        })
        .catch(err=>{
          console.log("err1",err)
          this.setState({loading:false})
        })
      }
        catch(e){
          console.log("err2",err)
          this.setState({loading:false})
        }
  
      };

     validateForm = () => {
         if(this.state.name ==='' || this.state.email ==='' || this.state.password === ''  || this.state.confirmPassword === ''){
             this.setState({snackbarMsg:'Please Enter all fields.',visible:true})
         }
         else {
            let emailError = fieldValidate(this.state.email, 'email');
            let passwordError = fieldValidate(this.state.password, 'password');
            let confirmpasswordError = fieldValidate(this.state.confirmPassword, 'confirmpassword');
         
          
             if(passwordError.error){
               
                this.setState({snackbarMsg:passwordError.helperText,visible:true})

            }
            else if(confirmpasswordError.error){
                this.setState({snackbarMsg:confirmpasswordError.helperText,visible:true})

            }
            else if(this.state.password !== this.state.confirmPassword){
                this.setState({snackbarMsg:"Password mismatched!",visible:true})

            }
            else{
               this.newSignup()

            }
            
           
         }
        
      };
googleLogin = async () => {
      try {
        //await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userInfo", userInfo);
        this.setState({ userInfo });
        this.socialLogin(userInfo.givenName , userInfo.familyName, userInfo.email,userInfo.name)
      } catch (error) {
        console.log("err", error);
        // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //   // user cancelled the login flow
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //   // operation (e.g. sign in) is in progress already
        // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //   // play services not available or outdated
        // } else {
        //   // some other error happened
        // }
      }
    };
    loginWithFacebook = () => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
          login => {
            if (login.isCancelled) {
              console.log('Login cancelled');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
              });
            }
          },
          error => {
            console.log('Login fail with error: ' + error);
          },
        );
        };
      newSignup=()=>{
 
              this.setState({loading:true})
        let URL = API.signup
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
                'userEmail': this.state.email,
                'userName': this.state.name,
                'password':this.state.password
              })
              
               })
          .then((res) => res.json())
          .then(res=>{
              console.log("if",res)
              this.setState({
                loading:false
            })
              if(res.success){
                
                    alert(res.data)
                   
                
              }
              else{
                  alert(res.errorDetails)
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

    signupPress=()=>{
        this.setState({  loading:true  })
        Axios.post(API.signup, {
            userEmail: this.state.email,
            userName: this.state.name,
            password: this.state.password
          })
          .then(res=>{
            this.setState({  loading:false  })
            alert(res.data.data)
            console.log("if",res.data)
            console.log("if",res.status)

        })
        .catch(err=>{
            console.log("err1",err)
            this.setState({  loading:false  })

          });

    }

     onDismissSnackBar = () => {
        this.setState({visible: false});
      };


    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Toolbar navigation={this.props.navigation} header="SIGN UP" />
                <ScrollView>

                <View style={{marginTop:20}}/>
                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={14}
                    text="Name" 
                    marginVertical={1}/>
                <TextInput
                onChangeText={(name)=>this.setState({name})}
                image={name} withimage />

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

                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Password" 
                    marginVertical={1}/>
                <PassWordTextInput 
                onChangeText={(password)=>this.setState({password})}
                image={confirmpass} 
                    secureTextEntry={true}
                    withimage />

                <TextView color={'grey'}
                    marginHorizontal={10}
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                    fontSize={15}
                    text="Confirm Password" 
                    marginVertical={1}/>
                <PassWordTextInput 
                onChangeText={(confirmPassword)=>this.setState({confirmPassword})}
                secureTextEntry={true}
                image={confirmpass} 
                    withimage />



                <TouchableOpacity
               onPress={()=> this.validateForm()}
               // onPress={()=> this.props.navigation.navigate('DrawerStack')}
                style={styles.btn1}>
                {!this.state.loading &&   <TextView
                   fontSize={15}
                   fontFamily={fonts.Sofia_Pro_Light_Az}
                text="SUBMIT"/> }
                  {this.state.loading &&  <Bubbles size={6} color="#FFF" /> }
                </TouchableOpacity>

                <TextView color="black" fontSize={20}  marginVertical={1} alignSelf="center" text="OR?"/>  

                <TouchableOpacity 
               onPress={()=> this.loginWithFacebook()}
               // onPress={()=> this.props.navigation.navigate('signup')}
                style={styles.btn}>
                    <View style={{left:0,position:'absolute',marginHorizontal:10}}>
                            <Image style={AppStyles.smallMediumImage} source={Faecbook}/>
                    </View>
                   
                    <Text style={styles.text}>Signup with </Text>
                    <Text style={[styles.text,{color:colors.blue,fontFamily:fonts.Sofia_Pro_Light_Az}]} >Facebook</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                onPress={()=> this.googleLogin()}
                style={styles.btn}>
                <View style={{left:0,position:'absolute',marginHorizontal:10}}>
                       <Image style={AppStyles.smallMediumImage} source={google}/>
                    </View>
                 
                    <Text  style={styles.text}>Login with </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.bold,{color:'blue'}]}>G</Text>
                        <Text style={[styles.bold,{color:'red'}]}>o</Text>
                        <Text style={[styles.bold,{color:'yellow'}]}>o</Text>
                        <Text style={[styles.bold,{color:'blue'}]}>g</Text>
                        <Text style={[styles.bold,{color:'green'}]}>l</Text>
                        <Text style={[styles.bold,{color:'red'}]}>e</Text>
                    </View>
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