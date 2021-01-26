import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet,Image ,FlatList} from 'react-native'

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
import Like from '../../../assets/images/like.png'
import UnLike from '../../../assets/images/unlike.png'
var value = 0 ;
var questionValue = 1;
var answerArray = [] ;

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
        loading:false ,
        duration:0,
        header:'',
        token:'' ,
        allAnswers:[],
        allQuestionsId:[],
        testID:'',
        customer_id:'',
        allQuestions:[
          {
            "question": "If you want the beam to balance",
            "question_id": "30",
            "option_1": "B must be heavier than A\t",
            "option_2": "B must be lighter than A\t",
            "option_3": "B must have an equal weight to A\t",
            "option_4": "It does not work like that\t",
            "option_5": "It does not work like that\t"
          },
          {
            "question": "The nut is very tight. The easiest scenario to loosen the nut would be to:",
            "question_id": "31",
            "option_1": "Use a short spanner and hold it at A\t",
            "option_2": "Use a short spanner and hold it at B\t",
            "option_3": "Use a spanner which grips the nut tightly\t",
            "option_4": "Use a long spanner but hold it at B\t",
            "option_5": "Use a long spanner but hold it at B\t"
        },
        ],
        newSingleArray:[],
    }


   async componentDidMount(){
        const token = await AsyncStorage.getItem("token")
    const customer_id = await AsyncStorage.getItem("customer_id")
    this.setState({token , customer_id})

       if(this.props.route.params){
        // alert("yes")
           var duration =  this.props.route.params.duration
          var header = this.props.route.params.header
          var testID = this.props.route.params.testID
           var converted = duration * 60 

           console.log("converted",converted)
           this.setState({
               duration :converted,
               header,
               testID
           })

       }
       setTimeout(() => {
        this.setState({duration:converted, header})
      }, 1000)
     // this.getAllTests()

      this.forceUpdate()

      this.state.newSingleArray[0] = this.state.allQuestions[0] ;
    }

    setSingleQuestion = ()=>{
      const data = this.state.allQuestions ;

      value = value + 1 ;
      this.state.newSingleArray[0] = data[value] ;
      console.log(value);
      console.log(this.state.newSingleArray);
      this.forceUpdate()
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
         `https://merafuture.pk/api/home/getquestions?language=en&customer_id=${this.state.customer_id}&category_id=1`, obj
          );
          let json = await response.json();
         // alert(json.data.length);
            
          this.setState({
            allQuestions:json.data,
            loading:false ,
            questions : json.data[0].question ,
            totalQuestions:json.data.length ,
            option1:json.data[0].option_1,
            option2:json.data[0].option_2 ,
            option3:json.data[0].option_3,
            option4:json.data[0].option_4,
            loading:false
          })

          // this.setState({
          //   newSingleQuestion: this.state.allQuestions[0]
          // })
         // this.state.newSingleQuestion.push(this.state.allQuestions[0])
          //console.log(this.state.allQuestions[0])
          // console.log("success->>>>>>>>>>>>>>>>>>>>>>>>>>>>>",json.data[0]);
        } catch (error) {
          console.error("error",error);
        }
      };

      increaseIndex=()=>{
        value = value + 1
        this.state.newSingleQuestion[0]  = this.state.allQuestions[value]
        console.log("value" , value)
       // this.state.newSingleQuestion.push(this.state.allQuestions[value])
        this.forceUpdate()
        
      }
      decreaseIndex=()=>{
        value = value + 1
        this.state.newSingleQuestion[0]  = this.state.allQuestions[value]
        console.log("value" , value)
       // this.state.newSingleQuestion.push(this.state.allQuestions[value])
        this.forceUpdate()
        
      }
    setValue =()=>{
        const data = this.state.allQuestions ;
        console.log("length" , data.length)
        if(data.length-1 > value){
                value = value + 1 
                questionValue = questionValue + 1 ;
             this.setState({
                 questionNumber:questionValue,
                 questions:data[value].question ,
                 option1:data[value].option_1,
                 option2:data[value].option_2,
                 option3:data[value].option_3,
                 option4:data[value].option_4,
                 check1:false,
                 check2:false,
                 check3:false,
                 check4:false
             })
            
            console.log("new value" , value  )
        }
        
    }

    setnegValue =()=>{
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

                check1:false,
                check2:false,
                check3:false,
                check4:false

            })
            console.log("new value after" , value  )
        }
        
    }

    onRadioSelect = (one,two,three,four)=>{
        this.setState({
            check1:one,
            check2:two,
            check3:three,
            check4:four
        })
    }
    changeLikeIcon1=(index,value,questionId) =>{
        console.log("index" , index)
        console.log("value" , value)
        let { allQuestions } = this.state;
        let targetPost = allQuestions[index];
    
        targetPost.like1 = !targetPost.like1;
        targetPost.like2 = false ;
        targetPost.like3 = false ;
        targetPost.like4 = false ;
        targetPost.like5 = false ;
        this.setState({ allQuestions });
        this.state.allAnswers[index] = value ;
        this.state.allQuestionsId[index] = questionId ;
       console.log("AllAnswers" , this.state.allAnswers);
       console.log("allQuestions" , this.state.allQuestionsId);
    }
    changeLikeIcon2=(index,value,questionId) =>{
        console.log("index" , index)
        console.log("value" , value)
        let { allQuestions } = this.state; // all questions   
        let targetPost = allQuestions[index];  // index value of selected question  let say we clicked on number 1 question so index will be "0"
    
        targetPost.like2 = !targetPost.like2;  
        targetPost.like1 = false ;
        targetPost.like3 = false ;
        targetPost.like4 = false ;
        targetPost.like5 = false ;
        this.setState({ allQuestions });
        this.state.allAnswers[index] = value ;
        this.state.allQuestionsId[index] = questionId ;
        console.log("AllAnswers" , this.state.allAnswers);
        console.log("allQuestions" , this.state.allQuestionsId);
    }
    changeLikeIcon3=(index,value,questionId) =>{
        console.log("index" , index)
        console.log("value" , value)
        let { allQuestions } = this.state;
        let targetPost = allQuestions[index];
    
        targetPost.like3 = !targetPost.like3;
        targetPost.like2 = false ;
        targetPost.like1 = false ;
        targetPost.like4 = false ;
        targetPost.like5 = false ;
        this.setState({ allQuestions });
        this.state.allAnswers[index] = value ;
        this.state.allQuestionsId[index] = questionId ;
        console.log("AllAnswers" , this.state.allAnswers);
        console.log("allQuestions" , this.state.allQuestionsId);
    }
    changeLikeIcon4=(index,value,questionId) =>{
        console.log("index" , index)
        console.log("value" , value)
        let { allQuestions } = this.state;
        let targetPost = allQuestions[index];
    
        targetPost.like4 = !targetPost.like4;
        targetPost.like2 = false ;
        targetPost.like3 = false ;
        targetPost.like1 = false ;
        targetPost.like5 = false ;
        this.setState({ allQuestions });
        this.state.allAnswers[index] = value ;
        this.state.allQuestionsId[index] = questionId ;
        console.log("AllAnswers" , this.state.allAnswers);
        console.log("allQuestions" , this.state.allQuestionsId);
    }
    changeLikeIcon5=(index,value,questionId) =>{
        console.log("index" , index)
        console.log("value" , value)
        let { allQuestions } = this.state;
        let targetPost = allQuestions[index];
    
        targetPost.like5 = !targetPost.like5;
        targetPost.like2 = false ;
        targetPost.like3 = false ;
        targetPost.like4 = false ;
        targetPost.like1 = false ;
        this.setState({ allQuestions });
        this.state.allAnswers.splice(index, 0, value)
        this.state.allQuestionsId[index] = questionId ;
        console.log("AllAnswers" , this.state.allAnswers);
        console.log("allQuestions" , this.state.allQuestionsId);
    }

    attemptTest=()=>{
 
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
        console.log("if",res)
        console.log("if",res)

        if(res.data){
          
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
            this.setState({
                loading:false
                
            })
           // alert(res.errorMessage)
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

        
    _renderItem=({item,index})=>{
        return(
            <View>
                <TextView
                    fontSize={18}
                    color="black"
                    text={item.question}
                    />

                <TouchableOpacity 
             onPress ={()=>this.changeLikeIcon1(index,item.option_1,item.question_id)}

              //  onPress={()=> this.onRadioSelect(true,false,false,false,index)}
                style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:10}}>
                           {/* <Radio
                                onPress={()=> this.onRadioSelect(true,false,false,false,index)}
                                style={{marginTop:4}}
                                color={"black"}
                                selectedColor={"black"}
                                selected={true}   /> */}
                                       <Image style={{width:20,height:20}} source={item.like1 ? Like : UnLike}/>
                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_1}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
                 onPress ={()=>this.changeLikeIcon2(index,item.option_2,item.question_id)}
                style={styles.radiod}>
                    <Image style={{width:20,height:20}} source={item.like2 ? Like : UnLike}/>
                          
                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_2}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
                     onPress ={()=>this.changeLikeIcon3(index,item.option_3,item.question_id)}
                style={styles.radiod}>
                     <Image style={{width:20,height:20}} source={item.like3 ? Like : UnLike}/>
                           
                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_3}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
               onPress ={()=>this.changeLikeIcon4(index,item.option_4,item.question_id)}
             
                style={styles.radiod}>
                           
                                 <Image style={{width:20,height:20}} source={item.like4 ? Like : UnLike}/>

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_4}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
              onPress ={()=>this.changeLikeIcon5(index,item.option_5,item.question_id)}

                style={styles.radiod}>
                    
                                 <Image style={{width:20,height:20}} source={item.like5 ? Like : UnLike}/>

                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_5}
                            />
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    
            </View>

        )
    }
     
    render() {
console.log("length" , "renderCalled")
      return (
            <View style={{flex:1}}>
                        <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                        <TouchableOpacity 
                          onPress={()=> this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                { name: 'MyTest' },  ],
                                 })  )}>
                                    
                                <Image style={AppStyles.smallMediumImage}
                                source={back}/>

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
             showSeparator
             digitStyle={{backgroundColor: '#FFF', borderColor: '#1CC625'}}

             separatorStyle={{color: 'grey',}}
             timeToShow={['M', 'S']}
                until={this.state.duration}
                //onFinish={() => alert('finished')}
                // onPress={() => alert('hello')}
                size={20}
                /> :
            <Text>Loading...</Text> }   

            <View style={[AppStyles.line,{backgroundColor:'orange',alignSelf:'center'}]}/>


           
                 <FlatList
                style={[styles.flatListStyle,{marginBottom:60}]}
                showsVerticalScrollIndicator={false}
                data={this.state.newSingleArray}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                /> 

                 <View style={{bottom:0,position:'absolute',marginBottom:10,alignSelf:'center'}}>
                                            <TouchableOpacity  
                                          onPress={()=> this.setSingleQuestion()}
                                          // onPress={()=> this.increaseIndex()}
                                                style={styles.btn}>
                                                <Text style={styles.text}>Submit</Text>
                                            </TouchableOpacity>

                </View>
           
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
    radiod:{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:-10},
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
})
 