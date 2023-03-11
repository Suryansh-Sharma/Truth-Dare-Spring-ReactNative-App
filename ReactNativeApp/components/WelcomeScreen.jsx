import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import blackImg from "../images/blackImage.webp";
import crown from "../images/crown.png";

const WelcomeScreen = ({navigation}) => {
    const auth = false;
    const check = () => {
        navigation.navigate('Login')
    }
    return (
        <View>
            {/* Top Section */}
            <View style={styles.welcomeScreenTop}>
                <Image source={blackImg} style={styles.welcomeScreenTopImg}/>
                <Image source={crown} style={styles.welcomeScreenTopCrown}/>
            </View>
            {/* Middle Section */}
            <View style={styles.WelcomeScreenMiddle}>
                <Text style={styles.WelcomeScreenMiddleTitle}>Dare To Be Honest</Text>
                <Text style={styles.WelcomeScreenMiddleTitle2}>A platform to play truth & dare app with friends.</Text>
            </View>
            {/* Bottom Section */}
            <View style={styles.WelcomeBottomSection}>
                <TouchableOpacity title='Login' style={styles.WelcomeScreenButton}
                                  onPress={() => check()}>
                    <Text>Get Started </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeScreenTop: {
        height: '50%'
    },
    welcomeScreenTopImg: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,

    },
    welcomeScreenTopCrown: {
        top: '-10%',
        left: '35%'
    },
    WelcomeScreenMiddle: {
        top: '14%'
    },
    WelcomeScreenMiddleTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    WelcomeScreenMiddleTitle2: {
        textAlign: 'center',
    },
    WelcomeBottomSection: {
        top: '35%'
    },
    WelcomeScreenButton: {
        width: '50%',
        height: '30%',
        left: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a7fc84',
        borderRadius: 20
    }
});

export default WelcomeScreen;