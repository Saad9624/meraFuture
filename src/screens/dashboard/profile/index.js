import React, { Component } from 'react'
import { Text, View ,StyleSheet,FlatList,Image,ScrollView, Dimensions, TouchableOpacity,Picker,Modal,ActivityIndicator} from 'react-native'
import Toolbar from '../../../components/toolbar' ;
import{
    name
} from '../../../constants/images' ;
import TextInput from '../../../components/textInput' ;
import fonts from '../../../constants/fonts';
import TextView from '../../../components/textView'
const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;
import { RadioButton } from 'react-native-paper';
import Button from '../../../components/button' ;
import email from '../../../assets/images/emai.png';
import confirmpass from '../../../assets/images/confrmpas.png';
import { API } from '../../../api/endPoints';
import AsyncStorage from '@react-native-community/async-storage';
import { showAlert } from '../../../constants/common';

export class index extends Component {


    state={
        selectedValue:"",
        checked:'',
        email:'',
        fullname:'',
        mobileNumber:'',
        city:'',
        gender:'',
        guardianName:'',
        gardian_number:'',
        school_name:'',
        subject_olevel:'',
        subject_alevel:'',
        loading:false,
        customerID:''

    }
    async componentDidMount(){
        const token = await AsyncStorage.getItem("token")
        const customerID = await AsyncStorage.getItem("customer_id")
        this.setState({
            token,
            customerID
        })
        this.getProfileData()
       // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
       //this.BookAppointment()
    }

    getProfileData = async () => {
         //   alert(this.state.customerID)
       var obj = {  
         method: 'GET',
         headers: {
           Authorization:  `Bearer ${this.state.token}`
          
         },
       }
   
       try {
           let URL = API.getProfileData + `${this.state.customerID}` ;
         let response = await fetch(URL,obj);
         let json = await response.json();
           console.log("------------>>>>>>>>>>>>>",json)
         if(json.success === true){
             this.setState({
                fullname:json.data[0].fullname , 
                email:json.data[0].email ,
                mobileNumber:json.data[0].phonenumber ,
                guardianName:json.data[0].gardian_name ,
                gardian_number:json.data[0].gardian_number ,
                school_name:json.data[0].school_name ,
                subject_olevel:json.data[0].subject_olevel ,
                subject_alevel:json.data[0].subject_alevel ,
                gender:json.data[0].gender ,
                city:json.data[0].city
             })
         }
        // console.log(json)
        

        
          //console.log("success",json);
       } catch (error) {
           this.setState({loading:false})
         console.error("error",error);
       }
     };


