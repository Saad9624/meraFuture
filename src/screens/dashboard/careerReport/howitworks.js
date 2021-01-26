import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,FlatList, ImageBackground,Image, ScrollView, ActivityIndicator } from 'react-native'
import fonts from '../../../constants/fonts';
import TextView from '../../../components/textView' ;
import colors from '../../../constants/colors';
import {
     dimension, dim2, dim3, dim4, how
} from '../../../constants/images' ;
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../api/endPoints';
import HTML from 'react-native-render-html';

export class home extends Component {


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



    constructor(props) {
        super(props);
        this.state = {
          data:[
            {cat_name:'DIMSION I:', catName2:'PERSALITY' ,image:dimension,reason:'who are you?',reason1:''},
            {cat_name:'DIMSION II:' , catName2:'INTERESTS',image:dim2,reason:'What you want to learn?',reason1:''},
            {cat_name:'DIMSION III:', catName2:'SUBJECTS',image:dim3,reason:'Your Knowledgebase',reason1:''},
            {cat_name:'SUITABLE CAREER', catName2:'FIELDS',image:dim4,reason:'Our AI Model matches you',reason1:'with suitable careers'},
        ],
        token:'',
        customer_id:'',
        home:'',
        howWorks:'',
        peronally:'',
        interests:'',
        loading:true,
    }
}

_renderItem=({item}) =>{

    return(
        <ImageBackground style={styles.itemStyle}>

            <Image source={item.image} style={{width:30,height:30,marginTop:15,resizeMode:'contain',marginVertical:10}}/>
           <TextView 
           alignSelf="center"
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={15} 
            marginVertical={1}
            text={item.cat_name}/>
             <TextView 
              alignSelf="center"
            marginVertical={-3}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='white'
            fontSize={15} 
            text={item.catName2}/>

<TextView 
              alignSelf="center"
            marginTop={10}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='silver'
            fontSize={10} 
            text={item.reason}/>
            <TextView 
              alignSelf="center"
            marginVertical={-12}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='silver'
            fontSize={10} 
            text={item.reason1}/>
           
           
        </ImageBackground>
    )
  }

    render() {

        const {howWorks, loading} = this.state ; 

        return (
            <View style={{flex:1,marginHorizontal:10}}>
                 
                  <ScrollView style={{marginBottom:10}}>
                        {this.state.loading && <ActivityIndicator size="large" color={colors.blue}/> }
                            
                        {!loading &&<HTML html={howWorks} imagesMaxWidth={Dimensions.get('window').width} /> }

                   </ScrollView>

                {/* <Text style={styles.dretails}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text> */}

                {/* <Text style={[styles.dretails,{marginVertical:10}]}>Our Test and AI model assess the following</Text> */}
           
                {/* <FlatList
                numColumns={2}
                style={[styles.flatListStyle]}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />
            */}
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
        marginHorizontal:7
    },
    dretails:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        fontSize:15,
        marginHorizontal:10,
        marginVertical:10

    },
    itemStyle:{
        marginHorizontal:3,
        marginVertical:3,
        alignItems:'center',
        alignContent:'center',
        borderRadius:5,
        flex:1,
        height:Dimensions.get('window').height / 4.5,
        backgroundColor:colors.darkBlue,
        marginHorizontal:8,
        marginVertical:8
    }, 
    flatListStyle:{
        alignSelf:'center',
        marginVertical:10,
        width:'100%',
        height:'100%',
    },
})
