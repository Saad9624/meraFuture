import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions,TextInput,Picker } from 'react-native'
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
import { API } from '../../../api/endPoints';
import Shimmer from 'react-native-shimmer';
import {
  back,
  burger,
  logo,search
} from '../../../constants/images';

import * as Animatable from 'react-native-animatable' ;
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../../constants/colors';
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[
            {cat_name:'Abasyn University', catName2:'CAREER COUNSELLING TEST' ,image:career1,route:'Video'},
            {cat_name:'The AGA Khan University' , catName2:'WITH CAREER COUNSELLOR' ,image:career6,route:'Video'},
            {cat_name:'Abdul Wali Khan University', catName2:'AND DEGREES',image:career7,route:'Video'},
            {cat_name:'ADVICE FROM', catName2:'PROFESSIONALS',image:career4,route:'Video'},
            {cat_name:'CONTACT US', catName2:'' ,image:contact,route:'Video'},
        ],
        token:'',
        loading:true,
        searchBar:false,
        city:'',
        field:'',
        degree:'',
        allCities:[],
        selectedCity:'',
        allUni:[],
        selectedUni:'',
    }
}

citiesList = () =>{
  return( this.state.allCities.map((data,i) => { 
        return( <Picker.Item label={data.city} key={data.city} value={data}   />)} ));
}
uniList = () =>{
  return( this.state.allUni.map((data,i) => { 
        return( <Picker.Item label={data.university_name} key={data.university_name} value={data}   />)} ));
}

getCities = async () => {
  //  console.warn(this.state.token)
  var obj = {  
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.state.token}` ,
     
    },
  }
 
     try {
       let response = await fetch(
        API.getAllCitites, obj
       );
       let json = await response.json();
       this.setState({
        allCities:json.data
      }) 
       
     this.setState({loading:false})
     
    
     } catch (error) {
         this.setState({
             loading:false
           })
       console.error("error",error);
     }
};

getAllUni = async () => {
  //  console.warn(this.state.token)
  var obj = {  
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.state.token}` ,
     
    },
  }
 
     try {
       let response = await fetch(
        API.getAllUni, obj
       );
       let json = await response.json();
       this.setState({
        allUni:json.data
      }) 
       
     this.setState({loading:false})
     
    
     } catch (error) {
         this.setState({
             loading:false
           })
       console.error("error",error);
     }
};
  async componentDidMount(){

    const token = await AsyncStorage.getItem("token")
   // alert(token)
    const customer_id = await AsyncStorage.getItem("customer_id")
    this.setState({token})
    this.getUniversities()
    this.getCities()
    this.getAllUni()
   // this.getFaqs()

   // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
}

