import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Users from '../screens/Users';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchUser from '../screens/SearchUser';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName:string='';

          if (route.name === 'AllCustomers') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'SearchCustomer') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="AllCustomers"
        component={Users}
        options={{title: 'All Users'}}
      />
      <Tab.Screen
        name="SearchCustomer"
        component={SearchUser}
        options={{title: 'Search User'}}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
