import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Loader from "../components/Loader";
let jsonData = require('../FakeApi/ResultFakeApi.json');
const Result = ({ route,navigation }) => {
    const { quizId } = route.params;
  const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://192.168.0.192:8080/api/quiz/getResultOfQuiz/${quizId}`)
        .then(response=>{
            setData(response.data)
        })
        .catch(error=>{
            console.log(error);
        })
        setLoading(false)
    }, [])
    const handleCardClick=(resultId)=>{
        navigation.navigate("ViewUserResult", {
            quizId:quizId,
            resultId:resultId
          });
    }
    if(isLoading)return <Loader></Loader>
    return (
        <View style={styles.ResultPage}>
            <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
            <Text style={styles.ResultPageTitle}>Result of quiz</Text>
            <ScrollView style={styles.ResultCardScrollView}>
                {
                    data.map((item) => (
                        <TouchableOpacity style={styles.ResultCard} key={item.id}
                            onPress={()=>handleCardClick(item.id)}
                        >
                            <Text style={styles.ResultCardTitle}>
                                {
                                    item.userEmail === "suryanshsharma1942@gmail.com" ?
                                        "You"
                                        : item.username
                                }
                            </Text>
                            <Text style={styles.ResultCardScore}>
                                Score {item.points} out of {item.totalPoints}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <Text style={styles.ResultPageTitle}
                onPress={()=>{
                    navigation.navigate("mainScreen")
                }}
            >Back to Main Screen</Text>
        
        </View>
    );
};
const styles = StyleSheet.create({
    ResultPage: {
        backgroundColor: "black",
        height: "100%",
    },
    ResultPageTitle: {
        color: 'white',
        fontSize: 30,
        padding: 30,

    },
    ResultCardScrollView:{
        height:'70%'
    },
    ResultCard:{
        margin:10,
        borderColor:'white',
        borderWidth:2,
        borderRadius:10,
        padding:25,
        flexDirection:'row'
    },
    ResultCardTitle:{
        flex:1,
        color:'white',
        fontSize:15
    },
    ResultCardScore:{
        color:'white',
    }
});

export default Result;