getUniversities = async () => {
  this.setState({loading:true})
//  console.warn(this.state.token)
    var obj = {  
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}` ,
       
      },
    }

    try {
      let response = await fetch( API.getAllUni + `degree=${this.state.degree}&city=${this.state.city}&field=${this.state.field}`, obj
      );
      let json = await response.json();
     // alert(json);
      this.setState({
        data:json.data,
        loading:false
      })
      this.arrayholder = json.data;
      // console.log("success",json.data);
    } catch (error) {
        this.setState({
            loading:false
          })
      console.error("error",error);
    }
  };
 

// componentDidMount(){
//     this.props.navigation.navigate('payFee')
// }

_renderItem=({item}) =>{

    return(
        <View
        
        style={styles.itemStyle}>
              {this.state.loading && 
                 <Shimmer style={{width:120,height:120,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
            <Image
            
            style={[AppStyles.largeImage,{marginTop:10}]} source={{uri:item.university_image}}/>
           <TouchableOpacity 
           //onPress={()=> this.props.navigation.navigate(item.route)}
           style={{marginBottom:15}}>
               
           <TextView 
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='black'
            fontSize={15} 
            marginVertical={1}
            text={item.university_name}/>
             <TextView 
            // numberOfLines={4}
             height={60}
            marginVertical={5}
            fontFamily={fonts.Sofia_Pro_Light_Az}
            color='black'
            fontSize={11} 
            text={item.university_desc}/>
         
           </TouchableOpacity>
           
           
        </View>
    )
  }
  searchText = (e) => {
    let text = e.toLowerCase()
    let trucks = this.state.data
    let filteredName = trucks.filter((item) => {
      return item.university_name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
       data:this.state.data
      })
    } 
    else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        data: filteredName
      })
    }
  }
  searchFilterFunction1 = text => {
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.university_name}   
          ${item.university_name} ${item.university_name}`;
    
          const textData = text;
    
          return itemData.indexOf(textData) > -1;
        });
    
        this.setState({data: newData});
      };

       onSearchPRessAgain = ()=>{
        this.setState({searchBar:false})
     
       }

    render() {
      const {searchBar}= this.state ;
        return (
            <View style={{flex:1}}>
                 <View style={styles.row}>
            <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <TouchableOpacity onPress={()=> 
                         this.props.navigation.goBack() }>
                             
                        <Image style={AppStyles.smallMediumImage}
                         source={back}/>

                </TouchableOpacity>
                {searchBar && 
               <Animatable.View 
                    duration={1000}
                    animation="zoomInRight"
                    onPress={()=> this.setState({searchBar:false})}
                    style={styles.searchBar}>
                        <TouchableOpacity onPress={()=> this.onSearchPRessAgain() }>
                             <Image source={search} style={[AppStyles.smallImage,{tintColor:'white',marginHorizontal:10}]}/>
                        </TouchableOpacity>
                    
                    <TextInput
                     onChangeText={(text)=>this.searchFilterFunction1(text)}
                    style={styles.text}

                    placeholderTextColor="white"
                    placeholder="Search University"/>
                </Animatable.View> }
               
            </View>
            {!searchBar && <TextView 
        fontSize={18}
        fontFamily={fonts.Sofia_Pro_Light_Az}
       text={"Universities"}
       /> }
                

             {!searchBar &&   <TouchableOpacity onPress={()=> this.setState({searchBar:true})}
                     style={{marginRight:10}} >
                        <Image style={[AppStyles.smallMediumImage,{tintColor:'white'}]}
                        source={search}/>

                </TouchableOpacity>}

        </View>

                   <View style={styles.picker}>
                         <Picker
                            style={{width:'100%'}}
                                    selectedValue={this.state.selectedCity}
                                    onValueChange={ (value,key) => this.setState({city:value}) }>
                                    { this.citiesList() }
                         </Picker>
                  </View>
                  <View style={styles.picker}>
                         <Picker
                            style={{width:'100%'}}
                                    selectedValue={this.state.uniList}
                                    onValueChange={ (value,key) => this.setState({uniList:value}) }>
                                    { this.uniList() }
                         </Picker>
                  </View>

<TextInput
                     onChangeText={(degree)=>this.setState({degree})}
                    style={styles.picker}

                    placeholderTextColor="grey"
                    placeholder="By Degree"/>


<TextInput
                     onChangeText={(field)=>this.setState({field})}
                    style={styles.picker}

                    placeholderTextColor="grey"
                    placeholder="By Field"/>

                <TouchableOpacity
                   onPress={()=> this.getUniversities()}
                   style={{backgroundColor:colors.blue,width:'90%',alignSelf:'center',borderRadius:5,margin:5,height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={"Search"}/>
               </TouchableOpacity> 
                

                <FlatList
                numColumns={2}
                style={[styles.flatListStyle]}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />
            </View>
        )
    }
}

export default Home


const styles = StyleSheet.create({
   
    itemStyle:{
        marginHorizontal:3,
        marginVertical:3,
        borderRadius:2,
        flex:1,
        borderColor:'#e8e8e8',
        borderWidth:1,
        opacity:0.7,
        backgroundColor:'white'
    }, 
    text:{
      fontFamily:fonts.Sofia_Pro_Light_Az,
      width:'100%',
      color:'white'
  },
  input:{
    borderColor:'black',
    borderRadius:5,
    borderWidth:.5,
    padding:5,
    marginVertical:5,
    marginHorizontal:5
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
        borderRadius:60
    },
    shimmer1:{
        backgroundColor:'black',
        height:20,
        marginHorizontal:20,
    },
    row:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:60,
      alignItems:'center'
      ,backgroundColor:colors.blue,
  },
  searchBar:{
    borderColor:'white',
    borderWidth:1,
    borderRadius:5,
    flex:5,
    height:40,
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10,
    marginVertical:10,
    width:'80%',
},
picker:{
  borderColor:'white',
  borderWidth:1,
  backgroundColor:'white',
  alignSelf:'center',
  marginHorizontal:3,
  marginVertical:12,
  width:'95%',
   height:Dimensions.get('window').height / 19,
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
  marginTop:10,
  borderRadius:5
},
});
