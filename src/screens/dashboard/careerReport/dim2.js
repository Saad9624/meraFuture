import React, { Component } from 'react'
import { Text, View,StyleSheet, Dimensions, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native'
import fonts from '../../../constants/fonts';
import { StackedBarChart ,Grid} from 'react-native-svg-charts'
import { API } from '../../../api/endPoints';
import AsyncStorage from '@react-native-community/async-storage';
import HTML from 'react-native-render-html';
import Ccolors from '../../../constants/colors';


var item1 = 0 ; 
var item2 = 0 ; 
var item3 = 0 ; 
var item4 = 0 ; 
var item5 = 0 ; 
var item6 = 0 ; 
var item7 = 0 ; 
var item8 = 0 ; 
var item9 = 0 ; 
var item10 = 0 ; 

export class home extends Component {

  state={
    interest1_sec1_text:'',
    interest1_sec2_text:'',
    interest1_sec3_text:'',
    interest2_sec1_text:'',
    interest2_sec2_text:'',
    interest2_sec3_text:'',
    interest_text:'',
    token:'',
    customer_id:'',
    home:'',
    howWorks:'',
    peronally:'',
    interests:'',
    loading:true,
    interestDay:[
        {count:0},{count:0},{count:0},{count:0},{count:0}, {count:0},{count:0},{count:0},{count:0},{count:0}
    ],
    showOne:true ,
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
              loading:false,
              interest_text:json.data.interest_text,
              interest1_sec1_text:json.data.interest1_sec1_text,
              interest1_sec2_text:json.data.interest1_sec2_text,
              interest1_sec3_text:json.data.interest1_sec3_text,
              interest2_sec1_text:json.data.interest2_sec1_text,
              interest2_sec2_text:json.data.interest2_sec2_text,
              interest2_sec3_text:json.data.interest2_sec3_text,
              interestDay:json.data.interest_grafh

          })
      }
      item1 = this.state.interestDay[0].count 
      item2 = this.state.interestDay[1].count 
      item3 = this.state.interestDay[2].count 
      item4 = this.state.interestDay[3].count 
      item5 = this.state.interestDay[4].count 
      item6 = this.state.interestDay[5].count 
      item7 = this.state.interestDay[6].count 
      item8 = this.state.interestDay[7].count 
      item9 = this.state.interestDay[8].count 
      item10 = this.state.interestDay[9].count 
      this.setState({five:item5})
      console.log("item1",item1)
      console.log("item2",item2)
      console.log("item3",item3)
      console.log("item4",item4)
      console.log("item5",item5)
      console.log("item6",item6)
      console.log("item7",item7)
      console.log("item8",item8)
      console.log("item9",item9)
      console.log("item10",item10)

     // console.log(json)
     

     
       //console.log("success",json);
    } catch (error) {
        this.setState({loading:false})
      console.error("error",error);
    }
  };


    render() {
        const {loading,interest1_sec1_text,interest1_sec2_text,
            interest1_sec3_text,interest2_sec1_text,interest2_sec2_text,
            interest_text,interest2_sec3_text,selected1,selected2} = this.state ; 

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples:item1 === null ? 0 : item1,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 0,
                bananas: item2 === null ? 0 : item2,
                cherries: 0,
                dates: 0,
                oranges:0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries:  item3 === null ? 0 : item3,
                dates: 0,
                oranges:0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: item4 === null ? 0 : item4,
                oranges:0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges:item5 === null ? 0 : item5,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 0, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: item6 === null ? 0 : item6,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 0, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: 0,
                ban: item7 === null ? 0 : item7,
                cher: 0,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 0, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: 0,
                ban: 0,
                cher: item8 === null ? 0 : item8,
                dat: 0,
                ora: 0,
            },
            {
                month: new Date(2015, 0, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: item9 === null ? 0 : item9,
                ora: 0,
            },
            {
                month: new Date(2015, 0, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                app: 0,
                ban: 0,
                cher: 0,
                dat: 0,
                ora: item10 === null ? 0 : item10,
            },
            
        ]
 
        const colors = ['blue', 'purple', 'green', 'red','yellow','blue', 'purple', 'green', 'red','yellow']
        const keys   = ['apples', 'bananas', 'cherries', 'dates','oranges','app', 'ban', 'cher', 'dat','ora']

        return (
            <View style={{marginHorizontal:10}}>
                {/* <Text style={styles.name}>Personality </Text> */}
                <Text style={styles.name}>Interests </Text>

                <ScrollView style={{marginBottom:10}}>

<Text style={[styles.text1,{marginHorizontal:10}]}>The Subsiquent charts maps your answers with 6 personality types of the RIASEC Model.</Text>



       {!loading &&      <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1}} >
                    <View style={{marginLeft:2,marginTop:0,flex:2}}>
                        <Text style={styles.text}>Comm & Media-</Text>
                        <Text style={styles.text}>Creatives-</Text>
                        <Text style={styles.text}>Fashion-</Text>
                        <Text style={styles.text}>Engineering-</Text>
                        <Text style={styles.text}>Sci & Tech-</Text>
                        <Text style={styles.text}>Bus & Mgt-</Text>
                        <Text style={styles.text}>Social Work-</Text>
                        <Text style={styles.text}>Defense-</Text>
                        <Text style={styles.text}>Hospitality-</Text>
                        <Text style={styles.text}>Social Sciences-</Text>

                    </View>
                    <View style={{flex:3,width:'30%',alignSelf:'center',marginRight:20}}>
                        <StackedBarChart
                            horizontal={true}
                            style={{ height: 200}}
                            keys={keys}
                            colors={colors}
                            data={data}
                            animate
                            contentInset={{ top: 0, bottom: 0 }}>
                            <Grid 
                            direction={'VERTICAL'}
                            
                            />
                            </StackedBarChart>
                    </View>
                </View>}

                            {loading && <Text style={{alignSelf:'center',fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:20,
                        marginVertical:20}}>Loading..</Text>}
                        
                            {loading && <ActivityIndicator size="large" color={Ccolors.blue}/> }
                            {!loading &&<HTML html={interest_text} imagesMaxWidth={Dimensions.get('window').width} /> }

                            <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={[styles.button,{backgroundColor:selected1}]}
                                                    onPress={()=> this.setState({showOne:true,showTwo:false,
                                                    selected1:Ccolors.darkBlue,selected2:Ccolors.lightBlue})}>
                                                    <Text style={styles.textWhite}>1st Dominant Interest</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.button,{backgroundColor:selected2}]}
                                                onPress={()=> this.setState({showOne:false,showTwo:true,selected1:Ccolors.lightBlue,selected2:Ccolors.darkBlue})}>
                                                    <Text style={styles.textWhite}>2nd Dominant Interest</Text>
                                    </TouchableOpacity>            
                            </View>

                         {this.state.showOne &&  
                               <View>
                                    {!loading &&<HTML html={interest1_sec1_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                                     {!loading &&<HTML html={interest1_sec2_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                                     {!loading &&<HTML html={interest1_sec3_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                               </View> }

                               {this.state.showTwo &&  
                               <View>
                                   {!loading &&<HTML html={interest2_sec1_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                                   {!loading &&<HTML html={interest2_sec2_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                                   {!loading &&<HTML html={interest2_sec3_text} imagesMaxWidth={Dimensions.get('window').width} /> }
                               </View> }

                            
                            
                   </ScrollView>
        
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
    text:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        textAlign:'right',
        marginRight:2
    },
    text1:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        marginVertical:8,
        fontSize:13,
    },
    button:{
        margin:10,
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
        fontSize:18
      }
})
