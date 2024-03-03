import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenOne from './src/pages/Home/ScreenOne';
import ScreenTwo from './src/pages/Config/ScreenTwo';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ScreenOne"
          component={ScreenOne}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScreenTwo"
          component={ScreenTwo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
