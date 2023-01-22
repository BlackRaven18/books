import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { color } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon,NativeBaseProvider,extendTheme, FavouriteIcon} from 'native-base';
import {useState} from 'react';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DetailsScreen from './screens/DetailsScreen';
import HistoryScreen from './screens/HistoryScreen';
import PopularScreen from './screens/PopularScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReservationsScreen from './screens/RegisterScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import ProfileScreen from './screens/ProfileScreen';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Input,
  Button,
} from 'react-native';
import { getFirestore } from "firebase/firestore";
import app from "./firestoreConfig"
import { collection, getDocs, addDoc } from "firebase/firestore";
import {useEffect} from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Logowanie" component={LoginScreen} />
      <Stack.Screen name="Rejestracja" component={RegistrationScreen} />
      <Stack.Screen name="Opis" component={DetailsScreen} />
      <Stack.Screen name="Historia" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
                let iconName;

                if(route.name==='Popularne'){
                    iconName=focused ? 'home' : 'home';
                }
                else if(route.name==='Rejestr'){
                    iconName=focused ? 'search' : 'search';
                }
                else if(route.name==='Rezerwacje'){
                    iconName=focused ? 'add-circle' : 'add-circle';
                }
                else if(route.name==='Ulubione'){
                    iconName=focused ? 'heart' : 'heart';
                }
                else if(route.name==='Profil'){
                    iconName=focused ? 'person' : 'person';
                }
                return <Ionicons name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'black',
        })}
        >
      <Tab.Screen name="Popularne" component={PopularScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Rejestr" component={RegisterScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Rezerwacje" component={ReservationsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Ulubione" component={FavouriteScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Profil" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

const newColorTheme = {
  brand: {
    900: '#5B8DF6',
    800: '#DA8129',
    700: '#29DA31',
  },
};

const theme = extendTheme({
colors: newColorTheme,
});

function App()
 {
  return (
    <NativeBaseProvider theme={theme}>
    <NavigationContainer>
   <Drawer.Navigator useLegacyImplementation={true}
    screenOptions={{
      headerTitle: 'Books',
      headerStyle:{
        backgroundColor: 'gray',
      },
      headerTintColor: 'white',
    }}
   >
      <Drawer.Screen name="Panel logowania" component={MyStack} />
      <Drawer.Screen name="Books" component={BottomTabs} />
    </Drawer.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default App;
