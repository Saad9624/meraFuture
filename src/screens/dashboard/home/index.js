import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions,Linking,Modal, ScrollView,
    Picker, BackHandler,Alert,TextInput,
    ActivityIndicator} from 'react-native'
import AppStyles from '../../../appstyles';
import Toolbar from '../../../components/toolbar';
import TextView from '../../../components/textView'
import fonts from '../../../constants/fonts';
import career1 from '../../../assets/images/career1.jpg' ;
import career2 from '../../../assets/images/career2.jpg' ;
import career3 from '../../../assets/images/career3.jpg' ;
import career4 from '../../../assets/images/career4.jpg' ;
import career5 from '../../../assets/images/career5.jpg' ; 
import career6 from '../../../assets/images/career6.jpg' ; 
import career7 from '../../../assets/images/career7.jpg' ; 
import glasses from '../../../assets/images/glasses.jpg' ; 
import contact from '../../../assets/images/contact.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../../constants/colors';
import { API } from '../../../api/endPoints';
import Like from '../../../assets/images/like.png'
import UnLike from '../../../assets/images/unlike.png'
import { CommonActions } from '@react-navigation/native';
import creditCard from '../../../assets/images/creditCard.png';
import bankTransfer from '../../../assets/images/bankTransfer.png';
import jazz from '../../../assets/images/jazz.png';

var value = 0 ;
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[
            // {cat_name:'MULTIDIMENSIONAL', catName2:'CAREER COUNSELLING TEST' ,image:career1},
            // {cat_name:'BOOK APPOINTMENT' , catName2:'WITH CAREER COUNSELLOR' ,image:career6},
            {cat_name:'UNIVERSITIES', catName2:'AND DEGREES',image:career7,route:'Universities',backgroundColor:'#a55500'},
            {cat_name:'ADVICE FROM', catName2:'PROFESSIONALS',image:career4,route:'Video' , backgroundColor :colors.blue},
            {cat_name:'CONTACT US', catName2:'' ,image:contact,backgroundColor :'#ff8000'},
            {cat_name:'FAQS', catName2:'',image:glasses,route:'Faqs',backgroundColor :'green'},
        ],
        cityModalVisiblity:false,
        token:'',
        customerID:'',
        appointeMentType:'',
        suitableDay:'' ,
        furtherguidance:false,
        discussmyreport:false,
        appointmentDialog:false , 
        checkpaymentStatusLoading:false,
        loading:false ,
        suitableDay:'',
        time:'',
        session:'',
        whyNeed:[],
        easyPaisaModal:false,
        paymentMethodModal:false,
        bankTransfeModalVisibility:false,
        codModalVisibility:false,
        discountCode:'',
        codName:'',
        codEmail:'',
        codPhone:'',
        codAddress:'',
        discount:'',
        discounted:'',
        selectedAmount:'',
        afterDiscount:false,
        subTotal:'',
        selectedType:'',
        paymentStatus:'',
        hidePaymentMethodButtons:true,
        paymentMethodsHeight:520


    }
}


// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
// }

