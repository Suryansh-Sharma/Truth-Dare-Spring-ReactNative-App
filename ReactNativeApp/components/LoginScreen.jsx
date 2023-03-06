import { View, Text,StyleSheet, Image, TextInput,TouchableOpacity, Button} from 'react-native'
import React, { useState } from 'react'
import crown from "../images/crown.png";

const LoginScreen = () => {
    const[showPassword,setShowPassword]=useState(true);
    const loginData={
        email:"",
        password:""
    }
    const handleLogin=()=>{
        if(loginData.email.length ==0)
            alert("Email can't be empty");
        else if(loginData.password.length==0)
            alert("Password can't be empty.");
        else{
            alert("Hello "+loginData.email);
        }
    }
  return (
    <View>
        {/* Top Section */}
        <View style={styles.LoginPageTop}>
            <Text style={styles.LoginPageTitle}>Dare To Be Honest</Text>
            <Text style={styles.LoginPageSubtitle}>Challange the new Limits</Text>
            <Image source={crown} style={styles.LoginPageIcon}/>
        </View>
        {/* Middle Section */}
        <View style={styles.LoginPageMiddle}>
            <Text style={styles.LoginInputTitle}>Your Email Address</Text>
            <TextInput placeholder={"Enter your email"} style={styles.LoginPageUsrName}
                onChangeText={value=>loginData.email=value}/>
            <Text style={styles.LoginInputTitle}>Your Password</Text>
            <TextInput secureTextEntry={showPassword} placeholder={"Enter your password"} style={styles.LoginPageUsrName}
                onChangeText={value=>loginData.password=value}/>
            <Text style={styles.showPass} 
            onPress={()=>showPassword?setShowPassword(false):setShowPassword(true)} 
            
            >Show Password</Text>
        </View>
        {/* Bottom Section*/}
        <View style={styles.LoginPageBottom}>
            <TouchableOpacity title='Login' style={styles.LoginPageButton} onPress={handleLogin}>
            <Text>Login</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>or</Text>
            <Text style={{textAlign:'center',color:'blue'}}>Create New Account</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    LoginPageTop:{
        top:'15%',
        height:'30%'
    },
    LoginPageTitle:{
        top:'6%',
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    LoginPageSubtitle:{
        top:'5%',
        textAlign:'center'
    },
    LoginPageIcon:{
        top:'10%',
        left:'35%'
    },
    LoginPageMiddle:{
        left:'4%',
        top:'25%'
    },
    LoginInputTitle:{
        left:'2%',
        fontWeight:'bold'
    },
    LoginPageUsrName:{
        height: 40,
        width:'90%',
        margin: 12,
        borderWidth: 3,
        borderRadius:10,
        padding: 10,
    },
    showPass:{
        left:'2%',
        color:'blue'
    },
    LoginPageBottom:{
        top:'30%'
    },
    LoginPageButton:{
        width: '50%',
        height: '25%',
        left:'25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#a7fc84',
        borderRadius:20
    }

});
export default LoginScreen;