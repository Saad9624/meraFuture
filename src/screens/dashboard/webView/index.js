import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity,Modal,View, Alert,BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../api/endPoints';
import TextView from '../../../components/textView';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import Toolbar from '../../../components/toolbar';
import { CommonActions } from '@react-navigation/native';

// ...
class MyWebComponent extends Component {
    state={
        selectedType:'',
        selectedAmount:'',
        discountCode:'',
        customerID:'',
        modalVisible:true,
        phonenumber:'',
        fullname:'',
        email:'',
        token:'',


    }
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack1);
      }



   async componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.goBack1);
    const token = await AsyncStorage.getItem("token")
    const customerID = await AsyncStorage.getItem("customer_id")
    const fullname = await AsyncStorage.getItem("fullname")
    const email = await AsyncStorage.getItem("email")
    const phonenumber = await AsyncStorage.getItem("phonenumber")
    this.setState({
        customerID , email, fullname , phonenumber,token
    })
        if(this.props.route.params){
            const selectedType = this.props.route.params.selectedType 
            const selectedAmount = this.props.route.params.selectedAmount
            const discountCode = this.props.route.params.discountCode
            
            console.log(selectedType)
            console.log(selectedAmount)
            console.log(discountCode)
            this.setState({selectedType,selectedAmount,discountCode})
        }
      //  this.checkPaymentInquiry()
    }
    showAlert=(data)=>{
      Alert.alert(
        '',
        data,
        
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }

    goBack1=()=>{
      // this.props.navigation.navigaste('Home')
      this.props.navigation.goBack()
      //alert("yes")
      // this.props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       { name: 'Home' },
    
      //     ],
      //   })
      // )
    }

    checkPaymentInquiry=()=>{

      
    let URL = API.checkpaymentStatus ;
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
        Authorization: `Bearer ${this.state.token}`
    
      },
      body:JSON.stringify({
          'name': this.state.fullname,
          'email': this.state.email,
          'phone': this.state.phonenumber,
          'address' : 'Karachi'
          // "name" : "Ahsan",
          // "email": "ahsankk126@gmail.com",
          // "phone" : "03133255662",
          // "address" : "Karachi"
        })
      
       })
    .then((res) => res.json())
    .then(res=>{
      console.log("if",res)
      console.log("if",res)
      if(res.data){
        this.showAlert(res.data)
      }
      else if(res.errorDetails){
        this.showAlert(res.errorDetails)
      }
     
     
       
        
            this.setState({
                loading:false
                
            })
             this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Home' },
          
                ],
              })
            )
        
  
    })
    .catch(err=>{
    console.log("err1",err)
    })
    }
    catch(e){
    console.log("err2",err)
    }
    
    }
   

    _onNavigationStateChange(webViewState){
        console.log(webViewState.url)
        if(webViewState.url === "https://merafuture.pk/dashboard"){

        this.checkPaymentInquiry()
          // this.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [
          //       { name: 'Home' },
        
          //     ],
          //   })
          // )
        }
      }
      MessageStateChange(msg){
        console.log("--->>",msg)
      }

      onMessage(message) {
        console.log("--->>>",message);
      }

      show () {
        this.setState({ modalVisible: true })
      }
      
      hide () {
        this.setState({ modalVisible: false })
      }

  render() {
      const {selectedType,selectedAmount,discountCode,customerID}= this.state  ; 

    return (<WebView
      style={{height:'100%',width:'100%',flex:1}}
      onMessage={this.onMessage}
      injectedJavaScript="window.postMessage(document)"
      javaScriptEnabled = {true}
      domStorageEnabled = {true}
      startInLoadingState={false}
      onNavigationStateChange={this._onNavigationStateChange.bind(this)}
  
      //onMessage={this.handleMessage}
      // source={{ uri: `https://merafuture.pk/api/auth/sendamount?amount=10&type=test&code=fdasda&user_id=5749` }} />
      source={{ uri: `https://merafuture.pk/api/auth/sendamount?amount=${selectedAmount}&type=${selectedType}&code=${discountCode}&user_id=${customerID}` }} />
  //     <View>
        
  //       <Toolbar navigation={this.props.navigation} header="PAY FEE" />
  //     <Modal
  //   animationType={'slide'}
  //   visible={this.state.modalVisible}
  //   onRequestClose={this.hide.bind(this)}
  //   transparent
  // >
  //   <View style={styles.centeredView}>
  //     <View style={styles.modalView1} >
  //     <WebView
  //   style={{height:'100%',width:'100%',flex:1}}
  //   onMessage={this.onMessage}
  //   injectedJavaScript="window.postMessage(document)"
  //   javaScriptEnabled = {true}
  //   domStorageEnabled = {true}
  //   startInLoadingState={false}
  //   onNavigationStateChange={this._onNavigationStateChange.bind(this)}

  //   //onMessage={this.handleMessage}
  //   source={{ uri: `https://merafuture.pk/api/auth/sendamount?amount=10&type=test&code=fdasda&user_id=5749` }} />
  //   {/* // source={{ uri: `https://merafuture.pk/api/auth/sendamount?amount=${subTotal}&type=${selectedType}&code=${discountCode}&user_id=${customerID}` }} /> */}
  //       {/* <TouchableOpacity onPress={this.hide.bind(this)} style={styles.btnStyle}>
  //         <Text style={styles.closeStyle}></Text>
  //       </TouchableOpacity> */}
  //            {/* <TouchableOpacity  onPress={this.hide.bind(this)}style={styles.btn1}>
  //                  <TextView
  //                  fontSize={15}
  //                  fontFamily={fonts.Sofia_Pro_Light_Az}
  //                  text="close"/>
  //               </TouchableOpacity> */}
  //     </View>
  //   </View>
  // </Modal>
  // </View>
    ) 
  }
}

export default MyWebComponent ; 


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

  },
  modalView1: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:50
  },
  centeredView:{
    flex: 1,
    justifyContent: "center",
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100, 0.5)',
    padding: 5,
  }
})
