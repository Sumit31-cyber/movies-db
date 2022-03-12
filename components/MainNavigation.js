import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import Navbar from './Navbar';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();
export default class MainNavigation extends PureComponent {
    render() {
        return (
            <Stack.Navigator
                headerMode={'screen'}
                initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} main={true} />
                    }} />

                <Stack.Screen
                    name="Details"
                    component={Detail}
                    options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} />
                    }} />

                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{
                        headerTransparent: true,
                        header: ({ navigation }) => <Navbar navigation={navigation} />
                    }} />

            </Stack.Navigator>
        )
    }
}