handleBackButton = () => {
  Alert.alert(
      'MeraFuture',
      'Are you sure you want to close the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   return true;
 }


async componentDidMount(){
  
  //alert("ues")
    const token = await AsyncStorage.getItem("token")
    const customerID = await AsyncStorage.getItem("customer_id")
    const paymentStatus = await AsyncStorage.getItem("payment_status")
    this.setState({
        token,
        customerID,
        paymentStatus
    })
    this.checkValidToken()
    if(this.props.route.params){
      const from = this.props.route.params.from 
      if(from === "openPopUp"){
        this.setState({cityModalVisiblity:true})
      }
    }

    //this.CodPayment()
    //this.checkDiscountService()
    
   // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
   //this.BookAppointment()s
  // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.checkPaymentStatusEveryTime()
}

openMail=()=>{
Linking.openURL('mailto:merafuturepk@gmail.com') 

}

BookAppointment = async () => {
    this.setState({loading:true,appointmentDialog:false})
    var obj = {  
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'

       
      },
      body:JSON.stringify({
        "appointment_id"     : 0,
        "customer_id"   : this.state.customerID,
        "whyneed"         : this.state.whyNeed,
        "appointmenttype"     : this.state.appointeMentType,
        "day"      : this.state.suitableDay,
        "time"      : this.state.time,
        "session" : this.state.session
      })
    }

    console.log("obje" , obj);

    try {
      let response = await fetch(
        API.bookAppointment, obj
      );
      let json = await response.json();
      this.setState({loading:false,appointmentDialog:false})
      if(json.success == true){
        //this.showAlert(json.data)
        this.checkPaymentStatus()
      }
      
      
       console.log("success",json);
       this.setState({
       })
    } catch (error) {
        this.setState({loading:false,appointmentDialog:false})
      console.error("error",error);
    }
  };

  checkValidToken = async () => {
    var obj = {  
      method: 'GET',
      headers: {
        Authorization:  `Bearer ${this.state.token}`
       
      },
    }

    try {
      let URL = API.checkToken ;
      let response = await fetch(URL, obj
      );
      let json = await response.json();
      console.log(json)
      if(json.success === true){
       
       // this.props.navigation.navigate('Auth Stack')
      }
      else{
     
        AsyncStorage.removeItem("token")
        AsyncStorage.removeItem("customer_id")
        this.props.navigation.replace('Auth Stack')
        alert(json.status)
      }

     
       console.log("success",json);
    } catch (error) {
      console.error("error",error);
    }
  };

  

  checkDiscountService=()=>{
 
    this.setState({loading:true})
  let URL = API.checkDiscount
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
          Authorization:  `Bearer ${this.state.token}`
        },
        body:JSON.stringify({
          'code': this.state.discount //  'VD7863AX',
        })
        
         })
    .then((res) => res.json())
    .then(res=>{
      this.setState({loading:false})
        console.log("if",res)
        if(res.success){
          this.setState({discounted:res.data.amount})
          const selectedAmount = this.state.selectedAmount - res.data.amount ;
          if(selectedAmount === 0){
            this.setState({hidePaymentMethodButtons:false,paymentMethodsHeight:300})
          }
          this.setState({selectedAmount,afterDiscount:true})
          this.showAlert(res.data.message)
         
        }
        else{
           alert(res.errorDetails)
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

CodPayment=()=>{
 
  this.setState({loading:true})
let URL = API.cod
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
        'name': this.state.codName,
        'email':this.state.codEmail,
        'phone':this.state.codPhone,
        'address':this.state.codAddress
      })
      
       })
  .then((res) => res.json())
  .then(res=>{
    this.setState({loading:false})
      console.log("if",res)
      if(res.success){
        alert(res.errorDetails)
      }
      else{
         alert(res.errorMessage)
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

renderCityModal=()=>{
    return(
        <Modal
        backdropColor={'black'}
        backdropOpacity= {1}
          animationType="fade"
          transparent={true}
          visible={this.state.cityModalVisiblity}
          onRequestClose={() => {
            this.setState({
              cityModalVisiblity:false
            })
          }}
        >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                     <TextView
                     color="black"
                        text="Pay Fees"
                        />
                         <TextView
                         marginVertical={1}
                         fontSize={15}
                     color="black"
                     fontFamily={fonts.Sofia_Pro_Light_Az}
                        text="Pay securely via Debit/Credit Card, Jazz Cash Mobile Account, or Jazz Cash Voucher."
                        />
                    <View style={AppStyles.line}/>

                
                    <View style={AppStyles.rowJustify}>

                        <TextView
                                marginVertical={1}
                                fontSize={15}
                            color="black"
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                                text="Pay for Test"
                                />


                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <TextView
                                                marginVertical={1}
                                                fontSize={15}
                                            color="black"
                                            fontFamily={fonts.Sofia_Pro_Light_Az}
                                                text="PKR 1000"
                                                />


                                        <TouchableOpacity
                                        style={styles.selectBtn}
                                            onPress={()=> this.setState({cityModalVisiblity:false,paymentMethodModal:true,selectedAmount:'1000',selectedType:'Test'})}
                                            >
                                            <TextView
                                            color="white"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_Light_Az}

                                            text="Select"
                                            />
                                        </TouchableOpacity>

                                    
                                </View>

                    </View>
                 
                    <View style={AppStyles.rowJustify}>

<TextView
        marginVertical={1}
        fontSize={15}
    color="black"
    fontFamily={fonts.Sofia_Pro_Light_Az}
        text={`Pay for \nCounselling Session`}
        />


        <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextView
                        marginVertical={1}
                        fontSize={15}
                    color="black"
                    fontFamily={fonts.Sofia_Pro_Light_Az}
                        text="PKR 5000"
                        />


                <TouchableOpacity
                style={styles.selectBtn}
                onPress={()=> this.setState({cityModalVisiblity:false,paymentMethodModal:true,selectedAmount:'5000',selectedType:'Counselling'})}
                    >
                    <TextView
                    color="white"
                    fontSize={15}
                    fontFamily={fonts.Sofia_Pro_Light_Az}

                    text="Select"
                    />
                </TouchableOpacity>

            
        </View>

</View>


                  <View style={AppStyles.line}/>

                 <View style={[styles.radioStyle,{right:0,bottom:0,position:'absolute',margin:8,marginRight:20}]}>
                 
                    <TouchableOpacity
                    style={{borderWidth:1,borderColor:'silver',borderRadius:10}}
                        onPress={()=> this.setState({cityModalVisiblity:false})}
                        >
                        <TextView
                        color="black"
                        fontSize={15}
                        fontFamily={fonts.Sofia_Pro_Light_Az}

                        text="Close"
                        />
                    </TouchableOpacity>
                 </View>
              </View>
          </View>
        </Modal>
    
    )
}
renderLoader=()=>{
    return(
        <Modal
        backdropColor={'black'}
        backdropOpacity= {1}
          animationType="fade"
          transparent={true}
          visible={this.state.loading}
        >
          <View style={styles.centeredView}>
              <View style={styles.loaderView}>
                     
                <ActivityIndicator size="large" color="blue"/>


                </View>


                
              
          </View>
        </Modal>
    
    )
}


furtherguidance=(value)=>{
        this.setState({   furtherguidance:!this.state.furtherguidance })
        this.state.whyNeed.push(value)
}

discussmyreport = (value)=>{
    this.setState({ discussmyreport:!this.state.discussmyreport   })
    this.state.whyNeed.push(value)

}

Other= (value)=>{
    this.setState({Other : !this.state.Other})
    this.state.whyNeed.push(value)
    console.log("this.state.whyNeed" , this.state.whyNeed)

}
renderBookAppointmentModal=()=>{
    return(
        <Modal
        backdropColor={'black'}
        backdropOpacity= {1}
          animationType="fade"
          transparent={true}
          visible={this.state.appointmentDialog}
          onRequestClose={() => {
            this.setState({
              appointmentDialog:false
            })
          }}
        >
          <View style={styles.centeredView}>
           
          <ScrollView style={{flex:1}}>

         
              <View style={styles.modalView1}>
               

                     
                        <TextView color="black" text="Book your appointment" />
                        <Text style={AppStyles.title}>Name</Text>

                        <TextInput
                        mode="outlined"
                        label='Enter Name'
                        style={{backgroundColor:'white',width:'93%',alignSelf:'center',borderColor:'blue'}}
                        placeholder="Enter Name"
                        />

                        <Text style={AppStyles.title}>Why do you need to book the appointment</Text>
                    


                                <TouchableOpacity 
                                    onPress ={()=>this.furtherguidance("For further guidance")}
                                    style={styles.radiod}>
                                <Image style={{width:20,height:20,marginTop:5}} source={this.state.furtherguidance ? Like : UnLike}/>
                                <Text style={AppStyles.normalText}>For further guidance</Text>

                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress ={()=>this.discussmyreport("To discuss my report in detail")}
                                    style={styles.radiod}>
                                <Image style={{width:20,height:20,marginTop:5}} source={this.state.discussmyreport ? Like : UnLike}/>
                                <Text style={AppStyles.normalText}>To discuss my report in detail</Text>

                                    
                                        
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress ={()=>this.Other("Other")}
                                style={styles.radiod}>
                                <Image style={{width:20,height:20,marginTop:5}} source={this.state.Other ? Like : UnLike}/>
                                <Text style={AppStyles.normalText}>Other</Text>

                                    
                                        
                                </TouchableOpacity>

                       <Text style={AppStyles.title}>Appointment type</Text>
                       <View style={styles.picker}>
                                 <Picker
                                     selectedValue={this.state.appointeMentType}
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({appointeMentType:itemValue})}
                                    >
                                        <Picker.Item label="Select Appointment Type" value="select" />
                                        <Picker.Item label="In Person (Only available in Islamabad)" value="person" />
                                        <Picker.Item label="Online" value="online" />

                                    </Picker>
                         </View>

                         <Text style={AppStyles.title}>Suitable Day</Text>
                         <View style={styles.picker}>
                                 <Picker
                                     selectedValue={this.state.suitableDay}
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({suitableDay:itemValue})}
                                    >
                                        <Picker.Item label="Select Suitable Day" value="select" />
                                        <Picker.Item label="Monday" value="Monday" />
                                        <Picker.Item label="Tuesday" value="Tuesday" />
                                        <Picker.Item label="Wednesday" value="Wednesday" />
                                        <Picker.Item label="Thursday" value="Thursday" />
                                        <Picker.Item label="Friday" value="Friday" />


                                    </Picker>
                         </View>

                         <Text style={AppStyles.title}>Suitable Time</Text>
                         <View style={styles.picker}>
                                 <Picker
                                     selectedValue={this.state.time}
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({time:itemValue})}
                                    >
                                        <Picker.Item label="Select Suitable Time" value="select" />
                                        <Picker.Item label="9-10am" value="9-10am" />
                                        <Picker.Item label="10-11am" value="10-11am" />
                                        <Picker.Item label="11-12am" value="11-12am" />
                                        <Picker.Item label="12-01pm" value="12-01pm" />
                                        <Picker.Item label="01-02pm" value="01-02pm" />
                                        <Picker.Item label="02-03pm" value="02-03pm" />
                                        <Picker.Item label="03-04pm" value="03-04pm" />
                                        <Picker.Item label="04-05pm" value="04-05pm" />
                                        
                                        <Picker.Item label="Other" value="Other" />

                                    </Picker>
                         </View>

                         <Text style={AppStyles.title}>Inform me about the session</Text>
                         <View style={styles.picker}>
                                 <Picker
                                     selectedValue={this.state.session}
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({session:itemValue})}
                                    >
                                        <Picker.Item label="Select Inform me about the session" value="select" />
                                        <Picker.Item label="Through Email" value="Through Email" />
                                        <Picker.Item label="On Call" value="On Call" />
                                        <Picker.Item label="Through Message/Text/WhatsApp" value="Through Message/Text/WhatsApp" />
                                        <Picker.Item label="Other" value="Other" />

                                    </Picker>
                         </View>




                


                 <View style={[styles.radioStyle,{width:100,margin:8,marginRight:60,flexDirection:'row',alignSelf:'flex-end'}]}>
                 
                            <TouchableOpacity
                            style={{borderRadius:10,backgroundColor:colors.blue,marginHorizontal:10}}
                                //onPress={()=> this.setState({appointmentDialog:false})}
                              onPress={()=> this.BookAppointment()}
                              >
                                <TextView
                                color="white"
                                fontSize={15}
                                fontFamily={fonts.Sofia_Pro_Black_Az}

                                text="Submit"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={{borderWidth:1,borderColor:'silver',borderRadius:10}}
                                onPress={()=> this.setState({appointmentDialog:false})}
                                >
                                <TextView
                                color="black"
                                fontSize={15}
                                fontFamily={fonts.Sofia_Pro_Light_Az}

                                text="Close"
                                />
                            </TouchableOpacity>
                 </View>
           
              </View>
               
              </ScrollView>
          </View>
        </Modal>
    
    )
}

