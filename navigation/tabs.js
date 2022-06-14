import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../Screens/';
import AccountSettingScreen from '../Screens/Account';
import {icons, COLORS} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AccountList from '../Screens/AccountList';
import SearchBook from '../Screens/SearchBook';

const Tab = createBottomTabNavigator();

// const tabOptions = {
//     showLabel: false,
//     style: {
//         height: "10%",
//         backgroundColor: COLORS.black
//     }
// }

const Tabs = () => {
  return (
    <Tab.Navigator
      //tabBarOptions={tabOptions}
      tabBarOptions={{
        //activeTintColor: COLORS.darkGreen,
        showLabel: false,
        //inactiveTintColor: COLORS.lightBlue,
        activeBackgroundColor: COLORS.black,
        inactiveBackgroundColor: COLORS.black,
        // style: {
        //     backgroundColor: 'transparent',
        //     borderTopWidth: 0,
        //     position: 'absolute',
        //     left: 50,
        //     right: 50,
        //     bottom: 20,
        //     height: 100
        //   }
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLORS.white : COLORS.gray;

          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={icons.dashboard_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'Search':
              return (
                <Image
                  source={icons.search_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'AccountList':
              return (
                <Image
                  source={icons.read_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'Setting':
              return (
                <Image
                  source={icons.menu_icon}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={SearchBook}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AccountList"
        component={AccountList}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={AccountSettingScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
