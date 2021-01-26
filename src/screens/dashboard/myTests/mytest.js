import React, { Component } from 'react'
import { Text, View, FlatList,StyleSheet,Dimensions, TouchableOpacity, Image, Alert,BackHandler } from 'react-native'
import {Card} from 'native-base' ;
import fonts from '../../../constants/fonts';
import TextView from '../../../components/textView';
import colors from '../../../constants/colors';
import AppStyles from '../../../appstyles';
import { minutes, questions } from '../../../constants/images';
import { API } from '../../../api/endPoints';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import AsyncStorage from '@react-native-community/async-storage';

import { CommonActions } from '@react-navigation/native';

export class myTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
          data:[
            {title:'', description:'CAREER COUNSELLING TEST',description:'',num_of_questions:'',duration:'' },
            {title:'' , description:'WITH CAREER COUNSELLOR',description:'' ,num_of_questions:'',duration:""},
            {title:'', description:'AND DEGREES',description:'',num_of_questions:'',duration:""},
            {title:'', description:'PROFESSIONALS',description:'',num_of_questions:'',duration:"" },
            {title:'', description:'',description:''  ,num_of_questions:'',duration:""},
            {title:'', description:'',description:'',num_of_questions:'' ,duration:""},
        ],
        token:'' ,
        customer_id:'' ,
        profile_percent:''
    }
}



async componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const token = await AsyncStorage.getItem("token")
   
    const customer_id = await AsyncStorage.getItem("customer_id")
    const profile_percent = await AsyncStorage.getItem("profile_percent")
    //alert(profile_percent)
    this.setState({token,customer_id,profile_percent})
    this.getAllTests()
    this.checkPaymentStatusEveryTime()


   // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
}
componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  
   
  }

handleBackButton = () => {
        console.log("hm")
   }

