import React, { Component } from 'react'
import { Text, View,StyleSheet, ScrollView, ActivityIndicator, Dimensions,TouchableOpacity } from 'react-native'
import fonts from '../../../constants/fonts';
import { StackedBarChart ,Grid} from 'react-native-svg-charts'
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../api/endPoints';
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

    state ={
        token:'',
        customer_id:'',
        home:'',
        howWorks:'',
        peronally:'',
        interests:'',
        loading:true,
        persoanlity1_one_sec:'',
        persoanlity1_two_sec:'',
        persoanlity1_three_sec:'',
        persoanlity2_one_sec:'',
        persoanlity2_two_sec:'',
        persoanlity2_three_sec:'',
        interestDay:[
            {count:0},{count:0},{count:0},{count:0},{count:0}
        ],
        six:0,
        five:0,
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
                  persoanlity1_one_sec:json.data.persoanlity1_one_sec,
                  persoanlity1_two_sec:json.data.persoanlity1_two_sec,
                  persoanlity1_three_sec:json.data.persoanlity1_three_sec,
                  persoanlity2_one_sec:json.data.persoanlity2_one_sec,
                  persoanlity2_two_sec:json.data.persoanlity2_two_sec,
                  persoanlity2_three_sec:json.data.persoanlity2_three_sec,
                  interestDay:json.data.persoanlity

              })
              console.log(this.state.interestDay.length)
          }
         // console.log(json)
         item1 = this.state.interestDay[0].y * 1000
         item2 = this.state.interestDay[1].y * 1000
         item3 = this.state.interestDay[2].y * 1000
         item4 = this.state.interestDay[3].y * 1000
         item5 = this.state.interestDay[4].y * 1000
         item6 = this.state.interestDay[5].y * 1000
     
         this.setState({five:item5})
         console.log("item1",item1)
         console.log("item2",item2)
         console.log("item3",item3)
         console.log("item4",item4)
         console.log("item5",item5)
         console.log("item6",item6)

        } catch (error) {
            this.setState({loading:false})
          console.error("error",error);
        }
      };

    render() {
        const {loading,peronally,persoanlity1_one_sec,persoanlity1_two_sec,persoanlity1_three_sec,
            persoanlity2_one_sec,persoanlity2_two_sec,persoanlity2_three_sec,
        selected1,selected2} = this.state ; 
        console.log("item1--->",item1)
        const data = [
            {
                month: new Date(2015, 0, 1),
                apples:this.state.interestDay[0].y * 1000,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges: 0,
                keelay:0
            },
            {
                month: new Date(2015, 1, 1),
                apples: 0,
                bananas: this.state.interestDay[1].y * 1000,
                cherries: 0,
                dates: 0,
                oranges:0,
                keelay:0
               
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: this.state.interestDay[2].y * 1000,
                dates: 0,
                oranges:0,
                keelay:0
                
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: this.state.interestDay[3].y * 1000,
                oranges:0,
                keelay:0
                
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges:this.state.interestDay[4].y * 1000,
                keelay:0
            },
            {
                month: new Date(2015, 2, 1),
                apples: 0,
                bananas: 0,
                cherries: 0,
                dates: 0,
                oranges:0,
                keelay:item6
               
            },
           
            
        ]
 
        const colors = ['blue', 'purple', 'green', 'red','yellow','pink']
        const keys   = ['apples', 'bananas', 'cherries', 'dates','oranges','keelay']

        const Axis = ({  x }) => (
            keys.map((value, index) => (
                <Text
                    key={ index }
                    style={{
                        top: (35 * index) + 10, 
                        left: -30,
                        fontSize: 15,
                        position:'absolute',
                        color: 'black' ,
                        right:20
                    }}
                >
                   {value}
                </Text>
            ))
        )

        return (

            
            <View style={{flex:1,marginHorizontal:10}}>

{loading && <Text style={{alignSelf:'center',fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:20,
                        marginVertical:20}}>Loading..</Text>}

                <Text style={styles.name}>Personality </Text>
                <ScrollView style={{marginBottom:10}}>


                <Text style={[styles.text1,{marginHorizontal:10}]}>The Subsiquent charts maps your answers with 6 personality types of the RIASEC Model.</Text>
          {!loading &&       <View style={{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1}} >
                    <View style={{marginLeft:10,marginTop:0,flex:1.1}}>
                        <Text style={styles.text1}>Building</Text>
                        <Text style={styles.text1}>Thinking</Text>
                        <Text style={styles.text1}>Creating</Text>
                        <Text style={styles.text1}>Helping</Text>
                        <Text style={styles.text1}>Persuading</Text>
                        <Text style={styles.text1}>Organizing</Text>
                       

                    </View>

                    <View style={{flex:3.5,width:'30%',alignSelf:'center',marginRight:20}}>
                         <StackedBarChart
                            horizontal={true}
                            style={{ height: 200}}
                            keys={keys}
                            colors={colors}
                            data={data}
                            yAccessor="a"
                            animate
                        
                            contentInset={{ top: 0, bottom: 0 }}>
                            <Grid 
                            direction={'VERTICAL'}
                            
                            />
                              {/* <Axis/>   */}
                              </StackedBarChart>  
                     </View> 
                 </View> } 
                 


                      
                        {loading && <ActivityIndicator size="large" color={Ccolors.blue}/> }
                         {!loading &&<HTML html={peronally} imagesMaxWidth={Dimensions.get('window').width} /> }

                         <View style={{flexDirection:'row'}}>
                             <TouchableOpacity style={[styles.button,{backgroundColor:selected1}]}
                                            onPress={()=> this.setState({showOne:true,showTwo:false,
                                            selected1:Ccolors.darkBlue,selected2:Ccolors.lightBlue})}>
                                            <Text style={styles.textWhite}>1st Dominant Personality</Text>
                              </TouchableOpacity>

                             <TouchableOpacity style={[styles.button,{backgroundColor:selected2}]}
                                        onPress={()=> this.setState({showOne:false,showTwo:true,selected1:Ccolors.lightBlue,selected2:Ccolors.darkBlue})}>
                                            <Text style={styles.textWhite}>2nd Dominant Personality</Text>
                            </TouchableOpacity>         
                         </View>


                          {this.state.showOne &&  
                               <View>
                                    {!loading &&<HTML html={persoanlity1_one_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
                                    {!loading &&<HTML html={persoanlity1_two_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
                                    {!loading &&<HTML html={persoanlity1_three_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
                               </View> }

                               {this.state.showTwo &&  
                               <View>
                                      {!loading &&<HTML html={persoanlity2_one_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
                                      {!loading &&<HTML html={persoanlity2_two_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
                                      {!loading &&<HTML html={persoanlity2_three_sec} imagesMaxWidth={Dimensions.get('window').width} /> }
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
        marginRight:2,
    },
    text1:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        fontSize:13,
        marginVertical:8,
        marginRight:3
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