gotoWebView=()=>{
  this.setState({paymentMethodModal:false})
  //this.props.navigation.navigate('WebView',{selectedType: this.state.selectedType,selectedAmount:this.state.selectedAmount,discountCode:this.state.discount})
  this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'WebView',
            params: { selectedType: this.state.selectedType,selectedAmount:this.state.selectedAmount,discountCode:this.state.discount }, },
           
    
          ],
        })
      )
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

paynow=()=>{
 
  this.setState({loading:true,paymentMethodModal:false})
let URL = API.paynow
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
        Authorization:  `Bearer ${this.state.token}`
      },
      body:JSON.stringify({
        'code': this.state.discount, //  'VD7863AX',
        'customer_id':this.state.customerID
      })
      
       })
  .then((res) => res.json())
  .then(res=>{
    this.setState({loading:false})
      console.log("if",res)
      if(res.data){
        this.showAlert(res.data)
      }
      else{
        this.showAlert(res.data)
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

renderPaymentMethodModal=()=>{
    return(
        <Modal
        backdropColor={'black'}
        backdropOpacity= {1}
          animationType="fade"
          transparent={true}
          visible={this.state.paymentMethodModal}
          onRequestClose={() => {
            this.setState({
              paymentMethodModal:false
            })
          }}
        >
          <View style={styles.centeredView}>
              <View style={[styles.modalView,{height:this.state.paymentMethodsHeight}]}>
                     <TextView
                       color="black"
                        text="Pay Fees"
                        />
                        <View style={styles.discount}>

                        
                        <TextInput
                        underlineColorAndroid="transparent"
                        onChangeText={(discount)=> this.setState({discount})}
                        style={styles.discountTextInput}
                        placeholder="Discount Code"
                        />

                        <TouchableOpacity
                                        style={styles.selectBtn}
                                        onPress={()=> this.checkDiscountService()}    
                                        //onPress={()=> this.setState({cityModalVisiblity:false})}
                                            >
                                            <TextView
                                            color="white"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_Light_Az}

                                            text="Apply Code"
                                            />
                                        </TouchableOpacity>

                        </View>
                   
                       <View style={AppStyles.line}/>
                        {this.state.afterDiscount &&
                           <View style={styles.discount}>

                                                        
                                <TextView
                                marginVertical={1}
                                fontSize={15}
                                color="black"
                                fontFamily={fonts.Sofia_Pro_Light_Az}
                                text="Discounted Amount"
                                />

                              <TextView
                                marginVertical={1}
                                fontSize={15}
                                color="black"
                                fontFamily={fonts.Sofia_Pro_RegularAz}
                                text={this.state.discounted}
                                />
                               

                                </View>}

                                {/* {this.state.afterDiscount &&
                                <TextView
                                marginVertical={1}
                                fontSize={15}
                                color="black"
                                fontFamily={fonts.Sofia_Pro_RegularAz}
                                text={"Sub Total = " + this.state.subTotal + ' PKR'} 
                                />} */}

                                 <TextView
                                marginVertical={1}
                                fontSize={15}
                                color="black"
                                fontFamily={fonts.Sofia_Pro_RegularAz}
                                text={"Sub Total = " + this.state.selectedAmount + ' PKR'} 
                                />
                
            {this.state.hidePaymentMethodButtons  &&  
                  <View style={[styles.discount,{marginVertical:10,flexDirection:'column',alignSelf:'center',alignItems:'center'}]}>

                            

                                        <TouchableOpacity  
                                        onPress={()=> this.props.navigation.navigate('WebView',{selectedType:this.state.selectedType , selectedAmount:this.state.selectedAmount,discountCode:this.state.discount,paymentMethodModal:false})}>
                                         
                                               <Image source={jazz} style={AppStyles.largeImage1}/>
                                          </TouchableOpacity>
                   
                                        {/* <TouchableOpacity
                                        style={styles.paymentBtn}
                                    //  onPress={()=> this.goto}
                                      
                                       onPress={()=> this.gotoWebView()}
                                    //onPress={()=> this.props.navigation.navigate('WebView',{selectedType:this.state.selectedType , selectedAmount:this.state.selectedAmount,discountCode:this.state.discount,paymentMethodModal:false})}
                                        //  onPress={()=> this.setState({easyPaisaModal:!this.state.easyPaisaModal,paymentMethodModal:!this.state.paymentMethodModal})}
                                            >
                                            <TextView
                                            color="black"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_Light_Az}

                                            text="JAZZCASH"
                                            />
                                        </TouchableOpacity> */}

                                        {/* <TouchableOpacity
                                        style={styles.paymentBtn}
                                        onPress={()=> this.props.navigation.navigate('WebView',{selectedType:this.state.selectedType , selectedAmount:this.state.selectedAmount,discountCode:this.state.discount})}

                                          //  onPress={()=> this.setState({cityModalVisiblity:false})}
                                            >
                                            <TextView
                                            color="black"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_Light_Az}

                                            text="CREDITCARD"
                                            />
                                        </TouchableOpacity> */}

                                        <TouchableOpacity 
                                         onPress={()=> this.props.navigation.navigate('WebView',{selectedType:this.state.selectedType , selectedAmount:this.state.selectedAmount,discountCode:this.state.discount})}
                                         >
                                           <Image source={creditCard} style={AppStyles.largeImage1}/>
                                        </TouchableOpacity>

                                        

                                        <TouchableOpacity onPress={()=> this.setState({bankTransfeModalVisibility:!this.state.bankTransfeModalVisibility,paymentMethodModal:!this.state.paymentMethodModal})} >
                                              <Image source={bankTransfer} style={AppStyles.largeImage1}/>
                                              </TouchableOpacity>
                   
                                        {/* <TouchableOpacity
                                        style={styles.paymentBtn}
                                        onPress={()=> this.setState({bankTransfeModalVisibility:!this.state.bankTransfeModalVisibility,paymentMethodModal:!this.state.paymentMethodModal})}
                                            >
                                            <TextView
                                            color="black"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_Light_Az}

                                            text="BANK TRANSFER"
                                            />
                                        </TouchableOpacity> */}

                          <TouchableOpacity
                                        style={styles.paymentBtn}
                                        onPress={()=> this.setState({codModalVisibility:!this.state.codModalVisibility,paymentMethodModal:!this.state.paymentMethodModal})}
                                            >
                                            <TextView
                                            color="black"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_RegularAz}

                                            text="  COD  "
                                            />
                                        </TouchableOpacity>


                                       <TouchableOpacity onPress={()=> this.setState({easyPaisaModal:true})}
                                        style={styles.paymentBtn}
                                            >
                                            <TextView
                                            color="black"
                                            fontSize={15}
                                            fontFamily={fonts.Sofia_Pro_RegularAz}

                                            text="Easy Paisa"
                                            />
                                        </TouchableOpacity>

                    </View> }
                                        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                              {!this.state.hidePaymentMethodButtons && 
                                                <TouchableOpacity 
                                                
                                                onPress={()=> this.paynow()}
                                              style={styles.paymentBtn}
                                                  >
                                                  <TextView
                                                  color="black"
                                                  fontSize={15}
                                                  fontFamily={fonts.Sofia_Pro_RegularAz}

                                                  text="Pay Now"
                                                  />
                                              </TouchableOpacity> } 
                                        </View>
                          

              {this.state.hidePaymentMethodButtons && <View style={AppStyles.line}/> }

                 <View style={[styles.radioStyle,{right:0,bottom:0,position:'absolute',margin:8,marginRight:20}]}>
                 
                    <TouchableOpacity
                    style={{borderWidth:1,borderColor:'silver',borderRadius:10,marginBottom:20}}
                        onPress={()=> this.setState({paymentMethodModal:false})}
                        >
                        <TextView
                        color="black"
                        fontSize={15}
                        fontFamily={fonts.Sofia_Pro_Light_Az}

                        text="Close"
                        />
                    </TouchableOpacity>
                 </View>
              </View>
          </View>
        </Modal>
    
    )
}

renderEasyPaisaModal=()=>{
  return(
      <Modal
      backdropColor={'black'}
      backdropOpacity= {1}
        animationType="fade"
        transparent={true}
        visible={this.state.easyPaisaModal}
        onRequestClose={() => {
          this.setState({easyPaisaModal:false})
        }}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                   <TextView
                   color="black"
                      text="Easy Paisa"
                      />
                      <View style={AppStyles.line}/>
                       <TextView
                       marginVertical={1}
                       fontSize={15}
                      color="black"
                       fontFamily={fonts.Sofia_Pro_Light_Az}
                      text="Please transfer the specified amount in the following easy paisa number"
                      />
                  

              
                  <View style={AppStyles.rowJustify}>

                   


                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                      <TextView
                                              marginVertical={1}
                                              fontSize={15}
                                          color="black"
                                          fontFamily={fonts.Sofia_Pro_RegularAz}
                                              text="PKR 1000"
                                              />


                                    
                                  
                              </View>

                  </View>
               
                  <View style={AppStyles.rowJustify}>

<TextView
      marginVertical={1}
      fontSize={15}
  color="black"
  fontFamily={fonts.Sofia_Pro_Light_Az}
      text={`Once transfer is made please Whatsapp the payment proof at 03225563972 or email at info@merafuture.pk with your name and email address which you used to register at website.`}
      />


      

</View>


                <View style={AppStyles.line}/>

               <View style={[styles.radioStyle,{right:0,bottom:0,position:'absolute',margin:8,marginRight:20}]}>
               
                  <TouchableOpacity
                  style={{borderWidth:1,borderColor:'silver',borderRadius:10}}
                      onPress={()=> this.setState({easyPaisaModal:false})}
                      >
                      <TextView
                      color="black"
                      fontSize={15}
                      fontFamily={fonts.Sofia_Pro_Light_Az}

                      text="Close"
                      />
                  </TouchableOpacity>
               </View>
            </View>
        </View>
      </Modal>
  
  )
}

renderBankTransferModal=()=>{
  return(
      <Modal
      backdropColor={'black'}
      backdropOpacity= {1}
        animationType="fade"
        transparent={true}
        visible={this.state.bankTransfeModalVisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
            <View style={[styles.modalView,{height:350}]}>
                   <TextView
                   color="black"
                      text="Bank Transfer"
                      />
                      <View style={AppStyles.line}/>
                       <TextView
                       marginVertical={1}
                       fontSize={15}
                      color="black"
                       fontFamily={fonts.Sofia_Pro_Light_Az}
                      text="Please transfer the test fee in the following account."
                      />
                  

              
                  <View >
                       <TextView
                                              marginVertical={10}
                                              fontSize={15}
                                          color="black"
                                          fontFamily={fonts.Sofia_Pro_RegularAz}
                                              text="PK37SCBL0000001727927801"
                                              />
                                               <TextView
                                              marginVertical={1}
                                              fontSize={15}
                                          color="black"
                                          fontFamily={fonts.Sofia_Pro_RegularAz}
                                              text="Standard Chartered"
                                              />
                  </View>
               
                  <View style={AppStyles.rowJustify}>

<TextView
      marginVertical={1}
      fontSize={15}
  color="black"
  fontFamily={fonts.Sofia_Pro_Light_Az}
      text={`Once payment had been transferred please send an email to info@merafuture.pk with payment receipt, student's name and mobile number`}
      />


      

</View>


                <View style={AppStyles.line}/>

               <View style={[styles.radioStyle,{right:0,bottom:0,position:'absolute',margin:8,marginRight:20}]}>
               
                  <TouchableOpacity
                  style={{borderWidth:1,borderColor:'silver',borderRadius:10}}
                      onPress={()=> this.setState({bankTransfeModalVisibility:false})}
                      >
                      <TextView
                      color="black"
                      fontSize={15}
                      fontFamily={fonts.Sofia_Pro_Light_Az}

                      text="Close"
                      />
                  </TouchableOpacity>
               </View>
            </View>
        </View>
      </Modal>
  
  )
}

renderCODModal=()=>{
  return(
      <Modal
      backdropColor={'black'}
      backdropOpacity= {1}
        animationType="fade"
        transparent={true}
        visible={this.state.codModalVisibility}
        onRequestClose={() => {
          this.setState({codModalVisibility:false})
        }}
      >
        <View style={styles.centeredView}>
         
       

       
            <View style={[styles.modalView,{height:600}]}>
             

                   
                      <TextView color="Black" text="Cash On Delivery" />
                      <Text style={AppStyles.title}>Name</Text>

                      <TextInput
                      onChangeText={(codeName)=> this.setState({codeName})}
                      mode="outlined"
                      label='Enter Name'
                      style={styles.inputBox}
                      placeholder="Enter Name"
                      />

                    <Text style={AppStyles.title}>Email Address</Text>

                    <TextInput
                     onChangeText={(codEmail)=> this.setState({codEmail})}
                    mode="outlined"
                    label='Enter Email'
                    style={styles.inputBox}
                    placeholder="Enter Email"
                    />

                    <Text style={AppStyles.title}>Phone</Text>

                      <TextInput
                      maxLength={11}
                      keyboardType="numeric"
                      onChangeText={(codPhone)=> this.setState({codPhone})}
                      mode="outlined"
                      label='Enter Phone'
                      style={styles.inputBox}
                      placeholder="Enter Phone"
                      />

                        <Text style={AppStyles.title}>Address</Text>

                        <TextInput
                        keyboardType={'email-address'}
                         onChangeText={(codAddress)=> this.setState({codAddress})}
                        mode="outlined"
                        label='Enter Address'
                        style={styles.inputBox}
                        placeholder="Enter Address"
                        />

                        <TouchableOpacity
                            style={{borderRadius:5,marginVertical:10,alignItems:'center',justifyContent:'center',backgroundColor:colors.blue,marginHorizontal:10,width:100}}
                                //onPress={()=> this.setState({appointmentDialog:false})}
                             // onPress={()=> this.setState({codModalVisibility:false})}
                             onPress={()=> this.CodPayment()}
                             >
                                <TextView
                                color="white"
                                fontSize={15}
                                fontFamily={fonts.Sofia_Pro_Black_Az}

                                text="Submit"
                                />
                            </TouchableOpacity>

                      

            </View>
        </View>
      </Modal>
  
  )
}

_renderItem=({item,index}) =>{

    return(
     
       
        <TouchableOpacity
        
        onPress={()=> 
          index === 2 ? this.openMail() :  this.props.navigation.navigate(item.route)}
        style={[styles.itemStyle,{backgroundColor:item.backgroundColor}]}>
           <TouchableOpacity 
           onPress={()=>
            index === 2 ? this.openMail() :  this.props.navigation.navigate(item.route)}
           >
           <TextView 
           alignSelf="center"
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={18} 
            marginVertical={1}
            text={item.cat_name}/>
             <TextView 
              alignSelf="center"
            marginVertical={-3}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={18} 
            text={item.catName2}/>
           </TouchableOpacity>
           
           
        </TouchableOpacity>
        
    )
  }

  checkPaymentStatus = async () => {
      this.setState({loading:true,paymentMethodsHeight:520,hidePaymentMethodButtons:true})
  //  console.warn(this.state.token)
      var obj = {  
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}` ,
         
        },
      }
  
      try {
        let response = await fetch(
         API.checkPaymentStatus + `language=en&customer_id=${this.state.customerID}&package=Counseling`, obj
        );
        let json = await response.json();
        this.setState({loading:false})
        //this.setState({appointmentDialog : true})
       // this.setState({appointmentDialog : true})
            if(json.success === true){
              AsyncStorage.setItem("payment_status","true")
              //run book appointment service 
                    this.setState({appointmentDialog : true})
            }
            else{

                this.setState({cityModalVisiblity : true})

            }
         console.log("success",json);
      } catch (error) {
        this.setState({loading:false})
        alert("Something went wrong!")
          this.setState({
              loading:false
            })
        console.error("error",error);
      }
    };
    checkPaymentStatusEveryTime = async () => {
      this.setState({loading:true,paymentMethodsHeight:520,hidePaymentMethodButtons:true})
  //  console.warn(this.state.token)
      var obj = {  
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}` ,
         
        },
      }
  
      try {
        let response = await fetch(
         API.checkPaymentStatus + `language=en&customer_id=${this.state.customerID}&package=Counseling`, obj
        );
        let json = await response.json();
        this.setState({loading:false})
        //this.setState({appointmentDialog : true})
       // this.setState({appointmentDialog : true})
            if(json.success === true){
              AsyncStorage.setItem("payment_status","true")
              //run book appointment service 
            }
            else{


            }
         console.log("success",json);
      } catch (error) {
        this.setState({loading:false})
        alert("Something went wrong!")
          this.setState({
              loading:false
            })
        console.error("error",error);
      }
    };
    render() {
        return (
            <View style={{flex:1}}>
                <Toolbar
                profile
                header="DASHBOARD" home
                 navigation={this.props.navigation}/>
                 <ImageBackground
        
        style={{width : '97%',backgroundColor:'#ff8000',flex:.7,alignItems:'center',justifyContent:'center',margin:5,alignSelf:'center'}}>
           <TouchableOpacity 
           
         onPress={()=>this.props.navigation.navigate('MyTest')}
         //  onPress={()=> this.checkPaymentStatus()}
           >
           <TextView 
           alignSelf="center"
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={20} 
            marginVertical={1}
            text={"Multidimensional Career"}/>
             <TextView 
              alignSelf="center"
            marginVertical={-3}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={19} 
            text={"Counselling Test"}/>
           </TouchableOpacity>
           
           
        </ImageBackground>

                 <ImageBackground
        
        style={{width : '97%',backgroundColor:'grey',flex:.7,alignItems:'center',justifyContent:'center',margin:5,alignSelf:'center'}}>
           <TouchableOpacity 
          // onPress={()=> this.checkPaymentStatus()}
          onPress={()=> this.setState({appointmentDialog:true})}
          >
           <TextView 
           alignSelf="center"
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={20} 
            marginVertical={1}
            text={"Book Appointment"}/>
             <TextView 
              alignSelf="center"
            marginVertical={-3}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={19} 
            text={"with Counsellor"}/>
           </TouchableOpacity>
           
           
        </ImageBackground>
          <View style={{flex:1}}>
              <FlatList
                numColumns={2}
                style={{flex:5}}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />

          </View>

              

{this.renderCityModal()}
{this.renderBookAppointmentModal()}
{this.renderLoader()}
{this.renderPaymentMethodModal()}
{this.renderEasyPaisaModal()}
{this.renderBankTransferModal()}
{this.renderCODModal()}
            </View>
        )
    }
}

