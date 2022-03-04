import React from 'react';
 import {Text,View} from 'react-native';
import Movies from '../screens/Movies';
import Favourite from '../screens/Favourite'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
export default function RootNavigator() {
    const Tab=createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    if(route.name=='Movies'){
                        iconName=focused?'videocam':'videocam-outline'
                    }else if(route.name=='Favourite'){
                        iconName=focused?'heart':'heart-outline'
                    }
                    return <Ionicons name={iconName} size={24} color={color} />
                },
                tabBarActiveTintColor:'blue',
                tabBarInactiveTintColor:'gray',
                tabBarShowLabel:false
            })}
            >
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="Favourite" component={Favourite} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}