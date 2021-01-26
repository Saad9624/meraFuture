import React, { Component } from 'react'
import { Text, View,StyleSheet,Image ,TouchableOpacity,BackHandler} from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab,TabHeading,Icon } from 'native-base';
import Header1 from '../../../components/toolbar' ;
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import MyTEST from './mytest' ;
import Result from './results';
import Instructions from './instructions' ;
import AppStyles from '../../../appstyles';
import { back } from '../../../constants/images';
import { CommonActions } from '@react-navigation/native';
import TextView from '../../../components/textView';


export class index extends Component {

    constructor(props){
    super(props)
    this.handleBackButton = this.handleBackButton.bind(this);
}

    async componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  
   
  }

handleBackButton = () => {
  // this.props.navigation.goBack()
    //alert("no")
    // this.props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 1,
    //       routes: [
    //         { name: 'Home' },
    
    //       ],
    //     })
    //   )
   }


    render() {
        return (
            <Container>
                {/* <Header1 navigation={this.props.navigation} header="MY TESTS"/> */}
                <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                        <TouchableOpacity 
                          onPress={()=> this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                { name: 'Home' },
                        
                              ],
                            })
                          )}
                        >
                                    
                                <Image style={AppStyles.smallMediumImage}
                                source={back}/>

                        </TouchableOpacity>
                    
                    </View>
                        <TextView 
                        fontSize={18}
                        fontFamily={fonts.Sofia_Pro_Light_Az}
                        text={"MY TESTS"}
                        />

                            <TextView 
                        fontSize={18}
                        fontFamily={fonts.Sofia_Pro_Light_Az}
                        text={""}
                        />

                </View>

        <Header  style={{height:0,backgroundColor:colors.darkBlue}}/>
          <Tabs 
          tabContainerStyle={{color:colors.blue}}
          style={{backgroundColor:colors.blue}}
          tabBarUnderlineStyle={{backgroundColor:colors.blue,marginHorizontal:5}}
          renderTabBar={()=> <ScrollableTab  />}>
               

             
                <Tab 
                textStyle={styles.deactiveTextStyle}
                 activeTextStyle={styles.activeTextStyle}
                heading="My Tests">
                    <MyTEST navigation={this.props.navigation}/>
                </Tab>
                <Tab
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                heading="Instructions">
                    <Instructions/>
                </Tab>

                <Tab
                textStyle={styles.deactiveTextStyle}
                activeTextStyle={styles.activeTextStyle}
                heading="Results">
                    <Result navigation={this.props.navigation}/>
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
row:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:60,
    alignItems:'center'
    ,backgroundColor:colors.blue,
},
})
