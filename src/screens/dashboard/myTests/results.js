import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
import Shimmer from 'react-native-shimmer';
import fonts from '../../../constants/fonts'
import  TextView from '../../../components/textView';
import colors from '../../../constants/colors';
import { CommonActions } from '@react-navigation/native';


export class results extends Component {

    state={
        token:'',
        loading:true,
        status:'Your Report will be visible after you have completed all tests. ' ,
        payment_status:false,
        showUpgrade:false ,
        ViewResult:false
    }

    async componentDidMount(){

        const token = await AsyncStorage.getItem("token")
        const payment_status = await AsyncStorage.getItem("payment_status")
        console.log("payment_status",payment_status)
        this.setState({payment_status})
       
        const customer_id = await AsyncStorage.getItem("customer_id")
       // alert(customer_id)
        this.setState({token,customer_id,payment_status})
        this.getAllTests(payment_status)
    
    
       // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
    }

    getAllTests = async (payment_status) => {
      console.log("payment_status----->>>",payment_status)
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
          this.setState({loading:false})
        
            var trueArray = [];
            var falseArray = [];
                    // console.log("true statis", trueArray.push(json.data[i].test_status))

          for(var i = 0 ; i < json.data.length ; i++){
            console.log(json.data[i].test_status)
                if(json.data[i].test_status === true){
                   console.log("statis--->", json.data[i].test_status)
                    
                   console.log("true statis", trueArray.push(json.data[i].test_status))
                    if(trueArray.length === 8){
                        this.setState({status:"Test Completed"})
                          if(payment_status == "true"){
                             this.props.navigation.navigate('CareerReport')
                             this.setState({
                              ViewResult:true
                             })
                          }
                          else{
                           // alert(payment_status)
                           // alert("Pay the Fee to view your results")
                            this.setState({showUpgrade:true})
                          }
                    
                    }

                }
                else{
                    this.setState({status:"Your Report will be visible after you have completed all tests. "})
                    //this.props.navigation.navigate('CareerReport')
                  //  console.log("statis", json.data[i].test_status)

                    var counter = 0
                   // console.log("false statis", counter + 1)
                }

          }
     
        } catch (error) {
            this.setState({loading:false})
          console.error("error",error);
        }
      };
    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               {!this.state.loading &&    <Text style={{textAlign:'center',fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:20}}>{this.state.status}</Text>}
          
                {this.state.loading && 
                 <Shimmer style={{width:'90%',height:20,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
               {this.state.showUpgrade && 
                 <TouchableOpacity
                 onPress={()=> this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      { name: 'Home'  ,
                       params: {
                        "from": "openPopUp"   // this second parameter is for sending the params
                    } },
              
                    ],
                  })
                )}

                 style={{backgroundColor:colors.blue,width:'90%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={"Upgrade"}/>
               </TouchableOpacity>  }

               {this.state.ViewResult && 
                 <TouchableOpacity
                 onPress={()=>this.props.navigation.navigate('CareerReport') }

                 style={{backgroundColor:colors.blue,width:'90%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={"View Result"}/>
               </TouchableOpacity>  }

            </View>

        )
    }
}

export default results ;

const styles = StyleSheet.create({
   
   
    flatListStyle:{
        alignSelf:'center',
        marginVertical:10,
        width:'100%',
        height:'100%',
    },
    shimmer:{
      backgroundColor:'silver',
      height:20,
      marginHorizontal:20,
  },
});


