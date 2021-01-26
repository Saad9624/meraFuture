import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
     
} from 'react-native';
import TextView from '../../../components/textView' ;

import {
  back, home
    
} from '../../../constants/images';
import Side from '../../../assets/images/side.png';
import password from '../../../assets/images/password.png';
import Multi from '../../../assets/images/multi.png'
import Layer16 from '../../../assets/images/Layer16.png'
import Layer17 from '../../../assets/images/Layer17.png'
import Layer18 from '../../../assets/images/Layer18.png'
import Layer33 from '../../../assets/images/Layer 33.png'
import logout from '../../../assets/images/logout.png'
import how from '../../../assets/images/how.png';
import faq from '../../../assets/images/faq.png';

import colors from '../../../constants/colors';
import AppStyles from '../../../appstyles';
import fonts from '../../../constants/fonts';
import AsyncStorage from '@react-native-community/async-storage';
class Drawer extends React.Component{

    routeTo = (path)=>{
        this.props.navigation.toggleDrawer()

    }

    logOut=()=>{
   
        AsyncStorage.removeItem("token")
        AsyncStorage.removeItem("customer_id")
        this.props.navigation.replace('Auth Stack')
    }

    render(){
        return(
            <ImageBackground source={Side} style={{backgroundColor:colors.black,flex:1,width:'100%'}}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal:10,marginTop:20}}>
                <TextView fontSize={16}  text="WELCOME" />
                {/* <TextView
                marginVertical={-10}
                fontSize={25} color={colors.lightBlue}  text="Alan Wolfstring" /> */}
                {/* <TouchableOpacity
                        style={styles.row}
                        //onPress={()=> this.props.navigation.navigate('WebView')}
                        >
                     <Image style={AppStyles.smallImage}/>
                     <TextView
                     fontFamily={fonts.Sofia_Pro_Light_Az}
                     marginHorizontal={10} fontSize={12}  text="" />

                </TouchableOpacity> */}

                {/* <View style={styles.border}/> */}

                  <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Home')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={home}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="Home" />

                </TouchableOpacity>

                <View style={styles.border}/>
                
                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('MyTest')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={Multi}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="Multidimensional Career Counselling Test" />

                </TouchableOpacity>

                {/* <View style={styles.border}/> */}

                 {/* <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Home',{"from":"openPopUp"})}
                        >
                     <Image style={AppStyles.smallMediumImage} source={Layer16}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="Book Appointment with Career Counsellor" />

                </TouchableOpacity> */}

                

                {/* <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('CareerReport')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={Layer17}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="My Resources" />

                </TouchableOpacity> */}
               
                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Universities')}
                        >
                     <Image style={AppStyles.smallMediumImage} />
                     <TextView marginHorizontal={20}
                      marginVertical={5} 
                      fontSize={15}
                      color={'silver'}
                     fontFamily={fonts.Sofia_Pro_Light_Az}
                     text="Universities & Degrees" />

                </TouchableOpacity>

                <View style={styles.border}/>
                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('MyTest')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={Layer18}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="My Tests" />

                </TouchableOpacity>
                {/* <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('payFee')}
                        >
                     <Image style={AppStyles.smallMediumImage} />
                     <TextView marginHorizontal={20}
                      marginVertical={5} 
                      fontSize={15}
                      color={'silver'}
                     fontFamily={fonts.Sofia_Pro_Light_Az}
                     text="Pay Fee" />

                </TouchableOpacity> */}
                {/* <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Home')}
                        >
                     <Image style={AppStyles.smallMediumImage} />
                     <TextView marginHorizontal={20}
                      marginVertical={5} 
                      fontSize={15}
                      color={'silver'}
                     fontFamily={fonts.Sofia_Pro_Light_Az}
                     text="Terms & Conditions" />

                </TouchableOpacity> */}

                {/* <View style={styles.border}/>

                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Home')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={how}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="Help" />

                </TouchableOpacity> */}

                <View style={styles.border}/>
                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.props.navigation.navigate('Faqs')}
                        >
                     <Image style={AppStyles.smallMediumImage} source={faq}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="FAQs" />

                </TouchableOpacity>
                <View style={{marginTop:50}}/>
                <View style={styles.border}/>
                <TouchableOpacity
                        style={styles.row}
                        onPress={()=> this.logOut()}
                        >
                     <Image style={AppStyles.smallMediumImage} source={logout}/>
                     <TextView marginHorizontal={20} fontSize={15}  text="Logout" />

                </TouchableOpacity>
                <View style={{marginTop:30}}/>

                </ScrollView>
            </ImageBackground>

        )
    }
}



export default Drawer ; 

const styles = StyleSheet.create({
    image:{
        width:100,
        height:180,
        resizeMode:'contain',
        alignSelf:'center'
    },
    text:{
        color:colors.grey,
        marginHorizontal:20,
        marginVertical:5,
        fontSize:16,

    },
    border:{
        backgroundColor:'silver',
        width:'80%',
        height:0.5,
        marginVertical:5
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
    },
    imagedrawer:{
        width:20,
        height:20
    }
})