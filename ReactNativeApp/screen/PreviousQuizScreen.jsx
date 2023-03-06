import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from "../components/Card";
import Loader from '../components/Loader';
const PreviousQuizScreen = ({navigation}) => {
  const [loading,setLoading]=useState();
  const [data,setData]=useState([]);
  const {isFocused} = useIsFocused(false);
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://192.168.0.192:8080/api/user/getPreviousQuiz/suryanshsharma1942@gmail.com`)
    .then(response=>{
      setData(response.data);
    })
    .catch(error=>{
      console.log(error)
    });
    setLoading(false);
  },[isFocused]);
  if(loading)return <Loader></Loader>
  return (
    <View style={styles.PreviousQuizScreen}>
      <View style={{top:'5%'}}>
        <Text style={{color:'white',textAlign:'center',fontSize:20}}>Previous Quiz Screen.</Text>
      </View>
      <ScrollView style={styles.PreviousQuizScreenTop}>
        {
        data.length!==0?
        data.map((quiz,i)=>(
          <Card name={quiz.quizName} i={i} key={quiz.id} id={quiz.id}
          navigation={navigation} route={"ViewQuiz"}
        />
        )):
        <Text style={{color:'white', textAlign: "center" }}>No Previous Quiz Found.</Text>
        }
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  PreviousQuizScreen:{
    backgroundColor:'black',
    height:'100%'
  },
  PreviousQuizScreenTop:{
    top:'10%'
  }
});
export default PreviousQuizScreen