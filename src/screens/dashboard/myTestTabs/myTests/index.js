import React, { Component } from 'react'
import { Text, View, FlatList,StyleSheet,Dimensions, TouchableOpacity } from 'react-native'
import {Card} from 'native-base' ;
import fonts from '../../../../constants/fonts';
import TextView from '../../../../components/textView';
import colors from '../../../../constants/colors';
import AppStyles from '../../../../appstyles';


export class myTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data:[
            {cat_name:'Personality Test', catName2:'CAREER COUNSELLING TEST',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
            {cat_name:'Numerical Reasoning' , catName2:'WITH CAREER COUNSELLOR',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
            {cat_name:'Mechanical Reasoning', catName2:'AND DEGREES',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {cat_name:'Interests', catName2:'PROFESSIONALS',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
            {cat_name:'CONTACT US', catName2:'',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'  },
            {cat_name:'FAQS', catName2:'',lorem:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        ],
    }
}



    _renderItem=({item}) =>{

        return(
            <Card style={styles.itemStyle}>
                <TextView
                fontSize={15}
                color={'black'}
                text={item.cat_name}
                />
<TextView
                fontSize={13}
                marginVertical={-10}
                fontFamily={fonts.Sofia_Pro_Light_Az}
                color={'black'}
                text={item.lorem}
                />

                <View style={AppStyles.rowalign}>

                    <View>
                        <TextView color={colors.blue} fontSize={15} text="15 Minutes"/>
                    </View>

                    <View>
                        <TextView color={colors.blue} fontSize={15} text="Total Questions : 60"/>
                    </View>

                </View>


               <TouchableOpacity 
               onPress={()=> this.props.navigation.navigate('StartTest')}
               style={{bottom:0,position:'absolute',backgroundColor:colors.blue,width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
               <TextView 
                alignSelf="center"
            
                color='white'
                fontSize={15} 
                marginVertical={1}
                text={"Take Test"}/>
               </TouchableOpacity>
               
               
            </Card>
        )
      }



    render() {
        return (
            <View style={{flex:1}}>
                 <FlatList
                style={[styles.flatListStyle]}
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(key,index)=> index.toString()}
                />
            </View>
        )
    }
}

export default myTest ;



const styles = StyleSheet.create({
   
    itemStyle:{
        marginHorizontal:10,
        marginVertical:5,
        borderRadius:2,
        flex:1,
        borderWidth:1,
        height:Dimensions.get('window').height / 4,
    }, 
    flatListStyle:{
        alignSelf:'center',
        marginVertical:10,
        width:'95%',
        height:'100%',
        alignSelf:'center'
    },
});

