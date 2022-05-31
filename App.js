import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BookDetail from './Screens/BookDetail';
import Tabs from './navigation/tabs';
import SigningScreen from './Screens/SigningScreen';
import AccountSettingScreen from './Screens/Account';
import BookmarkedScreen from './Screens/Bookmarked';
import {StatusBar} from 'react-native';
import AddBooks from './Screens/AddBooks';
import RenderBorrowDetail from './Screens/RenderBorrowDetail';
import RenderUserInfo from './Screens/RenderUserInfo';
import EditAccountScreen from './Screens/EditAccount';
import BorrowBookScreen from './Screens/BorrowBook';
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
        {/* <Stack.Screen name="testScreen" component={ Test}/> */}
        <Stack.Screen name="SigningScreen" component={SigningScreen} />
        <Stack.Screen name="Home" component={Tabs} />
        {/* Screens */}
        <Stack.Screen name="BookDetail" component={BookDetail} />
        <Stack.Screen name="AddBooks" component={AddBooks} />
        <Stack.Screen name="BookmarkedScreen" component={BookmarkedScreen} />
        <Stack.Screen name="RenderBorrowDetail" component={RenderBorrowDetail} />
        <Stack.Screen name="RenderUserInfo" component={RenderUserInfo} />
        <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} />
        <Stack.Screen name="BorrowBookScreen" component={BorrowBookScreen} />
      
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
