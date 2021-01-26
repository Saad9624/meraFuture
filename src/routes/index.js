import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthStack from './authStack';
import DrawerStack from './dashboardStack' ;
import Splash from './../screens/auth/splash' ;

const Stack = createStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          options={{header: () => null}}
          name="Splash"
          component={Splash}
        
        />
    
        <Stack.Screen
          options={{header: () => null}}
          name="Auth Stack"
          component={AuthStack}
        
        />

        <Stack.Screen
         options={{header: () => null}}
        name="DrawerStack"
        component={DrawerStack}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
