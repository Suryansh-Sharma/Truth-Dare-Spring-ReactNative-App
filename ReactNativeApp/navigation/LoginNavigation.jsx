import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1  from "../components/LoginScreen";
import Screen2  from "../components/SignUpScreen";
import Screen3  from "../components/AccountVerification";
import Screen4 from "../components/WelcomeScreen";

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Home" component={Screen4} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="Login" component={Screen1} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="SignUp" component={Screen2} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="AccountVerification" component={Screen3} 
                options={{
                    headerShown:false
                }}
            />
    </Stack.Navigator>
  )
}

export default LoginNavigation