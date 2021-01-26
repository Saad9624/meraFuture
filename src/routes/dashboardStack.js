import React from 'react';
import { useWindowDimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  Home  from '../screens/dashboard/home' ;
import SideDrawer from '../screens/dashboard/sideDrawer' ;
import payFee from '../screens/dashboard/payfee' ;
import CareerReport from '../screens/dashboard/careerReport' ;
import StartTest from '../screens/dashboard/startTest' ;
import MyTest from '../screens/dashboard/myTests' ;
import Profile from '../screens/dashboard/profile' ;
import Faqs from '../screens/dashboard/faqs';
import Universities from '../screens/dashboard/universities' ;
import Video from '../screens/dashboard/video' ;
import PersonalityTest from '../screens/dashboard/startTest/personalityTest' ;
import DummyTest from '../screens/dashboard/startTest/dummyTest' ;
import imageTest from '../screens/dashboard/startTest/imageTest' ;
import errorCheckingTest from '../screens/dashboard/startTest/erroChecking' ;
import WebView from '../screens/dashboard/webView' ;
import NewTest from '../screens/dashboard/startTest/newTest' ;
import DetailReport from '../screens/dashboard/detailReport' ;

const Drawer = createDrawerNavigator();

const  DashBoardStack = () => {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;


    return (
        <Drawer.Navigator 
        drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={isLargeScreen ? null : { width: '90%' }}
        overlayColor="transparent"
        drawerContent={(props) => <SideDrawer {...props} />}  >
         
         <Drawer.Screen
           name="Home"
            component={Home} options={{headerShown: false}} />

         <Drawer.Screen
           name="payFee"
            component={payFee} options={{headerShown: false}} />
         <Drawer.Screen
           name="StartTest"
            component={StartTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="CareerReport"
            component={CareerReport} options={{headerShown: false}} />
         <Drawer.Screen
           name="MyTest"
            component={MyTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="Profile"
            component={Profile} options={{headerShown: false}} />
         <Drawer.Screen
           name="Faqs"
            component={Faqs} options={{headerShown: false}} />
         <Drawer.Screen
           name="Universities"
            component={Universities} options={{headerShown: false}} />
         <Drawer.Screen
           name="Video"
            component={Video} options={{headerShown: false}} />
         <Drawer.Screen
           name="PersonalityTest"
            component={PersonalityTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="DummyTest"
            component={DummyTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="imageTest"
            component={imageTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="errorCheckingTest"
            component={errorCheckingTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="WebView"
            component={WebView} options={{headerShown: false}} />
         <Drawer.Screen
           name="NewTest"
            component={NewTest} options={{headerShown: false}} />
         <Drawer.Screen
           name="DetailReport"
            component={DetailReport} options={{headerShown: false}} />

        
      
      
        </Drawer.Navigator>
    );
  }

  export default DashBoardStack;