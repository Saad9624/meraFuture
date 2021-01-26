import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Login  from '../screens/auth/login' ;
import signup from '../screens/auth/signup' ;
import DashboardStack from '../screens/dashboard/home' ;
import payFee from '../screens/dashboard/payfee' ;
import StartTest from '../screens/dashboard/startTest' ;
import CareerReport from '../screens/dashboard/careerReport' ;
import MyTest from '../screens/dashboard/myTests';
import ForGotPass from '../screens/auth/forgotPassword' ;

const Stack = createStackNavigator();

const  AuthStack = () => {
    return (
      
        <Stack.Navigator>
          
          <Stack.Screen
           name="Login"
            component={Login} options={{headerShown: false}} />
          <Stack.Screen
           name="signup"
            component={signup} options={{headerShown: false}} />
          <Stack.Screen
           name="ForGotPass"
            component={ForGotPass} options={{headerShown: false}} />
             {/* <Stack.Screen
           name="StartTest"
            component={StartTest} options={{headerShown: false}} />
             <Stack.Screen
           name="CareerReport"
            component={CareerReport} options={{headerShown: false}} />
             <Stack.Screen
           name="MyTest"
            component={MyTest} options={{headerShown: false}} /> */}
          {/* <Stack.Screen
            name="payFee"
            component={payFee} options={{headerShown: false}} /> */}
          <Stack.Screen
           name="DashboardStack"
            component={DashboardStack} options={{headerShown: false}} />

            

          {/* <Stack.Screen
           name="Signup"
            component={Signup} options={{headerShown: false}} />

          <Stack.Screen
           name="Home"
            component={DrawerStack} options={{headerShown: false}} /> */}

        </Stack.Navigator>
     
    );
  }

  export default AuthStack;