import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet,Image ,FlatList,Modal, Alert,Dimensions,ScrollView,BackHandler} from 'react-native'

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
import HTML from 'react-native-render-html';

var value = 0 ;
var questionValue = 1;
var answerArray = [] ;
import ImageZoom from 'react-native-image-pan-zoom';

export class Instructions extends Component {

  constructor(props) {
    super(props);
    this.flatListRef = null;
  }
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
        allAnswers:[],
        allQuestionsId:[],
        testID:'',
        customer_id:'',
        progress: 0,
        allQuestionProgress:40,
        countDown:false,
        detailsModalVisibility:true,
        description:'',
        setRemainingTime:0,
        currentItem:0 ,
        changeButton:'Next' ,
        option1Image:'',
        option2Image:'',
        option3Image:'',
        option4Image:'',
        question_image:'',
        paragraph:'',


    }


    updateProgress=()=>{
      this.setState({
        progress : this.state.progress + 1
      })
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



    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    
      value =  0 ;
      questionValue = 1 ;
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
         console.log(json);
            
          this.setState({
            allQuestions:json.data,
            loading:false ,
            questions : json.data[0].question ,
            totalQuestions:json.data.length ,
            loading:false,
          })
          // console.log("success->>>>>>>>>>>>>>>>>>>>>>>>>>>>>",json.data[0]);
        } catch (error) {
          console.error("error",error);
        }
      };

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

       if(this.state.allAnswers.length === this.state.allQuestions.length){
         this.setState({
           changeButton:'Submit'
         })
       }
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

    attemptTest= ()=>{
      if(this.state.allQuestions.length === this.state.allQuestionsId.length && !this.state.allQuestionsId.includes(undefined)){
       this.checkifAllAnswererd()
      // alert("not includes")
      }
      else{
       
        this.showAlert('Please Answer all questions to proceed.')
       // alert("Please Answer all questions to proceed")
      }
    }

    
    checkifAllAnswererd=()=>{

        console.log('allQuestionsLength', this.state.allQuestions.length)
        console.log('allanswered' ,this.state.allQuestionsId.length)
 
        this.setState({loading:true,countDown:false})
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
          this.showAlert(res.data)
          
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

saveForLater=()=>{

  this.setState({loading:true,countDown:false})
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

onChange =(value)=>{
  //console.log("value--->>>" , value/ 60)   
  this.setState({
    setRemainingTime : value 
  })
 }


componentWillUnmount(){
  value =  0 ;
  questionValue = 1 ;
}

        
    _renderItem=({item,index})=>{
        return(
            <View style={{width:Dimensions.get('window').width }}>
              <ScrollView>

                   <TextView
                    fontSize={18}
                    color="black"
                    text={item.question}
                    />

              {item.verbal_reason_text !== null || item.verbal_reason_text !== "" ?  
              <View style={{marginHorizontal:10}}>
                <HTML html={item.verbal_reason_text} imagesMaxWidth={Dimensions.get('window').width} /> 
              </View>

          : <View/>}

               {item.question_image !== '' ? 
               
                <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={150}
                imageWidth={250}
                imageHeight={180}>
                    <Image style={[AppStyles.largeImage4,{alignSelf:'center'}]}
                          source={{uri:item.question_image}}/>
                </ImageZoom>
              : null }
              
        
                <TouchableOpacity 
             onPress ={()=>this.changeLikeIcon1(index,item.option_1,item.question_id)}
             style={styles.radiod}>
                           
                                       <Image style={{width:20,height:20}} source={item.like1 ? Like : UnLike}/>

                      {item.option_1image != '' && item.option_1image != null 
                     ?
                       <Image
                        style={AppStyles.largeImage2}
                        source={{uri:item.option_1image}}/>
                         :
                         <TextView
                         color="black"
                         fontSize={18}
                         fontFamily={fonts.Sofia_Pro_Light_Az}
                         text={item.option_1}
                         />
                      } 

                          
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress ={()=>this.changeLikeIcon2(index,item.option_2,item.question_id)}
                    style={styles.radiod}>
                    <Image style={{width:20,height:20}} source={item.like2 ? Like : UnLike}/>
                                
                    {item.option_2image != '' && item.option_2image != null 
                     ?
                       <Image
                        style={AppStyles.largeImage2}
                        source={{uri:item.option_2image}}/>
                         :
                         <TextView
                         color="black"
                         fontSize={18}
                         fontFamily={fonts.Sofia_Pro_Light_Az}
                         text={item.option_2}
                         />
                      }  

                            
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    <TouchableOpacity 
                     onPress ={()=>this.changeLikeIcon3(index,item.option_3,item.question_id)}
                style={styles.radiod}>
                     <Image style={{width:20,height:20}} source={item.like3 ? Like : UnLike}/>

                     {item.option_3image != '' && item.option_3image != null 
                     ?
                       <Image
                        style={AppStyles.largeImage2}
                        source={{uri:item.option_3image}}/>
                         :
                         <TextView
                         color="black"
                         fontSize={18}
                         fontFamily={fonts.Sofia_Pro_Light_Az}
                         text={item.option_3}
                         />
                      } 
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>

                    {item.option_4 !== ''   ?
                    <TouchableOpacity 
                      onPress ={()=>this.changeLikeIcon4(index,item.option_4,item.question_id)}
                      style={styles.radiod}>
                       <Image style={{width:20,height:20}} source={item.like4 ? Like : UnLike}/>
                       {item.option_4image != '' && item.option_4image != null 
                     ?
                       <Image
                        style={AppStyles.largeImage2}
                        source={{uri:item.option_4image}}/>
                         :
                         <TextView
                         color="black"
                         fontSize={18}
                         fontFamily={fonts.Sofia_Pro_Light_Az}
                         text={item.option_4}
                         />
                      } 

                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>
                    :
                    null}

              {item.option_5 !== ''   ?
                  <TouchableOpacity 
                      onPress ={()=>this.changeLikeIcon5(index,item.option_5,item.question_id)}
                      style={styles.radiod}>
                         <Image style={{width:20,height:20}} source={item.like5 ? Like : UnLike}/>

                         {item.option_4image != '' && item.option_4image != null 
                         ?
                          <Image
                            style={AppStyles.largeImage2}
                            source={{uri:item.option_4image}}/>
                            :
                            <TextView
                            color="black"
                            fontSize={18}
                            fontFamily={fonts.Sofia_Pro_Light_Az}
                            text={item.option_5}
                            /> } 

                           
                               {this.state.loading && 
                                <Shimmer style={{width:150}} intensity={0.5} >
                                       <View style={styles.shimmer}/>
                                </Shimmer> }
                    </TouchableOpacity>
                     : 
                  <View>
                  </View>  
                  }

                </ScrollView>     
            </View>

        )
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
                                  // onPress={()=> this.setState({detailsModalVisibility:false,countDown:true})}
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
                              onPress={()=> this.setState({detailsModalVisibility:false,countDown:true})}
        
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

    // getItemLayout(data, index) {
    //   return { length: styles.listItem.height, offset: styles.listItem.height * index, index };
    // }
    onViewableItemsChanged = ({ viewableItems, changed }) => {
      console.log("Visible items are", viewableItems[0].index);
      this.setState({
        currentItem:viewableItems[0].index
      })
    }


    render() {
      const {currentItem,allQuestions} = this.state ; 
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
             running={this.state.countDown}
             showSeparator
             digitStyle={{backgroundColor: '#FFF', borderColor: '#1CC625'}}
              onChange={this.onChange}
             separatorStyle={{color: 'grey',}}
             timeToShow={['M', 'S']}
              until={this.state.duration}
              onFinish={() => this.attemptTest()}
              // onPress={() => alert('hello')}
              size={20}
              /> 
              :
            <Text>Loading...</Text> }   

            <View style={[AppStyles.line,{backgroundColor:'orange',alignSelf:'center'}]}/>

            {/* {!this.state.loading &&  
              <TextView
                fontSize={15}
                color="black"
                text={`Question ${this.state.questionNumber} of ${this.state.totalQuestions}`}
                /> } */}


            <View style={{width:this.state.allQuestions.length * 25 ,alignSelf:'center',borderColor:'black',borderWidth:1,height:15}}>
                <View style={{width:this.state.allAnswers.length * 25 ,backgroundColor:colors.blue,height:13}}></View>
            </View>

           
   {/* {!this.state.loading &&   <TextView
      fontSize={15}
      color="black"
      text={`Question ${this.state.questionNumber} of ${this.state.totalQuestions}`}
      /> } */}
      {this.state.loading && 
                 <Shimmer style={{width:200,height:10,marginVertical:20,marginHorizontal:10}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

      {/* {!this.state.loading &&  <TextView
            fontSize={15}
            color="black"
            text={this.state.questions}
            />} */}
          {this.state.loading && 
                 <Shimmer style={{marginHorizontal:10}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

             {!this.state.loading &&
                 <FlatList
                 onViewableItemsChanged={this.onViewableItemsChanged }

                // getItemLayout={this.getItemLayout.bind(this)}
                 ref={(ref) => this.flatListRef = ref}
                 scrollEnabled={false}
                 horizontal
                style={[styles.flatListStyle,{marginBottom:60}]}
                showsVerticalScrollIndicator={false}
                data={this.state.allQuestions}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                /> }

                 <View style={{bottom:0,position:'absolute',marginBottom:10,alignSelf:'center',flexDirection:'row'}}>
                                            <TouchableOpacity  
                                            
                                      //    onPress={()=> this.updateProgress()}
                                      onPress={()=> currentItem !== 0 ?
                                          this.flatListRef.scrollToIndex({ index: this.state.currentItem - 1 })
                                        : 
                                         null} 
                                            //  onPress={()=> this.props.navigation.navigate('CareerReport')}
                                                style={styles.btn}>
                                                <Text style={styles.text}>Previous</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity  
                                      //    onPress={()=> this.updateProgress()}
                                      onPress={()=>
                                        currentItem === allQuestions.length -1 ? 
                                        this.attemptTest()
                                        :
                                       this.flatListRef.scrollToIndex({ index: currentItem + 1 })
                                        } 
                                            //  onPress={()=> this.props.navigation.navigate('CareerReport')}
                                                style={styles.btn}>
                                                <Text style={styles.text}>{currentItem === allQuestions.length -1 ? 'Submit' : 'Next' }</Text>
                                            </TouchableOpacity>


                                            <TouchableOpacity  
                                         // onPress={()=> this.flatListRef.scrollToIndex({ index: this.state.currentItem + 1 })}    
                                         //onPress={()=> this.updateProgress()}
                                            onPress={()=> this.saveForLater()}
                                            //  onPress={()=> this.props.navigation.navigate('CareerReport')}
                                                style={styles.btn}>
                                                <Text style={styles.text}>Save for Later</Text>
                                            </TouchableOpacity>

                </View>
                         
                {/* <TouchableOpacity 
                onPress={()=> this.onRadioSelect(true,false,false,false)}
                style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:10}}>
                           <Radio
                               onPress={()=> this.onRadioSelect(true,false,false,false)}
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
                    onPress={()=> this.onRadioSelect(false,true,false,false)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,width:'100%'}}>
                           <Radio
                              
                              onPress={()=> this.onRadioSelect(false,true,false,false)}
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
                     onPress={()=> this.onRadioSelect(false,false,true,false)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
                           <Radio
                             onPress={()=> this.onRadioSelect(false,false,true,false)}
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
                    <TouchableOpacity
                    onPress={()=> this.onRadioSelect(false,false,false,true)}
                    style={{flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
                           <Radio
                             onPress={()=> this.onRadioSelect(false,false,false,true)}
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
                    </TouchableOpacity>
                           */}
                             
                           
                     
                        {/* <View style={styles.bottomBtn}>
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
                                                <Text style={styles.text}>Next</Text>
                                            </TouchableOpacity>
                        </View> */}
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
 