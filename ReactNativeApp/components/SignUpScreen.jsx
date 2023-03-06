import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, Image, TextInput,TouchableOpacity, Button} from 'react-native'
import AccountVerification from './AccountVerification';
import WelcomeScreen from '../screen/WelcomeScreen';


const SignUpScreen = ({Veryfication}) => {
    const[showPassword,setShowPassword]=useState(true);
    const[showVeryfication,SetVeryfication]=useState(false);
    // if(showVeryfication)return<AccountVerification/>
    useEffect(()=>{
        if(Veryfication==="true")
            SetVeryfication(true);
    },[SetVeryfication]);
    const signUpData={
        email:"",
        password:"",
        username:""
    }
    const handleSignUp=()=>{
        if(signUpData.email.length ==0)
            alert("Email can't be empty");
        else if(signUpData.username.length==0)
            alert("Username can't be empty.");
        else if(signUpData.password.length==0)
            alert("Password can't be empty.");
        else{
            alert("Hello "+signUpData.username);
            SetVeryfication(true);
        }
    }
  return (
    <View>
        {!showVeryfication?
        <>
        {/* Top Section */}
        <View style={styles.SignUpPageTop}>
            <Text style={styles.SignUpPageTitle}>Dare To Be Honest</Text>
            <Text style={styles.SignUpPageSubTitle}>Challange the new Limits</Text>
        </View>
        {/* Middle Section */}
        <View style={styles.SignUpPageMiddle}>
            <Text style={styles.SignUpInputTitle}>Your Email Address</Text>
            <TextInput placeholder={"Enter your email"} style={styles.SignUpPageUsrName}
                onChangeText={value=>signUpData.email=value}/>
            <Text style={styles.SignUpInputTitle}>Your Username</Text>
            <TextInput  placeholder={"It is your display name."} style={styles.SignUpPageUsrName}
                onChangeText={value=>signUpData.username=value}/>
            <Text style={styles.SignUpInputTitle}>Your Password</Text>
            <TextInput secureTextEntry={showPassword} placeholder={"Enter your password"} style={styles.SignUpPageUsrName}
                onChangeText={value=>signUpData.password=value}/>
            <Text style={styles.showPass} 
            onPress={()=>showPassword?setShowPassword(false):setShowPassword(true)} 
            
            >Show Password</Text>
        </View>
        {/* Bottom Section*/}
        <View style={styles.SignUpPageBottom}>
            <TouchableOpacity title='SignUp' style={styles.SignUpPageButton} onPress={handleSignUp}>
            <Text>SignUp</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>or</Text>
            <Text style={{textAlign:'center',color:'blue'}}>Already have an account.</Text>
        </View>
        </>
        :<AccountVerification/>
        }
    </View>
  )
}
const styles = StyleSheet.create({
    SignUpPageTop:{
        top:'10%',
        height:'30%'
    },
    SignUpPageTitle:{
        top:'6%',
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    SignUpPageSubTitle:{
        top:'5%',
        textAlign:'center'
    },
    SignUpPageMiddle:{
        left:'4%',
        top:'1%'
    },
    SignUpInputTitle:{
        left:'2%',
        fontWeight:'bold'
    },
    SignUpPageUsrName:{
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
    SignUpPageBottom:{
        top:'5%'
    },
    SignUpPageButton:{
        width: '50%',
        height: '25%',
        left:'25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#a7fc84',
        borderRadius:20
    }

});
export default SignUpScreen