export default Home


const styles = StyleSheet.create({
   
    itemStyle:{
        marginHorizontal:3,
        marginVertical:3,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:2,
        flex:1,
        height:Dimensions.get('window').height / 6,
        backgroundColor:'black',
        opacity:0.7
    }, 
    inputBox:{
      backgroundColor:'white',
      width:'93%',
      alignSelf:'center',
      borderColor:'blue',
      height:55,
      fontSize:12,
      padding:5
    },
    discountTextInput:{
      width:'60%',
      height:40,
      backgroundColor:'transparent',
      borderColor:'silver',
      borderWidth:1,
      fontSize:10,
      borderRadius:5,
      padding:5
    },
    discount:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    flatListStyle:{
        alignSelf:'center',
        marginVertical:5,
        width:'100%',
        height:'100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.5)',
        padding: 5,
      },
      modalView: {
          height:320,
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
        elevation: 5
      },
      selectBtn:{
          backgroundColor:colors.blue,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center'
      },
      paymentBtn:{
        borderColor:'silver',
        borderWidth:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:5,
        width:200,
        height:40
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
    loaderView: {
        height:50,
        margin: 2,
        width:60,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
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
    radiod:{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginVertical:5},
    picker:{
        borderColor:'silver',
        borderWidth:1,
        alignSelf:'center',
        marginHorizontal:3,
        marginVertical:5,
        width:'95%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
});
