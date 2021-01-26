import React, { Component } from 'react'
import { Text, View,ScrollView ,WebView ,Dimensions,StyleSheet} from 'react-native'
import Toolbar from '../../../components/toolbar' ;
import { Container, Header, Content, Accordion,Icon } from "native-base";
import fonts from '../../../constants/fonts';
import { API } from '../../../api/endPoints';
import AsyncStorage from '@react-native-community/async-storage';
import HTML from "react-native-render-html";
import Shimmer from 'react-native-shimmer';

const dataArray = [
    { title: "What is Career Counselling?", description: "There is a lot of confusion among Pakistani students and parents about the concept of career counselling. The mushrooming of university admission consultants, who call themselves career counsellors, has not helped the cause.In simple words career counselling helps you make important career choices. Career is not something that starts after your graduation, rather the process starts as soon as you choose your Matric or O Level subjects.There are a number of factors that influence your career development, including your interests, abilities, values, personality, background, and circumstances. Unfortunately, in Pakistan students choose their 10-12 grade subjects and then an undergraduate degree without any consideration to their aptitude. An aptitude is a person’s natural ability to excel in a certain field. Career counselling services help you identity this aptitude and suggest suitable career fields accordingly. Merafuture.pk’s AI based career counselling tests help you understand yourself better so you can take an informed decision about your undergraduate degree and career. " },
    { "title": "WHY SHOULDN’T I GO TO CAREER COUNSELLOR IN MY SCHOOL/COLLEGE?", description: "Majority of Pakistani Institutes (schools and colleges) do not have career counselling services. Few institutes have counsellors who help and guide students in getting admissions in local and foreign Universities, without any consideration to their aptitude. There are very few schools and colleges, which have well qualified career counsellors to help students make an informed decision about choosing their undergraduate degrees. If you are lucky to be studying in one of these institutes, then we strongly suggest you to visit them and understand yourself better. We also suggest that you take the report of our test to your counsellor for guidance. Our test compares and matches you with Students and Universities from around Pakistan through an AI model. We are confident to claim that no other company or counsellor in Pakistan have this sort of dataset. " },
    { "title": "SO WHAT EXACTLY ARE YOUR CAREER COUNSELLING SERVICES", description: "Our career counselling services revolve around an online comprehensive test, which matches you with various career fields. Our test has been developed after exhaustive testing throughout Pakistan. At the end of the test, you get a detailed Career Assessment Report (CAR), which thoroughly guides you on choosing a suitable undergraduate field and degree.We also offer in person sessions with highly qualified and experienced counsellors" }
   , {
      "title": "WHAT IS CAREER COUNSELLING?",
      "descriptition": "<h2 style=\"text-align:justify\"></h2><h2 style=\"\"></h2><h2 style=\"text-align: justify;\"><span lang=\"EN-US\" style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif; color: rgb(156, 156, 148);\"><span style=\"font-family: Arial;\">There is a lot of\r\nconfusion among Pakistani students and parents about the concept of career\r\ncounselling. The mushrooming of university admission consultants, who call\r\nthemselves career counsellors, has not helped the cause.</span><br><span style=\"font-family: Arial;\"> </span><o:p></o:p></span></h2><h2><span style=\"color: rgb(156, 156, 148);\"><b><span lang=\"EN-US\" style=\"font-size: 12pt; line-height: 107%; font-family: Arial;\" poppins\",serif;=\"\" mso-fareast-font-family:\"times=\"\" new=\"\" roman\";mso-bidi-font-family:calibri;=\"\" mso-bidi-theme-font:minor-latin\"=\"\">In simple words </span></b><b><span style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif;\"><span style=\"font-family: Arial;\">career counselling helps\r\nyou make important career choices. Career is not something that starts after\r\nyour graduation, rather the process starts as soon as you choose your Matric or\r\nO Level subjects.</span></span></b></span></h2><h2><span style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif; color: rgb(156, 156, 148);\"><span style=\"font-family: Arial;\">There are a number of\r\nfactors that influence your career development, including your </span><b style=\"\"><span style=\"font-family: Arial;\">interests, abilities, values, personality,\r\nbackground</span></b><span style=\"font-family: Arial;\">, and </span><b style=\"\"><span style=\"font-family: Arial;\">circumstances</span></b><span style=\"font-family: Arial;\">.\r\nUnfortunately, in Pakistan students choose their 10-12 grade subjects and then\r\nan undergraduate degree without any consideration to their aptitude. An\r\naptitude is a person’s </span><b style=\"\"><span style=\"font-family: Arial;\">natural ability\r\nto excel in a certain field</span></b><span style=\"font-family: Arial;\">. Career counselling services help you identity\r\nthis aptitude and suggest suitable career fields accordingly. Merafuture.pk’s\r\nAI based career counselling tests help you understand yourself better so you\r\ncan take an informed decision about your undergraduate degree and career. </span></span></h2>\r\n\r\n\r\n\r\n<p style=\"text-align:justify\">\r\n\r\n\r\n\r\n</p><p><span style=\"font-family: Poppins;\">\r\n\r\n\r\n\r\n</span></p>"
  },
  ];

  const htmlContent = `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
  <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const html = "<h2 style=\"text-align:justify\"></h2><h2 style=\"\"></h2><h2 style=\"text-align: justify;\"><span lang=\"EN-US\" style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif; color: rgb(156, 156, 148);\"><span style=\"font-family: Arial;\">There is a lot of\r\nconfusion among Pakistani students and parents about the concept of career\r\ncounselling. The mushrooming of university admission consultants, who call\r\nthemselves career counsellors, has not helped the cause.</span><br><span style=\"font-family: Arial;\"> </span><o:p></o:p></span></h2><h2><span style=\"color: rgb(156, 156, 148);\"><b><span lang=\"EN-US\" style=\"font-size: 12pt; line-height: 107%; font-family: Arial;\" poppins\",serif;=\"\" mso-fareast-font-family:\"times=\"\" new=\"\" roman\";mso-bidi-font-family:calibri;=\"\" mso-bidi-theme-font:minor-latin\"=\"\">In simple words </span></b><b><span style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif;\"><span style=\"font-family: Arial;\">career counselling helps\r\nyou make important career choices. Career is not something that starts after\r\nyour graduation, rather the process starts as soon as you choose your Matric or\r\nO Level subjects.</span></span></b></span></h2><h2><span style=\"font-size: 12pt; line-height: 107%; font-family: Poppins, serif; color: rgb(156, 156, 148);\"><span style=\"font-family: Arial;\">There are a number of\r\nfactors that influence your career development, including your </span><b style=\"\"><span style=\"font-family: Arial;\">interests, abilities, values, personality,\r\nbackground</span></b><span style=\"font-family: Arial;\">, and </span><b style=\"\"><span style=\"font-family: Arial;\">circumstances</span></b><span style=\"font-family: Arial;\">.\r\nUnfortunately, in Pakistan students choose their 10-12 grade subjects and then\r\nan undergraduate degree without any consideration to their aptitude. An\r\naptitude is a person’s </span><b style=\"\"><span style=\"font-family: Arial;\">natural ability\r\nto excel in a certain field</span></b><span style=\"font-family: Arial;\">. Career counselling services help you identity\r\nthis aptitude and suggest suitable career fields accordingly. Merafuture.pk’s\r\nAI based career counselling tests help you understand yourself better so you\r\ncan take an informed decision about your undergraduate degree and career. </span></span></h2>\r\n\r\n\r\n\r\n<p style=\"text-align:justify\">\r\n\r\n\r\n\r\n</p><p><span style=\"font-family: Poppins;\">\r\n\r\n\r\n\r\n</span></p>"


export class faqs extends Component {

  state={
    dataArray:[],
    token:'',
    loading:true
  }

 
  async componentDidMount(){

    const token = await AsyncStorage.getItem("token")
    const customer_id = await AsyncStorage.getItem("customer_id")
    this.setState({token})
    this.getFaqs()

   // console.log("customer_id" ,  JSON.stringify(AsyncStorage.getItem("customer_id")))
}
   

  getFaqs = async () => {
    var obj = {  
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}` ,
       
      },
    }

    try {
      let response = await fetch(
       API.faqs, obj
      );
      let json = await response.json();
     // alert(json);
      this.setState({
        dataArray:json.data,
        loading:false
      })
       console.log("success",json.data);
    } catch (error) {
      this.setState({loading:false})
      alert("Something went wrong!")
      console.error("error",error);
    }
  };

  _renderContent(item) {
    return (
      <ScrollView style={{ flex: 1 ,marginHorizontal:10 }}>
          <HTML html={item.descriptition} imagesMaxWidth={Dimensions.get('window').width} />
      </ScrollView>

     
    );
  }
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,}}>
      <Text style={{ fontWeight: "600",  fontSize:16,flex:10,fontFamily:fonts.Sofia_Pro_RegularAz }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18,flex:1 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18,flex:1 }} name="add-circle" />}
      </View>
    );
  }

    render() {
        return (
            <Container>
            <Toolbar navigation={this.props.navigation} header="FAQs" />
            {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
                 
                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }

                 {this.state.loading && 
                 <Shimmer style={{width:'90%',height:30,marginVertical:20,marginHorizontal:10,alignSelf:'center'}} intensity={0.5} >
                    <View style={styles.shimmer}/>
                 </Shimmer> }
            <Content padder>
              <Accordion
            
              headerStyle={{fontFamily:fonts.Sofia_Pro_RegularAz,fontSize:10}}
              contentStyle={{fontFamily:fonts.Sofia_Pro_Light_Az}}
              dataArray={this.state.dataArray}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              icon="add" expandedIcon="remove" />
            </Content>
          </Container>
        )
    }
}

export default faqs ;

const styles = StyleSheet.create({
   
  shimmer:{
    backgroundColor:'silver',
    height:20,
    marginHorizontal:20,
},
});

