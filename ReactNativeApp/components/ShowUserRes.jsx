import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Loader from "./Loader";
import { TruthDareContext } from "../context/Context";

const ShowUserRes = ({route, navigation}) => {
    const {resultId, quizId} = route.params;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPageLoading, setIsLoading] = useState(true);
    const {baseUrl,jwt}=useContext(TruthDareContext);
    const handleNextClick = () => {
        if (currentPage < data.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("Page ended")
        }
    };
    useEffect(() => {
        setIsLoading(true);
        setData([]);
        Promise.all([
            axios.get(`${baseUrl}/api/quiz/getQuizQuesAns/${quizId}`,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            }),
            axios.get(`${baseUrl}/api/quiz/getResultAns/${resultId}`,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            })
        ]).then(([quizResponse, resultResponse]) => {
            const quizData = quizResponse.data;
            const userRes = resultResponse.data;
            const data = [];

            quizData.forEach((quiz, index) => {
                const question = quiz.question;
                const option1 = quiz.option1;
                const option2 = quiz.option2;
                const option3 = quiz.option3;
                const option4 = quiz.option4;
                const tempVal = userRes[index].selectOption
                const userAnswer = quiz[tempVal];
                const val = quiz.correctOption
                const correctOption = quiz[val]
                const isTrue = userRes[index].isTrue;

                setData((data) => {
                    const newData = [
                        ...data,
                        {
                            question: question,
                            option1: option1,
                            option2: option2,
                            option3: option3,
                            option4: option4,
                            userAnswer: userAnswer,
                            correctOption: correctOption,
                            isTrue: isTrue,
                        },
                    ];
                    return newData;
                });


            });

            setCurrentPage(data.length);

        }).catch((error) => {
            console.log(error)
        });
        setIsLoading(false);
    }, [quizId, resultId]);
    if (isPageLoading) return <Loader></Loader>;
    return (
        <View style={{flex: 1}}>
            {
                data.length !== 0 ?
                    <>
                        <View style={style.viewQuizTop}>
                            <Text style={style.viewQuizTitle}>Attempt Quiz</Text>
                            <Text style={style.viewQuizQuestionNo}>
                                Question {currentPage + 1} out of {data.length}
                            </Text>
                            <View style={style.viewQuizQuestionSection}>
                                <Text style={style.viewQuizQuestion}>
                                    {data[currentPage].question}
                                </Text>
                            </View>
                        </View>
                        <ScrollView style={style.viewQuizOptionsSection}>
                            {
                                data[currentPage].isTrue === true ?
                                    <View>
                                        <Text style={style.optionBoxText}>You Answer is Correct</Text>
                                        <View style={style.correctOptionBox}>
                                            <Text style={style.optionBoxText}>{data[currentPage].correctOption}</Text>
                                        </View>
                                    </View>
                                    : <View>
                                        <Text>You Answer is in-correct !!.</Text>
                                        <View style={style.correctOptionBox}>
                                            <Text style={style.optionBoxText}>{data[currentPage].correctOption}</Text>
                                        </View>
                                        <View style={style.wrongOptionBox}>
                                            <Text style={style.optionBoxText}>{data[currentPage].userAnswer}</Text>
                                        </View>
                                    </View>
                            }
                        </ScrollView>
                        <TouchableOpacity style={style.viewQuizBottom} onPress={handleNextClick}>
                            <Text style={style.viewQuizBottomText}>Next Question</Text>
                        </TouchableOpacity>
                    </>
                    : null}
        </View>
    );
};
const style = StyleSheet.create({
    viewQuizTop: {
        backgroundColor: "#975fe1",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    viewQuizTitle: {
        paddingTop: 50,
        textAlign: "center",
        color: "white",
        fontSize: 25,
        fontWeight: "450",
    },
    viewQuizQuestionNo: {
        textAlign: "center",
        color: "white",
        fontWeight: "450",
        opacity: 0.5,
    },
    viewQuizQuestionSection: {
        padding: 50,
    },
    viewQuizQuestion: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
    },
    viewQuizOptionsSection: {
        margin: 40,
        height: 400,
    },
    wrongOptionBox: {
        borderColor: "red",
        borderWidth: 3,
        borderRadius: 5,
        marginTop: 20,
        padding: 20,
    },
    correctOptionBox: {
        borderColor: "green",
        borderWidth: 3,
        borderRadius: 5,
        marginTop: 20,
        padding: 20,
    },
    optionBoxText: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 17,
    },
    viewQuizBottom: {
        height: 10,
        backgroundColor: "#975fe1",
        flex: 1,
        justifyContent: "flex-end",
    },
    viewQuizBottomText: {
        color: "white",
        padding: 20,
        textAlign: "center",
        fontWeight: "450",
    },
    ToastCard: {
        flexDirection: "row",
        height: 80,
        backgroundColor: "#eff9fa",
    },
    ToastCardImg: {
        height: "50%",
        padding: 40,
        width: "50%",
    },
    ToastCardTxt: {
        padding: 20,
    },
});
export default ShowUserRes;
