import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,FlatList, ImageBackground ,Image, ScrollView, TouchableOpacity,LogBox} from 'react-native'
import fonts from '../../../constants/fonts';
import TextView from '../../../components/textView' ;
import Ccolors from '../../../constants/colors';
import {
    numerical, mechanical, inductive, deductive, error, verbal
} from '../../../constants/images' ;
import { PieChart } from 'react-native-svg-charts'
import HTML from 'react-native-render-html';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../api/endPoints';


export class home extends Component {

    constructor(props) {
        super(props);
        this.state = {

          numericalCorrect:0,
          numericalIncorrect:0,
          numericalText:'',
          numericalTextDetail1:'',
          numericalTextDetail2:'',


          mechanicalCorrect:0,
          mechanicalI:0,
          mechanicalText:'',
          mechanicalTextDetail1:'',
          mechanicalTextDetail2:'',

          inductiveC:0,
          inuctiveIC:0,
          inductiveText:'',
          inductiveTextDetail1:'',
          inductiveTextDetail2:'',

          deductiveC:0,
          deductiveIC:0,
          deductiveText:'',
          deductiveTextDetail1:'',
          deductiveTextDetail2:'',

          errorCheckingC:0,
          errorCheckingIC:0,
          errorcheckingText:'',
          errorcheckingTextDetail1:'',
          errorcheckingTextDetail2:'',

          VerbalReasingC:0,
          verbalReasingIC:0,
          verbalReasingText:'',
          verbalReasingTextDetail1:'',
          verbalReasingTextDetail2:'',

          verbalTextC:0,
          verbalTextIC:0,
          verbalText:'',
          verbalTextDetail1:'',
          verbalTextDetail2:'',



          text:'', 
          correct:0,
          incorrect:0,
          loading:true,
          detail1:'',
          detail2:'' ,

          Num:Ccolors.darkBlue,
          mec:Ccolors.lightBlue,
          ind:Ccolors.lightBlue,
          ded:Ccolors.lightBlue,
          ver:Ccolors.lightBlue,
          err:Ccolors.lightBlue,
          
          



       
    }
}
async componentDidMount(){
  LogBox.ignoreAllLogs()

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
          loading:false,
          numericalCorrect : json.data.numerical.Correct,
          numericalIncorrect :json.data.numerical.Incorrect,
          numericalText: json.data.numerical_text.section_one ,
          numericalTextDetail1: json.data.numerical_text.section_two ,
          numericalTextDetail2: json.data.numerical_text.section_three ,

          mechanicalCorrect : json.data.machnical.Correct,
          mechanicalI :json.data.machnical.Incorrect,
          mechanicalText: json.data.mechnical_text.section_one ,
          mechanicalTextDetail1: json.data.mechnical_text.section_two ,
          mechanicalTextDetail2: json.data.mechnical_text.section_three ,

          inductiveC: json.data.inductive.Correct,
          inuctiveIC:json.data.inductive.Incorrect,
          inductiveText: json.data.inductive_text.section_one ,
          inductiveTextDetail1: json.data.inductive_text.section_two ,
          inductiveTextDetail2: json.data.inductive_text.section_three ,

          deductiveC : json.data.deductive.Correct,
          deductiveIC :json.data.deductive.Incorrect,
          deductiveText: json.data.deductive_text.section_one ,
          deductiveTextDetail1: json.data.deductive_text.section_two ,
          deductiveTextDetail2: json.data.deductive_text.section_three ,

          errorCheckingC : json.data.error_checking.Correct,
          errorCheckingIC :json.data.error_checking.Incorrect,
          errorcheckingText: json.data.error_checking_text.section_one ,
          errorcheckingTextDetail1: json.data.error_checking_text.section_two ,
          errorcheckingTextDetail2: json.data.error_checking_text.section_three ,


          VerbalReasingC :json.data.verbal_reasonig.Correct,
          verbalReasingIC :json.data.verbal_reasonig.Incorrect,
          verbalText: json.data.verbal_text.section_one ,
          verbalTextDetail1: json.data.verbal_text.section_two ,
          verbalTextDetail2: json.data.verbal_text.section_three ,


        })
        this.setValues(this.state.numericalText , this.state.numericalCorrect ,  
          this.state.numericalIncorrect, this.state.numericalTextDetail1, this.state.numericalTextDetail2,
          Ccolors.darkBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,)
        console.log(this.state.interestDay)
    }
   

   
     //console.log("success",json);
  } catch (error) {
      this.setState({loading:false})
    console.error("error",error);
  }
};

