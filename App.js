import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BookDetail from './Screens/BookDetail';
import Tabs from './navigation/tabs';
import SigningScreen from './Screens/SingingScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'SigningScreen'}>
        {/* Tabs */}
        <Stack.Screen
          name="SigningScreen"
          component={SigningScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{headerShown: false}}
        />

        {/* Screens */}
        <Stack.Screen
          name="BookDetail"
          component={BookDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