    updateProfile=()=>{
 
        this.setState({loading:true})
  let URL = API.updateProfile ; ;
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
            "email"     : this.state.email,
            "customer_id"   : this.state.customerID,
            "fullname"         : this.state.fullname,
            "city"     : this.state.city,
            "phonenumber"      : this.state.mobileNumber,
            "gender"      : this.state.checked,
            "gardian_name" : this.state.guardianName,
            "gardian_number":this.state.gardian_number,
            "school_name": this.state.school_name,
            "subject_olevel": this.state.subject_olevel,
            "subject_alevel" : this.state.subject_olevel
          })
        
         })
    .then((res) => res.json())
    .then(res=>{
        console.log("if",res)
        console.log("if",res)

        if(res.success === true){
            this.setState({loading:false})
            showAlert(res.data)
            const percent = 100 ;
            AsyncStorage.setItem("profile_percent",percent.toString())
        }
        else{
            this.setState({loading:false})
            alert(res.errorDetails)
        }
       

    })
    .catch(err=>{
        this.setState({loading:false})
        alert("Something went wrong!")
      console.log("err1",err)
    })
   }
    catch(e){
        this.setState({loading:false})
      console.log("err2",e)
    }

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


    render() {
        const {selectedValue,checked} = this.state;
        return (
            <View style={{flex:1}}>
                <Toolbar navigation={this.props.navigation} header="Profile"/>
                <ScrollView>

             

                           {/* <TouchableOpacity style={{alignSelf:'center',marginVertical:10}}>
                              
                                        <Image source={name}/>

                                        <TextView color={'grey'}
                                    marginHorizontal={-5}
                                    fontFamily={fonts.Sofia_Pro_RegularAz}
                                    fontSize={15}
                                    text="Profile Image*" 
                                    marginVertical={5}/>


                            </TouchableOpacity> */}



                        <TextView
                         color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Full Name*" 
                            marginVertical={5}/>
                        <TextInput 
                        text={this.state.fullname}
                        onChangeText={(fullname) => this.setState({fullname})}
                        image={name}
                        on
                        secureTextEntry={false}
                            withimage />

                    <TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Email Address*" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        image={email}
                        secureTextEntry={false}
                            withimage />

                        <TextView 
                            color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            
                            text="Mobile Number*" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.mobileNumber}
                         onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                        image={confirmpass}
                        keyboardType={'numeric'}
                        secureTextEntry={false}
                            withimage />

                        <TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Gender*" 
                            marginVertical={1}/>

                            <View style={{flexDirection:'row',marginVertical:10}}>

                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                                value="male"
                                                status={ checked === 'male' ? 'checked' : 'unchecked' }
                                                onPress={() => this.setState({checked:'male'})}
                                            />

                                        <TextView color={'grey'}
                                        marginHorizontal={10}
                                        fontFamily={fonts.Sofia_Pro_RegularAz}
                                        fontSize={15}
                                        text="Male*" 
                                        marginVertical={1}/>
                                       
                                </View>
                               
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                                value="female"
                                                status={ checked === 'female' ? 'checked' : 'unchecked' }
                                                onPress={() => this.setState({checked:'female'})}
                                            />

                                        <TextView color={'grey'}
                                        marginHorizontal={10}
                                        fontFamily={fonts.Sofia_Pro_RegularAz}
                                        fontSize={15}
                                        text="Female*" 
                                        marginVertical={1}/>
                                      
                                </View>
                                </View>



                    <TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="City of Residence*" 
                            marginVertical={1}/>

                        <View style={styles.picker}>
                                 <Picker
                                     selectedValue={this.state.city}
                                        style={styles.picker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({city:itemValue})}
                                    >
                                        <Picker.Item label="Karachi" value="java" />
                                        <Picker.Item label="Islamabad" value="js" />
                                        <Picker.Item label="Lahore" value="js1" />
                                        <Picker.Item label="Faislabad" value="js2" />

                                        <Picker.Item label="Quetta" value="js3" />

                                    </Picker>
                         </View>



                         <TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Mother/Father/Guardian Name*" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.guardianName}
                        onChangeText={(guardianName)=>this.setState({guardianName})}
                         image={name}
                        secureTextEntry={false}
                            withimage />

<TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            
                            text="Mother/Father/Guardian Mobile Number*" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.gardian_number}
                        onChangeText={(gardian_number)=>this.setState({gardian_number})}
                         image={confirmpass}
                        keyboardType={'numeric'}
                        secureTextEntry={false}
                            withimage />

<TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Current School/College's Name" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.school_name}
                          image={name}
                        onChangeText={(school_name)=>this.setState({school_name})}
                        secureTextEntry={false}
                            withimage />

<TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Subjects in A Level / FA / FSc / Intermediate" 
                            marginVertical={1}/>
                        <TextInput 
                         text={this.state.subject_alevel}
                          image={name}
                        onChangeText={(subject_alevel)=>this.setState({subject_alevel})}
                        secureTextEntry={false}
                            withimage />

<TextView color={'grey'}
                            marginHorizontal={10}
                            fontFamily={fonts.Sofia_Pro_RegularAz}
                            fontSize={15}
                            text="Subjects in O Level / Matric" 
                            marginVertical={1}/>
                        <TextInput 
                        text={this.state.subject_olevel}
                          image={name}
                        onChangeText={(subject_olevel)=>this.setState({subject_olevel})}
                        secureTextEntry={false}
                            withimage />

                            <Button onPress={()=>this.updateProfile()} title="Submit"/>
                 
                    </ScrollView>
                    {this.renderLoader()}
            </View>
        )
    }
}

export default index

const styles = StyleSheet.create({
  
    picker:{
        borderColor:'silver',
        borderWidth:1,
        alignSelf:'center',
        marginHorizontal:3,
        marginVertical:5,
        width:'95%',
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
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
 
})
