import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import Loader from "../components/Loader";
import Toast from "react-native-root-toast";
import crownImg from "../images/crown.png";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

const Quiz = ({ route, navigation }) => {
  const { noOfQuestion, quizName, showResult, groupName } = route.params;

  const [currQuesNumber, setCurrQues] = useState(0);
  const [postData, setPostData] = useState([]);
  const [correctOption, setCorrectOption] = useState(0);
  const [currQuestion, setQuestion] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [optionValue, setOptionValue] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [options, setOptions] = useState([]);

  // Function that handle next button.

  const handleNext = () => {
    if (currQuestion.length === 0) return alert("Question is empty !!");
    if (correctOption === 0)
      return alert("Please select correct with help of slider !!");

    setCurrQues(currQuesNumber + 1);
    setPostData((postData) => [
      ...postData,
      {
        question: currQuestion,
        options: optionValue,
        correctOption: correctOption,
      },
    ]);
    setQuestion("");
    setCorrectOption(0);
    setOptionValue({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    setOptions([]);
  };
  // Function that handle Add Options.

  const handleAddMoreOption = () => {
    let maxId = 0;
    options.forEach((val) => {
      if (maxId < val.id) maxId = val.id;
    });
    if (maxId === 4) {
      alert("4 Option is max limit.");
      return;
    }
    setOptions([
      ...options,
      {
        id: maxId + 1,
      },
    ]);
  };

  // Function that handle Remove Options.

  const handleRemoveOption = () => {
    let maxId = 0;
    options.forEach((val) => {
      if (maxId < val.id) maxId = val.id;
    });
    if (maxId === 1) {
      alert("1 Option is minimum limit.");
      return;
    }
    let updatedOptions = [...options].filter((i) => i.id !== maxId);
    setOptions(updatedOptions);
    setCorrectOption(0);
    optionValue[maxId] = "";
  };
  const onCheck = (id) => {
    if (correctOption === id) {
      setCorrectOption(0);
      return;
    }
    setCorrectOption(id);
  };
  const handlePostQuiz = () => {
    console.log(postData);
    return;
    setLoading(true);
    axios.post(`http://192.168.0.192:8080/api/quiz/save/${groupName}/${showResult}/${quizName}/Suryansh Sharma`,
    {
      quizzes:postData
    })
    .then(response=>{

      let toast = Toast.show(
        <View style={style.ToastCard}>
          <Image source={crownImg} style={style.ToastCardImg} />
          <Text style={style.ToastCardTxt}>Quiz Added Successfully</Text>
        </View>,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
        }
      );
      navigation.navigate("mainScreen");
      console.log(response)
    })
    .catch(error=>{
      let toast = Toast.show("Request failed to send.", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#eff9fa",
        textColor: "black",
      });
      console.log(error);
    })
    setLoading(false);
  };
  useEffect(() => {
    if(currQuesNumber===parseInt(noOfQuestion)){
      handlePostQuiz()
    }
  }, [postData]);
  if (isLoading) return <Loader></Loader>;
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={style.QuizTopSection}>
        <Text style={style.QuizText1}>
          {currQuesNumber + 1}/{noOfQuestion}
        </Text>
        <View style={style.QuizText2Container}>
          <Text style={style.QuizText2}>Quiz</Text>
        </View>
      </View>
      <View style={style.QuizMiddleSection}>
        <TextInput
          placeholder="Enter your question here."
          style={style.QuizInput}
          value={currQuestion}
          onChangeText={(text) => setQuestion(text)}
        />
      </View>
      <ScrollView>
        {options.map((data) => (
          <View style={style.QuizOptions} key={data.id}>
            <Text style={style.QuizOptionTitle}>Option {data.id}.</Text>
            <TextInput
              style={style.QuizOptionInput}
              value={optionValue[data.id]}
              onChangeText={(val) => {
                const name = "option" + data.id;
                setOptionValue({ ...optionValue, [name]: val });
              }}
            />
            <Switch
              value={data.id === correctOption}
              onValueChange={() => onCheck(data.id)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={style.QuizOptionsBtn}>
        <TouchableOpacity
          style={style.AddMoreOption}
          onPress={handleAddMoreOption}
        >
          <Text>Add Option.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.AddMoreOption2}
          onPress={handleRemoveOption}
        >
          <Text>Remove Option.</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={style.QuizSave} onPress={handleNext}>
          <Text>Next Question</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
