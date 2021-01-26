import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet,Image,Modal,ScrollView, Alert, Dimensions, LogBox,BackHandler } from 'react-native'

import Toolbar from '../../../components/toolbar'
import CountDown from 'react-native-countdown-component';
import TextView from '../../../components/textView';
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';
import AppStyles from '../../../appstyles';
import { DarkTheme } from '@react-navigation/native';
import { API } from '../../../api/endPoints';
import Shimmer from 'react-native-shimmer';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { back } from '../../../constants/images';
import HTML from 'react-native-render-html';

import Like from '../../../assets/images/like.png'
import UnLike from '../../../assets/images/unlike.png'

var value = 0 ;
var questionValue = 1;
export class Instructions extends Component {

    
    state={
        questions:'' ,

        option1:'',
        option2:'',
        option3:'',
        option4:'',
        option5:'',
        allQuestions :[],
        counter:1,
        totalQuestions:'',
        questionNumber:1 , 
        check1:false,
        check2:false,
        check3:false,
        check4:false ,
        loading:true ,
        duration:0,
        header:'',
        token:'' ,
        testID:'' ,

        allAnswers:[],
        selectedValue:'' ,
        nextText:'Next',
        allQuestionsId:[],
        questionId:'',
        customer_id:'',
        detailsModalVisibility:true,
        description:'',
        startTimer:false,
        paragraph:'',
        setRemainingTime:0
        
    }


   async componentDidMount(){ 
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        const token = await AsyncStorage.getItem("token")
    const customer_id = await AsyncStorage.getItem("customer_id")
    this.setState({token , customer_id})

       if(this.props.route.params){
        
           var duration =  this.props.route.params.duration
          var header = this.props.route.params.header
          var testID = this.props.route.params.testID
          var description = this.props.route.params.description

           var converted = duration * 60 
           console.log("converted",converted)
           this.setState({
               duration :converted,
               header,
               testID,
               description
           })

       }
       setTimeout(() => {
        this.setState({duration:converted, header})
      }, 1000)
      this.getAllTests()

      this.forceUpdate()
    }
    
   
    handleBackButton = () => {
      Alert.alert(
          'MeraFuture',
          'Save your test to go back', [{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
          }, {
              text: 'OK',
              onPress: () => console.log('Cancel Pressed')
          }, ], {
              cancelable: false
          }
       )
       return true;
     }
    

    getAllTests = async () => {
        var obj = {  
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.token}`
           
          },
        }
    
        try {
          let response = await fetch(
         `https://merafuture.pk/api/home/getquestions?language=en&customer_id=${this.state.customer_id}&category_id=${this.state.testID}`, obj
          );
          let json = await response.json();