checkPaymentStatusEveryTime = async () => {
   
//  console.warn(this.state.token)
    var obj = {  
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}` ,
       
      },
    }

    try {
      let response = await fetch(
       API.checkPaymentStatus + `language=en&customer_id=${this.state.customer_id}&package=Counseling`, obj
      );
      let json = await response.json();
      //alert("json----------------------------------->>>>>>>>>>>>>>>" , json) ;
      this.setState({loading:false})
      //this.setState({appointmentDialog : true})
     // this.setState({appointmentDialog : true})
          if(json.success === true){
              //alert(json.success)
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
    _renderItem=({item}) =>{

        return(
            <Card style={styles.itemStyle}>
                {/* <View style={{backgroundColor:colors.blue,width:180,height:30,alignItems:'center',justifyContent:'center',margin:5,borderRadius:10}}> */}

                
                <TextView
                
                fontFamily={fonts.Sofia_Pro_Black_Az}
                fontSize={15}
                color={colors.blue}
                text={item.title}
                />
                {/* </View> */}
    {/* {!this.state.loading &&
    <TextView
                fontSize={13}
                fontFamily={fonts.Sofia_Pro_Light_Az}
                color={'black'}
                text={item.description}
                />} */}
                   {this.state.loading && 
                   <View style={{alignItems:'center'}}>
                        <Bubbles  size={8} color={colors.blue} />
                   </View>
                   }

                <View style={{marginBottom:30,marginHorizontal:10}} >

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={AppStyles.smallImage} source={minutes}/>
                            <TextView color={colors.darkBlue} fontSize={15} text={"Duration: "+item.duration +" Minutes"}/>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                            <Image style={AppStyles.smallImage} source={questions}/>
                            <TextView color={colors.darkBlue} fontSize={15} text={"Total Questions: "+ item.num_of_questions}/>
                        </View>

                </View>
           
           
                {/* <TouchableOpacity 
            onPress={()=> item.title === 'Personality Test' || item.title === 'Interests'?
            this.props.navigation.navigate('PersonalityTest',{
                testID :item.category_id ,
                duration:  item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                header:item.title,
                description: item.description
            }) :
            item.title ==="Inductive Reasoning" ?  
            this.props.navigation.navigate('NewTest',{
                testID :item.category_id ,
                duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                header:item.title,
                description: item.description
            }) :
            item.title ==="Error Checking" ?  
            this.props.navigation.navigate('NewTest',{
                testID :item.category_id ,
                duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                header:item.title,
                description: item.description
            }) :
            item.title ==="Deductive Reasoning" ?  
            this.props.navigation.navigate('NewTest',{
                testID :item.category_id ,
                duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                header:item.title,
                description: item.description
            })
            :
            this.props.navigation.navigate('NewTest',{ // NewTest // StartTest
                testID :item.category_id ,
                duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                header:item.title,
                description: item.description
            })
        }
               style={{bottom:0,position:'absolute',backgroundColor:colors.blue,width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={ item.duration_remain !== 0 && item.duration_remain !== null ? "Resume Test" : "Take Test"}/>
               </TouchableOpacity> */}

        



            {item.test_status === true ?
             <View 
               style={{backgroundColor:'green',width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={"Completed"}/>
               </View>
                :   
               
             <View>
                 {this.state.profile_percent == 100 ?
                 <TouchableOpacity 
                 onPress={()=> item.title === 'Personality Test' || item.title === 'Interests'?
                 this.props.navigation.navigate('PersonalityTest',{
                     testID :item.category_id ,
                     duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                     header:item.title,
                     description: item.description
                 }) :
                 item.title ==="Inductive Reasoning" ?  
                 this.props.navigation.navigate('NewTest',{
                     testID :item.category_id ,
                     duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                     header:item.title,
                     description: item.description
                 }) :
                 item.title ==="Error Checking" || item.title === "Deductive Reasoning" ? 
                 this.props.navigation.navigate('NewTest',{
                     testID :item.category_id ,
                     duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                     header:item.title,
                     description: item.description
                 }) :
                 item.title ==="Mechanical Reasoning" ?  
                 this.props.navigation.navigate('NewTest',{
                     testID :item.category_id ,
                     duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                     header:item.title,
                     description: item.description
                 })
                 :
                 this.props.navigation.navigate('NewTest',{
                     testID :item.category_id ,
                     duration: item.duration_remain !== 0 && item.duration_remain !== null ? item.duration_remain : item.duration,
                     header:item.title,
                     description: item.description
                 })}
                    style={{bottom:0,position:'absolute',backgroundColor:colors.blue,width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
                    <TextView 
                     alignSelf="center"
                 
                     color='white'
                     fontSize={15} 
                     marginVertical={1}
                     text={item.duration_remain !== 0 && item.duration_remain !== null ? "Resume Test" : "Take Test"}/>
                    </TouchableOpacity> 
                    :
            <TouchableOpacity
                   onPress={()=> this.showAlert("Please complete your profile first")}
                   style={{bottom:0,position:'absolute',backgroundColor:colors.blue,width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={ item.duration_remain !== 0 && item.duration_remain !== null ? "Resume Test" : "Take Test"}/>
               </TouchableOpacity> }
                
                    
             </View>  
              }
               
               
            </Card>
        )
      }

      getAllTests = async () => {
        var obj = {  
          method: 'GET',
          headers: {
            Authorization:  `Bearer ${this.state.token}`
           
          },
        }
    
        try {
          let response = await fetch(
         `https://merafuture.pk/api/home/gettest?language=en&customer_id=${this.state.customer_id}`, obj
          );
          let json = await response.json();
          console.log(json)
          if(json.status === "Signature verification failed"){
            AsyncStorage.removeItem("token")
            AsyncStorage.removeItem("customer_id")
            this.props.navigation.navigate('Auth Stack')
          }
          else{
            this.setState({
                data:json.data,
                loading:false
              })
          }

         
           console.log("success",json);
        } catch (error) {
          console.error("error",error);
        }
      };
    

    render() {
        return (
            <View style={{flex:1}}>
                 <FlatList
                style={[styles.flatListStyle]}
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />
            </View>
        )
    }
}

export default myTest ;



const styles = StyleSheet.create({
   
    itemStyle:{
        marginHorizontal:10,
        marginVertical:5,
        borderRadius:2,
        flex:1,
        borderWidth:1,
    }, 
    flatListStyle:{
        alignSelf:'center',
        marginVertical:10,
        width:'95%',
        height:'100%',
        alignSelf:'center'
    },
});

