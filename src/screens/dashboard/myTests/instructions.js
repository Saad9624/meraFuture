import AsyncStorage from '@react-native-community/async-storage';
import React, { Component,Dimensions } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import Shimmer from 'react-native-shimmer';
import { API } from '../../../api/endPoints';
import fonts from '../../../constants/fonts';
import HTML from 'react-native-render-html';

export class results extends Component {

    state={
        loading:true,
        text:'' ,
        test_second:''
    }

    async componentDidMount(){

        const token = await AsyncStorage.getItem("token")
        const customer_id = await AsyncStorage.getItem("customer_id")
        this.setState({token})
        this.getUniversities()
    }
    
    getUniversities = async () => {
        var obj = {  
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.token}` ,
           
          },
        }
    
        try {
          let response = await fetch(
           API.getInstructions, obj
          );
          let json = await response.json();
         // alert(json);
          this.setState({
            text:json.data.test_first,
            test_second:json.data.test_second,
            loading:false
          })
           console.log("success",json.data);
        } catch (error) {
            this.setState({
                loading:false
              })
          console.error("error",error);
        }
      };


  
    render() {
        return (
            <View style={{padding:10}}>
                   {this.state.loading && 
                 <Shimmer style={{width:'90%',height:20,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                
           <HTML html={this.state.text}  /> 
              <HTML html={this.state.test_second} /> 
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

