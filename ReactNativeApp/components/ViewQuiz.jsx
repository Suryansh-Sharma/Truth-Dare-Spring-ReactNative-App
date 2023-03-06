import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import Loader from "./Loader";
import Toast from "react-native-root-toast";
import crownImg from "../images/crown.png";
const ViewQuiz = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [choice, setChoice] = useState("");
  const [cuurentOption, setCurrentOption] = useState(0);
  const [isPageLoading, setIsLoading] = useState(true);

  const handleSelectOption = (option, choice) => {
    if (isFinalPage)
      alert("Sorry you can't change your choice at last page !!");
    else {
      setChoice(choice);
      setCurrentOption(option);
    }
  };
  const handleNextClick = () => {
    if (choice === "") return alert("Please select any option");
    if (!isFinalPage) {
      setSelectedOptions((selectedOptions) => [
        ...selectedOptions,
        {
          question: data[currentPage].question,
          option: choice,
        },
      ]);

      if (currentPage !== data.length - 1) {
        setCurrentPage(currentPage + 1);
        setChoice("");
        setCurrentOption(0);
      } else setIsFinalPage(true);
    } else {
      handleSubmitQuiz();
    }
  };
  useEffect(() => {
    axios
      .get(
        `http://192.168.0.192:8080/api/quiz/attemptQuiz/${quizId}/suryanshsharma1942@gmail.com`
      )
      .then((reponse) => {
        setData(reponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if(error.response.status===400){
          navigation.navigate("ViewResult",{
            quizId:quizId,
            totalPoints:data.length
          })
        }

      });
  }, [route,navigation]);
  const handleSubmitQuiz = () => {
    setIsLoading(true);
    axios.post(`http://192.168.0.192:8080/api/quiz/submitQuiz`,{
      quizId: quizId,
      userEmail: "suryanshsharma1942@gmail.com",
      selectedOptions: selectedOptions,
    })
    .then(response=>{
      console.log(response)
      let toast = Toast.show(
        <View style={style.ToastCard}>
          <Image source={crownImg} style={style.ToastCardImg} />
          <Text style={style.ToastCardTxt}>{response.data}</Text>
        </View>,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
        }
      );
      navigation.navigate("ViewResult",{
        quizId:quizId,
        totalPoints:data.length
      })
    })
    .catch(error=>{
      console.log(error);
    });
    setIsLoading(false);
  };
  if (isPageLoading) return <Loader></Loader>;
  return (
    <View style={{ flex: 1 }}>
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
        {data[currentPage].option1 === "" ? null : (
          <TouchableOpacity
            style={cuurentOption === 1 ? style.selectedOption : style.optionBox}
            onPress={() => handleSelectOption(1, "option1")}
          >
            <Text style={style.optionBoxText}>{data[currentPage].option1}</Text>
          </TouchableOpacity>
        )}

        {data[currentPage].option2 === "" ? null : (
          <TouchableOpacity
            style={cuurentOption === 2 ? style.selectedOption : style.optionBox}
            onPress={() => handleSelectOption(2, "option2")}
          >
            <Text style={style.optionBoxText}>{data[currentPage].option2}</Text>
          </TouchableOpacity>
        )}
        {data[currentPage].option3 === "" ? null : (
          <TouchableOpacity
            style={cuurentOption === 3 ? style.selectedOption : style.optionBox}
            onPress={() => handleSelectOption(3, "option3")}
          >
            <Text style={style.optionBoxText}>{data[currentPage].option3}</Text>
          </TouchableOpacity>
        )}
        {data[currentPage].option3 === "" ? null : (
          <TouchableOpacity
            style={cuurentOption === 4 ? style.selectedOption : style.optionBox}
            onPress={() => handleSelectOption(4, "option4")}
          >
            <Text style={style.optionBoxText}>{data[currentPage].option4}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <TouchableOpacity style={style.viewQuizBottom} onPress={handleNextClick}>
        <Text style={style.viewQuizBottomText}>
          {isFinalPage ? "Submit Quiz." : "Next Question"}
        </Text>
      </TouchableOpacity>
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
  selectedOption: {
    borderColor: "#8d5be3",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 20,
    padding: 20,
  },
  optionBox: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
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
export default ViewQuiz;
