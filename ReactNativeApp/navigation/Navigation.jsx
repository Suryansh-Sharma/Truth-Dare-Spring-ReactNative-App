import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from "../components/WelcomeScreen";
import Screen2 from '../screen/MainScreen';
import Screen3 from '../components/GroupDetails';
import Screen4 from '../components/Quiz';
import Screen5 from '../components/ViewQuiz';
import Screen6 from '../components/Result'
import Screen7 from '../components/ShowUserRes'
const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen name="Home" component={Screen1} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="mainScreen" component={Screen2} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="allGroups" component={Screen3}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='Quiz' component={Screen4}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='ViewQuiz' component={Screen5}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name='ViewResult' component={Screen6}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen name='ViewUserResult' component={Screen7}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    ); 
}

export default Navigation;