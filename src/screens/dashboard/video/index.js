import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import React, { Component } from 'react'
import { PureComponent } from 'react';
import { Text, View,StyleSheet,Dimensions,FlatList } from 'react-native'
import WebView from 'react-native-webview';
import YouTube from 'react-native-youtube';
import { API } from '../../../api/endPoints';
import TextView from '../../../components/textView';
import Toolbar from '../../../components/toolbar' ;
import fonts from '../../../constants/fonts';
import Shimmer from 'react-native-shimmer';

export class index extends PureComponent {

  constructor(props) {
      super(props);
        this.state = {
          token:'',
          loading:true
    }
}

   async componentDidMount(){
      const token = await AsyncStorage.getItem("token")
      const customer_id = await AsyncStorage.getItem("customer_id")
      this.setState({
        token
        })

        this.getVideo()
    }

    state={
        videosList:[],
        height:100
    }

    getVideo=()=>{
 
      this.setState({loading:true})
let URL = API.getVideos ; ;
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
        'language': 'en',
        })
      
       })
  .then((res) => res.json())
  .then(res=>{
      console.log("if",res)

      if(res.success === true){
          this.setState({
            videosList:res.data,
            loading:false
        })
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

    getMoviesFromApiAsyn1c = async () => {
        var obj = {  
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`
           
          },
          body:JSON.stringify({
            'language': 'en',
          })
        }

        try {
          let response = await fetch(
            "https://merafuture.pk/api/home/videos?", obj
          );
          let json = await response.json();
           console.log("success",json);
           
           this.setState({
               videosList:json.data,
               loading:false
           })
        } catch (error) {
          this.setState({
            loading:false
          })
          alert("Something went wrong!")
          console.error("error",error);
        }
      };


    _renderItem=({item}) =>{

        return(
          <View>
             <Text style={{alignSelf:'center',fontSize:18,
            marginVertical:10,fontFamily:fonts.Sofia_Pro_Light_Az}}>{item.title}</Text>
                   <View style={{backgroundColor:'black',width:'100%',height:300}}>
                  
                   <WebView
                           style={{ width: '100%', height: 230,flex:1 ,backgroundColor:'black'}}
                           javaScriptEnabled={true}
                           domStorageEnabled={true}
                           source={{ uri: `https://www.youtube.com/embed/${item.video}` }}
                         />


                  </View> 
          </View>
            // <View
            
            // style={styles.itemStyle}>
            //     <TextView
            //     fontColor={'black'}
            //     text={item.title}
            //     />
            //     {/* <View style={{backgroundColor:'black',width:'100%',height:300}}>
            //       <WebView
            //               style={{ width: '100%', height: 230,flex:1 }}
            //               javaScriptEnabled={true}
            //               domStorageEnabled={true}
            //               source={{ uri: `https://www.youtube.com/embed/${item.video}` }}
            //             />


            //       </View> */}
               
               
            // </View>
        )
      }
      // onViewableItemsChanged = async ({ viewableItems }) => {
      //   if (viewableItems != '' && viewableItems != null) {
      //     var indexvalue = viewableItems[0]['index'];
      //     indexvalue++;
      //     if (indexvalue != 1) {
      //       if (!this.player[indexvalue].state.isPlaying) {
      //         this.player[indexvalue].pause();
      //       } else {
      //         this.player[indexvalue].resume();
      //       }
      //     }
      //   }
      // }

    render() {
        return (
            <View>
                <Toolbar navigation={this.props.navigation}  header="Video"/>
                {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                {this.state.loading && 
                 <Shimmer style={{width:'90%',height:200,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
                <FlatList
                // onViewableItemsChanged={this.onViewableItemsChanged}
                style={[styles.flatListStyle]}
                data={this.state.videosList}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />
              
            </View>
        )
    }
}

export default index


const styles = StyleSheet.create({
   
    itemStyle:{
        marginHorizontal:3,
        marginVertical:3,
        borderRadius:2,
        flex:1,
        height:Dimensions.get('window').height /1.2,
        borderColor:'black',
        borderWidth:1,
        opacity:0.7,
        margin:10
    }, 
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
