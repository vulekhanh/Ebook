import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BookDetail from './Screens/BookDetail';
import Tabs from './navigation/tabs';
import SigningScreen from './Screens/SigningScreen';
import AccountSettingScreen from './Screens/Account';
import BookmarkedScreen from './Screens/Bookmarked';
import {StatusBar} from 'react-native';

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
        initialRouteName={'SigningScreen'}
        screenOptions={{headerShown: false}}>
        {/* Tabs */}
        <Stack.Screen name="SigningScreen" component={SigningScreen} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name='AccountList' component={Tabs} />
        
        {/* Screens */}
        <Stack.Screen name="BookDetail" component={BookDetail} />
        <Stack.Screen name="BookmarkedScreen" component={BookmarkedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
