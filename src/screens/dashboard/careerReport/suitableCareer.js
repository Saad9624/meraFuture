import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { Text, View,StyleSheet, ScrollView, ActivityIndicator, Dimensions ,TouchableOpacity } from 'react-native'
import HTML from 'react-native-render-html';
import { API } from '../../../api/endPoints';
import TextView from '../../../components/textView';
import Ccolors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export class home extends Component {

    state ={
        token:'',
        customer_id:'',
        home:'',
        howWorks:'',
        peronally:'',
        interests:'',
        loading:true,

        sec1:'',
        sec2:'',
        sec3:'',

        sec4:'',
        sec5:'',
        sec5:'',

        degree_main_text:'',
        showOne:true,
        showTwo:false ,
        selected1:Ccolors.darkBlue,
        selected2:Ccolors.lightBlue,
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
         //    alert(this.state.customer_id)
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
            console.log("------------>>>>>>>>>>>>>",json.degree_main_text)
          if(json.success === true){
              this.setState({
                  home : json.degree_main_text,
                 sec1:json.suitable_fields_one.section_one,
                 sec2:json.suitable_fields_one.section_two,
                 sec3:json.suitable_fields_one.section_three,
                 sec4:json.suitable_fields_two.section_title,
                 sec5:json.suitable_fields_two.section_one,
                 sec6:json.suitable_fields_two.section_two,
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
        const {sec1,sec2,sec3,sec4,sec5,sec6,loading,home,selected1,selected2} = this.state ; 
        return (
            <View style={{flex:1}}>
              <Text style={styles.name}>Suitable Careers</Text>
                {this.state.loading && <Text style={{alignSelf:'center',fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:20,
                        marginVertical:20}}>Loading..</Text>}
                        
                {/* <Text style={styles.name}>Dear Ahsan</Text  > */}
                  <ScrollView style={{marginBottom:10,margin:10}}>
                        {this.state.loading && <ActivityIndicator size="large" color={Ccolors.blue}/> }


                        {!loading &&<HTML html={home} imagesMaxWidth={Dimensions.get('window').width} /> }

                        <View style={{flexDirection:'row'}}>
                              <TouchableOpacity style={[styles.button,{backgroundColor:selected1}]}
                                                    onPress={()=> this.setState({showOne:true,showTwo:false,
                                                    selected1:Ccolors.darkBlue,selected2:Ccolors.lightBlue})}>
                                            <Text style={styles.textWhite}>Suitable Field I</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={[styles.button,{backgroundColor:selected2}]}
                                                onPress={()=> this.setState({showOne:false,showTwo:true,selected1:Ccolors.lightBlue,selected2:Ccolors.darkBlue})}>
                                            <Text style={styles.textWhite}>Suitable Field II</Text>
                             </TouchableOpacity>         
                            </View>

                            {this.state.showOne &&  
                               <View>
                                   {!loading &&<HTML html={sec1} imagesMaxWidth={Dimensions.get('window').width} /> }
                                   {!loading &&<HTML html={sec2} imagesMaxWidth={Dimensions.get('window').width} /> }
                                   {!loading &&<HTML html={sec3} imagesMaxWidth={Dimensions.get('window').width} /> }
                               </View> }

                               {this.state.showTwo &&  
                               <View>
                                   {!loading &&<HTML html={sec4} imagesMaxWidth={Dimensions.get('window').width} /> }
                                   {!loading &&<HTML html={sec5} imagesMaxWidth={Dimensions.get('window').width} /> }
                                    {!loading &&<HTML html={sec6} imagesMaxWidth={Dimensions.get('window').width} /> }
                               </View> }
                      
                               {this.state.showOne && 
                                    <TouchableOpacity
                                      onPress={()=> this.props.navigation.navigate('DetailReport',{degree :'degree1'})}
                                      style={{backgroundColor:Ccolors.blue,width:'90%',alignSelf:'center',borderRadius:5,margin:5,height:40,alignItems:'center',justifyContent:'center'}}>
                                  <TextView 
                                    alignSelf="center"
                                
                                    color='white'
                                    fontSize={15} 
                                    marginVertical={1}
                                    text={"Show Detail Report"}/>
                                  </TouchableOpacity>  }

                              
                                  {this.state.showTwo &&      <TouchableOpacity
                                      onPress={()=> this.props.navigation.navigate('DetailReport',{degree :'degree2'})}
                                      style={{backgroundColor:Ccolors.blue,width:'90%',alignSelf:'center',borderRadius:5,margin:5,height:40,alignItems:'center',justifyContent:'center'}}>
                                  <TextView 
                                    alignSelf="center"
                                
                                    color='white'
                                    fontSize={15} 
                                    marginVertical={1}
                                    text={"Show Detail Report"}/>
                                  </TouchableOpacity> }


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

    },
    button:{
      marginHorizontal:5,
      marginVertical:10,
      backgroundColor:Ccolors.blue,
      padding:15,
      borderRadius:5,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    textWhite:{
      color:'white',
      fontFamily:fonts.Sofia_Pro_RegularAz,
      textAlign:'center',
      fontSize:17
    }
})