setValues = (text, correct, incorrect,detail1,detail2,Num,mec,ind,ded,ver,err)=>{

  this.setState({
    text ,correct, incorrect, detail1, detail2 , Num,mec,ind,ded,ver,err
  })
}


    render() {
      const {Num , mec , ind,ded,err,ver} = this.state 
      const data = [
        {
            key: 1,
            value: this.state.correct,
            svg: { fill: Ccolors.blue },
        },
        {
            key: 2,
            value: this.state.incorrect,
            svg: { fill: '#9900cc' }
        },
      
    ]
 
     

        return (
            <View style={{flex:1}}>
                <Text style={styles.name}>Subjects</Text>

              <View style={{flexDirection:'row'}}>

                

               

              <TouchableOpacity style={[styles.button,{backgroundColor:Num}]}
               onPress={()=> this.setValues(this.state.numericalText , this.state.numericalCorrect , this.state.numericalIncorrect, this.state.numericalTextDetail1,  this.state.numericalTextDetail1,
                Ccolors.darkBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,)}>
                  <Text style={styles.text}>Numerical</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button,{backgroundColor:mec}]}
               onPress={()=> this.setValues(this.state.mechanicalText , this.state.mechanicalCorrect , this.state.mechanicalI, this.state.mechanicalTextDetail1, this.state.mechanicalTextDetail2,
                Ccolors.lightBlue,Ccolors.darkBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,)}>
                  <Text style={styles.text}>Mechanical</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button,{backgroundColor:ind}]}
               onPress={()=> this.setValues(this.state.inductiveText , this.state.inductiveC , this.state.inuctiveIC,this.state.inductiveTextDetail1, this.state.inductiveTextDetail2,
                Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.darkBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,)}>
                  <Text style={styles.text}>Inductive</Text>
              </TouchableOpacity>

            
              </View>
                <View style={{flexDirection:'row'}}>

             
              
                <TouchableOpacity style={[styles.button,{backgroundColor:ded}]}
               onPress={()=> this.setValues(this.state.deductiveText , this.state.deductiveC , this.state.deductiveIC, this.state.deductiveTextDetail1, this.state.deductiveTextDetail2,
              Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.darkBlue,Ccolors.lightBlue,Ccolors.lightBlue,)}>
                  <Text style={styles.text}>Deductive</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button,{backgroundColor:ver}]}
               onPress={()=> this.setValues(this.state.verbalText , this.state.VerbalReasingC , this.state.verbalReasingIC, this.state.verbalTextDetail1, this.state.verbalTextDetail2,
              Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.darkBlue,Ccolors.lightBlue,)}>
                  <Text style={styles.text}>Verbal Reasoning</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button,{backgroundColor:err}]} 
              onPress={()=> this.setValues(this.state.errorcheckingText , this.state.errorCheckingC , this.state.errorCheckingIC, this.state.errorcheckingTextDetail1, this.state.errorcheckingTextDetail2,
              Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.lightBlue,Ccolors.darkBlue,)}>

                  <Text style={styles.text}>Error Checking</Text>
              </TouchableOpacity>
              </View>
              {this.state.loading && <Text style={{alignSelf:'center',fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:20,
                        marginVertical:20}}>Loading..</Text>}

<ScrollView>


                  <View style={{marginHorizontal:10}}>
                     <HTML html={this.state.text} imagesMaxWidth={Dimensions.get('window').width} /> 
                  </View>
            
            <View style={{flexDirection:'row',alignItems:'center'}}>

            
              <PieChart
                  style={{ height: 200 ,flex:1}}
                  outerRadius={'70%'}
                  innerRadius={10}
                  data={data} />

            <View>
                <View style={styles.row}>
                    <View style={[styles.square,{backgroundColor:Ccolors.blue}]}/>
                    <Text style={styles.blackText}>{this.state.correct + "% "}Correct</Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.square,{backgroundColor:"#9900cc"}]}/>
                    <Text style={styles.blackText}>{this.state.incorrect + "% "}InCorrect</Text>
                </View>
            </View>


                 
            </View>
                

                <View style={{marginHorizontal:10}}>
                     <HTML html={this.state.detail1} imagesMaxWidth={Dimensions.get('window').width} /> 
                     <HTML html={this.state.detail2} imagesMaxWidth={Dimensions.get('window').width} /> 
                  </View>


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
    square:{
      height:20,
      width:20,
      marginHorizontal:5
    },
    row:{
      flexDirection:'row',
      marginHorizontal:20,
      alignItems:'center',
      marginVertical:5
    },
    itemStyle:{
        marginHorizontal:3,
        marginVertical:3,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        borderRadius:5,
        flex:1,
        height:Dimensions.get('window').height / 5,
        backgroundColor:Ccolors.darkBlue,
        marginHorizontal:8,
        marginVertical:8
    }, 
    flatListStyle:{
        alignSelf:'center',
        marginVertical:10,
        width:'100%',
        height:'100%',
    },
    button:{
      margin:10,
      backgroundColor:Ccolors.blue,
      padding:10,
      borderRadius:5,
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    text:{
      color:'white',
      fontFamily:fonts.Sofia_Pro_RegularAz,
      textAlign:'center'
    },
    blackText:{
      fontFamily:fonts.Sofia_Pro_RegularAz,
      textAlign:'center'
    }
})
