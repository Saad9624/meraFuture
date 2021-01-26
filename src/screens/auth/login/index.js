import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image,StatusBar
} from 'react-native' ;
import fonts from '../../../constants/fonts';
import TextInput from '../../../components/textInput';
import TextView from '../../../components/textView' ;
import Button from '../../../components/button' ;
import {loginBack} from '../../../constants/images' ;
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import colors from '../../../constants/colors';
import Faecbook from '../../../assets/images/facebook.png';
import google from '../../../assets/images/google.png';
import AppStyles from '../../../appstyles';
import { API } from '../../../api/endPoints';
import axios from 'axios' ;
import {fieldValidate} from '../../../constants/utils';
import {
  Title,
  Subheading,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage' ;
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

class Login extends React.Component{

  state={
    userInfo: {},
    password:'',
    email:'',
    snackbarMsg: '',
    visible: false,
    loading: false,
    emailError: {
        error: false,
        helperText: '',
      },
      passwordError: {
        error: false,
        helperText: '',
      },
      

}

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
    componentDidMount(){
     GoogleSignin.configure({
       androidClientId:'830999258776-7v9belidjk9ju2omdu6n7gnllqll08le.apps.googleusercontent.com'
     });

  //  this.signIn1()
    
       // this.getMoviesFromApiAsyn1c()
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
    validateForm = () => {
      if(this.state.email === '' && this.state.password === ''){
          this.setState({snackbarMsg:'Please Enter Email & Password',visible:true})
      }
      else {
         let emailError = fieldValidate(this.state.email, 'email');
         let passwordError = fieldValidate(this.state.password, 'password');
         console.log("emailError",emailError)
         console.log("passwordError",passwordError)
         if(emailError.error){
             this.setState({snackbarMsg:emailError.helperText,visible:true})

         }
        //  else if(passwordError.error){
            
        //      this.setState({snackbarMsg:passwordError.helperText,visible:true})

        //  }
         else{
          this.loginUser()


         }
         
        
      }
     
    };
    getVideospost=()=>{
  
                
      let URL = API.getVideos
        try{
    
            var details = {};
      
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
      formBody = formBody.join("&");
    
    
          fetch("https://merafuture.pk/api/home/videos?language=ur",
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' ,
              'Authorization' :'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJhaHNhbmtrMTI2QGdtYWlsLmNvbSIsImlhdCI6MTYwNzE2NDczOSwiZXhwIjoxNjA3MjAwNzM5LCJyb2xlIjpudWxsfQ.0m_JdOLP6liPkVb7MgZyqhXww89kqditJVmacClFyUs'
            },
            
            })
        .then((res) => res.json())
        .then(res=>{
            console.log("if",res)
            if(res){
              alert(res)
            }
        })
        .catch(err=>{
          console.log("err1",err)
        })
      }
        catch(e){
          console.log("err2",err)
        }
    
    };

    onDismissSnackBar = () => {
    this.setState({visible: false});
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

     loginUser=()=>{
 
              this.setState({loading:true})
            let URL = API.login
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
                    'deviceToken': '12345678',
                    'password':this.state.password
                  })
                  
                   })
              .then((res) => res.json())
              .then(res=>{
                this.setState({loading:false})
                  console.log("if",res)
                  if(res.token){
                   AsyncStorage.setItem("token",res.token)
                   AsyncStorage.setItem("customer_id",res.customer_id)
                   AsyncStorage.setItem("payment_status",res.payment_status === true ? "true" : "false")
                   AsyncStorage.setItem("fullname",res.fullname)
                   AsyncStorage.setItem("email",res.email)
                   AsyncStorage.setItem("phonenumber",res.phonenumber === null ? 'N/A' : res.phonenumber)
                   AsyncStorage.setItem("profile_percent",res.profile_percent.toString())
                   this.props.navigation.replace('DrawerStack')
                    this.setState({email:'',password:''})
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
          
    }
    

            performLogin=()=>{
              this.setState({  loading:true  })
              Axios.post(API.login, {
                  userEmail: this.state.email,
                  deviceToken :'12345678',
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
    
    render(){
        return(
            <View style={{flex:1}}>
               <StatusBar barStyle={'light-content'} backgroundColor ={colors.blue} translucent={false} /> 
                <ImageBackground style={styles.backImage} source={loginBack}>
                <TextView fontSize={25} marginVertical={30} alignSelf="center" text="LOGIN"/>


                <TextInput  
                onChangeText={(email)=> this.setState({email})}
                placeholder="alag@gmail.com" keyboardType="email-address" />
                
                <TextInput 
                 onChangeText={(password)=> this.setState({password})}
                secureTextEntry={true}  placeholder="Your password" />
                <View style={{alignItems:'center',alignSelf:'center'}}>
                {this.state.loading &&   <Bars size={10} color="#FFF" /> }

                </View>
                <Button 
              onPress={()=> this.validateForm()}
              //  onPress={()=> this.props.navigation.navigate('DrawerStack')}
                title={'SIGN IN'}/>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('signup')} >
                    <TextView
                    fontFamily={fonts.Sofia_Pro_MediumAz}
                    color="black" fontSize={15} 
                    marginVertical={-5} alignSelf="center" text="Don't have an account? Signup"/>  
                </TouchableOpacity>
               
                {/* <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
              });
            }
          }}
          onLogoutFinished={() => this.setState({userInfo: {}})}
        /> */}
         {/* {this.state.userInfo.name && (
          <Text style={{fontSize: 16, marginVertical: 16}}>
            Logged in As {this.state.userInfo.name}
          </Text>
        )} */} 
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ForGotPass')} >
                     <TextView
                fontFamily={fonts.Sofia_Pro_MediumAz}
                color="black" fontSize={13} 
                 marginVertical={20} alignSelf="center" text="FORGOT DETAILS?"/>  
                </TouchableOpacity>

               
                <TextView color="black" fontSize={20}  marginVertical={1} alignSelf="center" text="OR?"/>  

                <TouchableOpacity 
                onPress={()=> this.loginWithFacebook()}
                style={styles.btn}>
                    <View style={{left:0,position:'absolute',marginHorizontal:10}}>
                            <Image style={AppStyles.smallMediumImage} source={Faecbook}/>
                    </View>
                   
                    <Text style={styles.text}>Login with </Text>
                    <Text style={[styles.text,{color:colors.blue,fontFamily:fonts.Sofia_Pro_Black_Az}]} >Facebook</Text>
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
                </ImageBackground>
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
        borderRadius:20,
        width:'60%',
        height:40,
        alignSelf:'center',
        marginVertical:10
    },
    backImage:{
        flex:1,
        width:'100%',
        height:'100%',
        resizeMode:'contain',
        backgroundColor:colors.blue
    },
    text:{
        fontFamily:fonts.Sofia_Pro_Light_Az,

    },
    bold:{
        fontFamily:fonts.Sofia_Pro_Black_Az
    }
})