import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { Text, View,StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import HTML from 'react-native-render-html';
import { API } from '../../../api/endPoints';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export class home extends Component {

    state ={
        token:'',
        customer_id:'',
        home:'',
        howWorks:'',
        peronally:'',
        interests:'',
        loading:true
    }


    async componentDidMount(){

        const token = await AsyncStorage.getItem("token")
       
        const customer_id = await AsyncStorage.getItem("customer_id")
       // alert(customer_id)
        this.setState({token,customer_id})
        this.getAllTests()
    
    
       // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
    }

    getAllTests = async () => {
       // alert('ok')
        var obj = {  
          method: 'GET',
          headers: {
            Authorization:  `Bearer ${this.state.token}`
           
          },
        }
    
        try {
            let URL = API.careerReport + `customer_id=${this.state.customer_id}` ;
          let response = await fetch(URL,obj);
          let json = await response.json();
          if(json.success === true){
              this.setState({
                  home : json.data.home_into,
                  howWorks:json.data.how_work,
                  peronally:json.data.persoanlity_text,
                  loading:false

              })
          }
         // console.log(json)
         

         
           //console.log("success",json);
        } catch (error) {
            this.setState({loading:false})
          console.error("error",error);
        }
      };
    

    render() {
        const {home, loading} = this.state ; 
        return (
            <View style={{flex:1}}>
                {/* <Text style={styles.name}>Dear Ahsan</Text  > */}
                  <ScrollView style={{marginBottom:10}}>
                        {this.state.loading && <ActivityIndicator size="large" color={colors.blue}/> }
                            
                        {!loading &&<HTML html={home} imagesMaxWidth={Dimensions.get('window').width} /> }

                   </ScrollView>
                
            
                {/* <Text style={[styles.name,{fontSize:15,bottom:0,position:'absolute',marginBottom:50}]}>Merafuture.pk Team </Text> */}
            </View>
        )
    }
}

export default home;

const styles = StyleSheet.create({
    name:{
        fontFamily:fonts.Sofia_Pro_MediumAz,
        fontSize:20,
        marginVertical:10,
        marginHorizontal:10
    },
    dretails:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        fontSize:15,
        marginHorizontal:10

    }
})
