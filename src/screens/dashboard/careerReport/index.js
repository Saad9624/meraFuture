import React, { Component } from 'react'
import { Text, View,StyleSheet,Image } from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab,TabHeading,Icon } from 'native-base';
import Header1 from '../../../components/toolbar' ;
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import {
    home, dimension, dim2, dim3, dim4, how
} from '../../../constants/images' ;
import { color } from 'react-native-reanimated';
import Home from './home' ;
import How from './howitworks';
import Dim1 from './dim1' ;
import Dim2 from './dim2' ;
import Dim3 from './dim3' ;
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../api/endPoints';
import SuitableCareer from './suitableCareer' ;


export class index extends Component {

    state ={
        token:'',
        customer_id:'',
        home:'',
        howWorks:'',
        peronally:'',
        interests:'',
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
                  home : json.data.degree_main_text,
                  howWorks:json.data.suitable_fields_one,
                  peronally:json.data.suitable_fields_two,

              })
          }
         // console.log(json)
         

         
           //console.log("success",json);
        } catch (error) {
          console.error("error",error);
        }
      };
    
    render() {
        return (
            <Container>
                <Header1 download navigation={this.props.navigation} header="CAREER REPORT"/>
        <Header  style={{height:10,backgroundColor:colors.darkBlue}}/>
          <Tabs 
          style={{height:10}}
            tabsContainerStyle={{height:0,marginBottom:20,padding:5}}
          tabBarUnderlineStyle={{backgroundColor:colors.blue,marginHorizontal:5}}
          renderTabBar={()=> <ScrollableTab  />}>
                <Tab

                tabsContainerStyle={{ height: 20,padding:5 }}
                style={{height:0,padding:5}}
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue,padding:10,height:10}}
                heading={ 
                <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                         source={home} />
                         <Text style={styles.text}>Home</Text>
                </TabHeading>}>
                    <Home homeData={this.state.home}/>
                </Tab>

                <Tab 
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue}}
                heading={ 
                    <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                             source={how} />
                             <Text style={styles.text}>HOW IT WORKS</Text>
                    </TabHeading>}>
                  <How HowData={this.state.howWorks} />
                </Tab>

                <Tab 
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue}}
                heading={ 
                    <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                             source={dimension} />
                             <Text style={styles.text}>Dimensions 1</Text>
                             <Text style={[styles.text,{marginTop:-2}]}>Personality</Text>

                    </TabHeading>}>
                 <Dim1/>
                </Tab>
                <Tab
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue}} 
                heading={ 
                    <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                             source={dim2} />
                             <Text style={styles.text}>Dimensions 2</Text>
                             <Text style={[styles.text,{marginTop:-2}]}>interest</Text>

                    </TabHeading>}>
                    <Dim2/>
                </Tab>

                <Tab
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue}} 
                heading={ 
                    <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                             source={dim3} />
                             <Text style={styles.text}>Dimensions 3</Text>
                             <Text style={[styles.text,{marginTop:-2}]}>subjects</Text>

                    </TabHeading>}>
                    <Dim3/>
                </Tab>
       
                <Tab 
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                activeTabStyle={{backgroundColor:colors.darkBlue}}
                tabStyle={{backgroundColor:colors.darkBlue}}
                heading={ 
                    <TabHeading style={{flexDirection:'column',backgroundColor:colors.darkBlue}}>
                        <Image style={{width:15,height:15,resizeMode:'contain',tintColor:'white'}}
                             source={dim4} />
                              <Text style={styles.text}>suitable</Text>
                             <Text style={[styles.text,{marginTop:-2}]}>career fields</Text>

                    </TabHeading>}>
                   <SuitableCareer navigation={this.props.navigation}/>
                </Tab>
        </Tabs>
      </Container>
        )
    }
}

export default index ;

const styles = StyleSheet.create({
    activeTabStyle:{
            backgroundColor:colors.darkBlue,
            borderBottomColor:colors.darkBlue,
            borderBottomWidth:2

    },
    deactiveTabStyle:{
        backgroundColor:colors.darkBlue,

},
activeTextStyle:{
    color:'white',
    fontFamily:fonts.Sofia_Pro_Light_Az,
    height:100
},
deactiveTextStyle:{
    fontFamily:fonts.Sofia_Pro_Light_Az
},
text:{
    color:'white',
    fontFamily:fonts.Sofia_Pro_Light_Az,
    fontSize:10,
    marginTop:5,
    textTransform: 'uppercase'
},
})