          this.setState({
            allQuestions:json.data,
            loading:false ,
            questions : json.data[0].question ,
            totalQuestions:json.data.length ,
            option1:json.data[0].option_1,
            option2:json.data[0].option_2 ,
            option3:json.data[0].option_3,
            option4:json.data[0].option_4,
            paragraph:json.data[0].verbal_reason_text,
            loading:false ,
            questionId:json.data[0].question_id
          })
         // alert(json.data.length)
        } catch (error) {
          console.error("error",error);
        }
      };

    setValue =()=>{
      this.refs._scrollView.scrollTo(0);

        if(this.state.check1 === true
           || this.state.check2 === true
            || this.state.check3 === true
             || this.state.check4 === true){

            if(this.state.nextText !== 'Finish')
            {

        const data = this.state.allQuestions ; // 7 questions total   7-1(6) > 
        if(data.length-2 > value){
          
                value = value + 1 
                questionValue = questionValue + 1 ;
                console.log("index" , value)

             this.setState({
                 questionNumber:questionValue,
                 questions:data[value].question ,
                 option1:data[value].option_1,
                 option2:data[value].option_2,
                 option3:data[value].option_3,
                 option4:data[value].option_4,
                 questionId:data[value].question_id,
                 paragraph:data[value].verbal_reason_text,
                 check1:false,
                 check2:false,
                 check3:false,
                 check4:false
                 
             })
            
            console.log("new value" , this.state.questionId  )
        }
        
        else{
              value = value + 1 
              questionValue = questionValue + 1 ;
              console.log("index" , value)

              this.setState({
                  questionNumber:questionValue,
                  questions:data[value].question ,
                  option1:data[value].option_1,
                  option2:data[value].option_2,
                  option3:data[value].option_3,
                  option4:data[value].option_4,
                  questionId:data[value].question_id,
                  paragraph:data[value].verbal_reason_text,
                  check1:false,
                  check2:false,
                  check3:false,
                  check4:false,
                  nextText:'Finish'
                  
              })
           
        }
        
        this.state.allAnswers.push(this.state.selectedValue)
        this.state.allQuestionsId.push(this.state.questionId)
        console.log("allQuestionsId" , this.state.allQuestionsId)
        console.log("allAnswers" , this.state.allAnswers)
            }
            else{
              this.state.allAnswers.push(this.state.selectedValue)
              this.state.allQuestionsId.push(this.state.questionId)
              console.log("allQuestionsId" , this.state.allQuestionsId)
              console.log("allAnswers" , this.state.allAnswers)
                this.newAttemptTest()
            }
    }
else{
  //  alert("")
    this.showAlert('Please answer all questions to proceed.')
}
    }
    showAlert=(data)=>{
      Alert.alert(
        '',
        data,
        
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }

    setnegValue =()=>{
      this.refs._scrollView.scrollTo(0);
        const data = this.state.allQuestions ;
        if(value >=1){
           
                value = value - 1 
                questionValue = questionValue - 1 ;
                console.log("new value before" , value  )
            this.setState({
                questionNumber : questionValue,
                questions:data[value].question,
                option1:data[value].option_1,
                option2:data[value].option_2,
                option3:data[value].option_3,
                option4:data[value].option_4,
                paragraph:data[value].verbal_reason_text,

                // check1:false,
                // check2:false,
                // check3:false,
                // check4:false
                

            })
            console.log("new value after" , value  )
            if(this.state.nextText === 'Finish'){
              this.setState({
                nextText:'Next'
              })
            }
        }
        
    }

    onRadioSelect = (one,two,three,four,selectedValue)=>{
        this.setState({
            check1:one,
            check2:two,
            check3:three,
            check4:four ,
            selectedValue
        })
    }

    attemptTest = async () => {
        this.setState({loading:true})
        var obj = {  
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`
           
          },
          body:JSON.stringify({
            'customer_id': this.state.customer_id,
            'category_id': this.state.testID,
            'remaining_time': 0,
            'question_id':this.state.allQuestionsId ,
            'option_id':this.state.allAnswers
          })

        }

        try {
          let response = await fetch(
            "https://merafuture.pk/api/test/attemtest", obj
          );
          let json = await response.json();
          this.setState({loading:false})

          if(json.data){
            this.showAlert(res.data)
          }
          else{
            alert("Something went wrong!") 
          }
           console.log("success",json);
           
        } catch (error) {
          console.error("error",error);
          this.setState({loading:false})

        }
      };

      newAttemptTest=()=>{
 
        this.setState({loading:true})
  let URL = "https://merafuture.pk/api/test/attemtest" ;
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
            'customer_id': this.state.customer_id,
            'category_id': this.state.testID,
            'remaining_time': 0,
            'question_id':this.state.allQuestionsId ,
            'option_id':this.state.allAnswers
          })
        
         })
    .then((res) => res.json())
    .then(res=>{
        console.log("if",res.data)
        console.log("if",res.success)

        if(res.data){
          this.showAlert(res.data)
            //  alert(res.data)
              this.setState({
                  loading:false
                  
              })
               this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'MyTest' },
            
                  ],
                })
              )
          
        }
        else{
            alert("Something went wrong!")
        }
    })
    .catch(err=>{
      console.log("err1",err)
    })
   }
    catch(e){
      console.log("err2",err)
    }

}

componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  value =  0 ;
  questionValue = 1 ;
}
renderBookAppointmentModal=()=>{
  return(
      <Modal
      backdropColor={'black'}
      backdropOpacity= {1}
        animationType="fade"
        transparent={true}
        visible={this.state.detailsModalVisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
         
       
            <View style={styles.modalView1}>
             

                   
                      <TextView color="black" text={this.state.header} />
                      <Text style={[AppStyles.title,{fontFamily:fonts.Sofia_Pro_Light_Az,fontSize:16}]}>{this.state.description}</Text>

                     
                     




              


               <View style={[styles.radioStyle,{margin:8,marginRight:20,flexDirection:'row',alignSelf:'flex-end'}]}>
               
                          <TouchableOpacity
                          style={{borderRadius:10,backgroundColor:colors.blue,marginHorizontal:10}}
                              //onPress={()=> this.setState({appointmentDialog:false})}
                              onPress={()=> this.props.navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [
                                    { name: 'MyTest' },
                            
                                  ],
                                })
                              )}
                              // onPress={()=> this.setState({detailsModalVisibility:false,startTimer:true})}
                            >
                              <TextView
                              color="white"
                              fontSize={15}
                              fontFamily={fonts.Sofia_Pro_Black_Az}

                              text="Save For Later"
                              />
                          </TouchableOpacity>

                          <TouchableOpacity
                          style={{borderWidth:1,borderColor:'silver',borderRadius:10}}
                          onPress={()=> this.setState({detailsModalVisibility:false,startTimer:true})}
    
                          //onPress={()=> this.setState({detailsModalVisibility:false})}
                              >
                              <TextView
                              color="black"
                              fontSize={15}
                              fontFamily={fonts.Sofia_Pro_Light_Az}

                              text="Proceed"
                              />
                          </TouchableOpacity>
               </View>
         
            </View>
             
        </View>
      </Modal>
  
  )
}
     
onChange =(value)=>{
 //console.log("value--->>>" , value/ 60)   
 this.setState({
   setRemainingTime : value 
 })
}

saveForLater=()=>{

  this.setState({loading:true,countDown:false,startTimer:false})
let URL = API.saveForLater ;
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
      'customer_id': this.state.customer_id,
      'category_id': this.state.testID,
      'timeremaining': this.state.setRemainingTime,
    })
  
   })
.then((res) => res.json())
.then(res=>{
  console.log("if",res)
  console.log("if",res)

  if(res.data){
    this.showAlert(res.data)
    
        this.setState({
            loading:false
            
        })
        //this.props.navigation.goBack()
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' },
      
            ],
          })
        )
    
  }
  else{
      this.setState({
          loading:false
          
      })
     alert(res.errorDetails)
  }
})
.catch(err=>{
console.log("err1",err)
})
}
catch(e){
console.log("err2",err)
}

}
    render() {
  
        return (
            <View style={{flex:1}}>
                        <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                        <TouchableOpacity 
                          onPress={()=> this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                { name: 'MyTest' },
                        
                              ],
                            })
                          )}
                        >
                                    
                                <Image style={AppStyles.smallMediumImage}
                              />

                        </TouchableOpacity>
                    
                    </View>
                        <TextView 
                        fontSize={18}
                        fontFamily={fonts.Sofia_Pro_Light_Az}
                        text={this.state.header}
                        />

                            <TextView 
                        fontSize={18}
                        fontFamily={fonts.Sofia_Pro_Light_Az}
                        text={""}
                        />

                </View>
                <TextView
                alignSelf="center"
                color="black"
                text="TIME REMAINING"
                fontSize={15}
                fontFamily={fonts.Sofia_Pro_MediumAz}
                />

            {this.state.duration ?
             <CountDown
             running={this.state.startTimer}
             showSeparator
             digitStyle={{backgroundColor: '#FFF', borderColor: '#1CC625'}}
             onChange={this.onChange}
              separatorStyle={{color: 'grey',}}
              timeToShow={['M', 'S']}
              until={this.state.duration}
              onFinish={() => this.newAttemptTest()}
              // onPress={() => alert('hello')}
              size={20}
              /> :
              <Text>Loading...</Text> }   

            <View style={[AppStyles.line,{backgroundColor:'orange',alignSelf:'center'}]}/>

           <ScrollView ref="_scrollView" style={{marginBottom:100}}>

           
   {!this.state.loading &&  
    <TextView
      fontSize={15}
      color="black"
      text={`Question ${this.state.questionNumber} of ${this.state.totalQuestions}`}
      /> }
      {this.state.loading && 
                 <Shimmer style={{width:200,height:10,marginVertical:20,marginHorizontal:10}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

      {!this.state.loading &&  <TextView
            fontSize={15}
            color="black"
            text={this.state.questions}
            />}

          {this.state.paragraph !== null || this.state.paragraph !== "" ?  
              <View style={{marginHorizontal:10}}>
                <HTML html={this.state.paragraph} imagesMaxWidth={Dimensions.get('window').width} /> 
              </View>

          : <View/>}
          {this.state.loading && 
                 <Shimmer style={{marginHorizontal:10}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

      
                         
                <TouchableOpacity 
                onPress={()=> this.onRadioSelect(true,false,false,false,this.state.option1)}
                style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:10}}>
                           <Radio
                               onPress={()=> this.onRadioSelect(true,false,false,false,this.state.option1)}
                                style={{marginTop:4}}
                                color={"black"}
                                selectedColor={"black"}
                                selected={this.state.check1}   />

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={this.state.option1}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> this.onRadioSelect(false,true,false,false,this.state.option2)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,width:'100%'}}>
                           <Radio
                              
                              onPress={()=> this.onRadioSelect(false,true,false,false,this.state.option2)}
                                style={{marginTop:4}}
                                color={"black"}
                                selectedColor={"black"}
                                selected={this.state.check2}   />

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={this.state.option2}
                            />
                            {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={()=> this.onRadioSelect(false,false,true,false,this.state.option4)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
                           <Radio
                             onPress={()=> this.onRadioSelect(false,false,true,false,this.state.option3)}
                                style={{marginTop:4}}
                                color={"black"}
                                selectedColor={"black"}
                                selected={this.state.check3}   />

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={this.state.option3}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

           {this.state.option4 === "" ? <View/> :          <TouchableOpacity
                    onPress={()=> this.onRadioSelect(false,false,false,true,this.state.option4)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
                           <Radio
                             onPress={()=> this.onRadioSelect(false,false,false,true,this.state.option4)}
                                style={{marginTop:4}}
                                color={"black"}
                                selectedColor={"black"}
                                selected={this.state.check4}   />

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={this.state.option4}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                               </TouchableOpacity> }
                          
                             
                               </ScrollView>
                     
                        <View style={styles.bottomBtn}>
                                            <TouchableOpacity 
                                        //    onPress={()=> this.props.navigation.dispatch(
                                        //     CommonActions.reset({
                                        //       index: 0,
                                        //       routes: [
                                        //         { name: 'MyTest' },
                                        
                                        //       ],
                                        //     })
                                        //   )}
                                            onPress={()=> this.setnegValue()}
                                            style={styles.btn}>
                                                <Text style={styles.text}>Previous</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity  
                                            onPress={()=> this.setValue()}
                                            //  onPress={()=> this.props.navigation.navigate('CareerReport')}
                                                style={styles.btn}>
                                                <Text style={styles.text}>{this.state.nextText}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity  
                                            onPress={()=> this.saveForLater()}
                                           // onPress={()=> this.setValue()}
                                            //  onPress={()=> this.props.navigation.navigate('CareerReport')}
                                                style={styles.btn}>
                                                <Text style={styles.text}>Save for Later</Text>
                                            </TouchableOpacity>
                        </View>
                        {this.renderBookAppointmentModal()}
            </View>
        )
    }
}

export default Instructions;

const styles = StyleSheet.create({
    bottomBtn:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        bottom:0,position:'absolute',
        marginBottom:50
    },
    btn:{
        height:40,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        backgroundColor:colors.blue,
        borderRadius:3
    },
    text:{
        fontFamily:fonts.Sofia_Pro_Light_Az,
        color:'white'
    },
    shimmer:{
        backgroundColor:'silver',
        height:20,
        marginHorizontal:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        alignItems:'center'
        ,backgroundColor:colors.blue,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'rgba(100,100,100, 0.5)',
      padding: 5,
    },
    modalView1: {
      margin: 2,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom:50
    },
})
 