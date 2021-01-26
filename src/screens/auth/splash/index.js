import React, { Component } from 'react';
import { Dimensions, 
    View, 
    StatusBar, 
    Text, 
    Image, 
    Platform, 
    StyleSheet, 
    ImageBackground ,
} 
from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import{
    logo,
} from '../../../constants/images';
import AsyncStorage from '@react-native-community/async-storage';


const HEIGHT = Dimensions.get('window').height ;
const WIDHT = Dimensions.get('window').width ;


class Splash extends Component {
   

    async componentDidMount() {
        StatusBar.setHidden(true);
        const token = await AsyncStorage.getItem("token")
        const customer_id = await AsyncStorage.getItem("customer_id")
        console.log("token" , token)
        if(token !== "" && token !== null && token !== "null"){
            StatusBar.setHidden(true);
            console.log("1")
            setTimeout(() => {
                StatusBar.setHidden(false);
                // this.props.navigation.replace('Auth Stack')
                this.props.navigation.replace('DrawerStack')
     
                   }, 3000)
        }
        else{
            StatusBar.setHidden(false);
            console.log("2")
            setTimeout(() => {
                StatusBar.setHidden(false);

            this.props.navigation.replace('Auth Stack')
          // this.props.navigation.replace('Auth Stack')

              }, 3000)
        }
        
        // StatusBar.setHidden(true);
        
        //     setTimeout(() => {

        //    // this.props.navigation.replace('Auth Stack')
        //    this.props.navigation.replace('Auth Stack')

        //       }, 3000)
            
        
    }

    async componentWillUnmount() {
        StatusBar.setHidden(false);
    }

    renderSplashOrIndicator = () => {
        return (
            <View style={styles.Container}>
                <Text style={{fontFamily:fonts.Sofia_Pro_Light_Az,color:'white',fontSize:30}}>merafuture.pk</Text>
                           {/* <Image  source={logo} style={styles.logo}></Image>
              */}

{/*                 

                 */}
                 
               

            </View>
        )
    }


    render() {
        return (

            this.renderSplashOrIndicator()
        );
    }
}


export default Splash;


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' ,
        width: '100%',
        height: '100%' ,
        backgroundColor:colors.darkBlue
    },
   
    logo: {
        resizeMode:'contain',
        width:290,
        height:270,
        backgroundColor:'white'
      },
      circel:{
          backgroundColor:'white',
          borderRadius:100,
          width:200,
          height:200,
          alignSelf:'center',
          alignItems:'center',
          justifyContent:'center'
      },
   
});
