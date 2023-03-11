import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from "../components/Card";
import Loader from '../components/Loader';
import {TruthDareContext} from "../context/Context";

const PreviousQuizScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {isFocused} = useIsFocused(false);
    const {email} = useContext(TruthDareContext);
    useEffect(() => {
        setLoading(true);
        loadPrevQuizData();
    }, [isFocused]);
    const loadPrevQuizData = async () => {
        axios.get(`http://192.168.0.192:8080/api/user/getPreviousQuiz/${email}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error)
            });
        setLoading(false);
    }
    if (loading) return <Loader></Loader>
    return (
        <View style={styles.PreviousQuizScreen}>
            <View style={{top: '5%'}}>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Previous Quiz Screen.</Text>
            </View>
            <ScrollView style={styles.PreviousQuizScreenTop}>
                {
                    data.length !== 0 ?
                        data.map((quiz, i) => (
                            <Card name={quiz.quizName} i={i} key={quiz.id} id={quiz.id}
                                  navigation={navigation} route={"ViewQuiz"}
                            />
                        )) :
                        <Text style={{color: 'white', textAlign: "center"}}>No Previous Quiz Found.</Text>
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    PreviousQuizScreen: {
        backgroundColor: 'black',
        height: '100%'
    },
    PreviousQuizScreenTop: {
        top: '10%'
    }
});
export default PreviousQuizScreen