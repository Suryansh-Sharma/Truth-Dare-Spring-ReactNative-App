import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import mailIcon from "../images/mail.png";
import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {TruthDareContext} from "../context/Context";
import * as SecureStore from 'expo-secure-store';

const AccountVerification = () => {
    const [seconds, setSeconds] = useState(59);
    const [showResend, setShowResend] = useState(false);
    const {email, setIsVerified, isLogin,baseUrl} = useContext(TruthDareContext);
    // useEffect(() => {
    //     // sendAccountVerificationMail();
    // }, [])
    const sendAccountVerificationMail = () => {
        axios.post(`${baseUrl}/api/auth/resend-verification-token/${email}`)
        .catch(error=>{
            console.log(error);
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                setShowResend(true);
                setSeconds(59);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);
    const handleResend = () => {
        setSeconds(59);
        setShowResend(false);
        sendAccountVerificationMail();
    }
    const handleContinue = async () => {
        axios.get(`${baseUrl}/api/auth/isVerified/${email}`)
            .then(async response => {
                if (response.data === true) {
                    await SecureStore.setItemAsync("isVerified", "true".replace(/"/g, ''));
                    setIsVerified(true);
                } else {
                    alert("Sorry your account is not verified !!");
                }
            })
            .catch(error => {
                console.log(error);
            })

    }


    return (
        <View>
            {/* Top Section */}
            <View style={styles.AccountVerificationTop}>
                <Text style={styles.AccountVerificationTitle}>You've got mail</Text>
                <Image source={mailIcon}/>
            </View>
            {/* Middle Section */}
            <View style={styles.AccountVerificationMiddle}>
                <Text>We have sent verification link to you mail.</Text>
                <Text>Please verify your account.</Text>
            </View>
            <View style={styles.AccountVerificationMiddle2}>
                <Text style={styles.AVM2Test}>Didn't receive any email ?</Text>
                <Text style={styles.AVM2Test}>or</Text>
                {
                    showResend ?
                        <Text style={{textAlign: 'center', color: 'blue'}} onPress={handleResend}>Resend.</Text>
                        : <Text style={{textAlign: 'center', color: 'blue'}}>
                            Please wait for {seconds} s</Text>
                }
            </View>
            <View style={styles.AccountVerificationBottom}>
                <TouchableOpacity title='SignUp' style={styles.AccountVerificationContinue}
                                  onPress={handleContinue}
                >
                    <Text style={{color: 'white'}}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    AccountVerificationTop: {
        flexDirection: 'row',
        top: '20%',
        left: '10%',
    },
    AccountVerificationTitle: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    AccountVerificationMiddle: {
        top: '20%',
        height: '20%',
        left: '14%',
    },
    AccountVerificationMiddle2: {
        top: '18%',
        height: '30%',
    },
    AVM2Test: {
        textAlign: 'center',
        fontSize: 15
    },
    AccountVerificationBottom: {
        top: '10%'
    },
    AccountVerificationContinue: {
        width: '50%',
        height: '30%',
        left: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6949f8',
        borderRadius: 20,
    }
});
export default AccountVerification