import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useState} from "react";
import axios from "axios";
import Modal from "react-native-modal";
import Toast from "react-native-root-toast";
import crownImg from "../images/crown.png";
import {TruthDareContext} from "../context/Context";

const Card = ({name, i, img, id, navigation, route, quizId}) => {
    const colourArray = ["#c2e8f7", "#f5e4b5", "#e1f5e9", "#e4cbff", "#4cd9a5"];
    const [showModel, setShowModel] = useState(false);
    const [inputText, setInputText] = useState("");
    const {email} = useContext(TruthDareContext);
    const handleCardClick = () => {
        if (route === "ViewQuiz") {
            navigation.navigate("ViewQuiz", {
                quizId: id,
            });
        } else if (route === "Groups") {
            navigation.navigate("allGroups", {
                itemId: id,
                otherParam: "anything you want here",
            });
        } else if (route === "JoinGroup") {
            setShowModel(true);
        } else if (route === "ShowUserRes") {
            navigation.navigate("ShowUserRes", {
                quizId: quizId,
                resultId: id
            });
        }
    };
    const handleJoinGroupApi = async () => {
        axios
            .post(`http://192.168.0.192:8080/api/group/joinGroup`, {
                userEmail: email,
                groupId: id,
                code: inputText,
            })
            .then(response => {
                let toast = Toast.show(
                    <View style={style.ToastCard}>
                        <Image source={crownImg} style={style.ToastCardImg}/>
                        <Text style={style.ToastCardTxt}>Added Successfully</Text>
                    </View>,
                    {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.TOP,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    }
                );
                navigation.navigate("allGroups", {
                    itemId: id,
                });
            })
            .catch(error => {
                alert(error.response.data);
            });

    };
    if (showModel)
        return (
            <Modal isVisible={showModel} style={style.Model}>
                <View style={{flex: 1}}>
                    <Text style={style.ModelTitle}>
                        Enter security code to join group.
                    </Text>
                    <TextInput
                        placeholder="Enter 4-Digit security code"
                        style={style.ModelInput}
                        keyboardType="number-pad"
                        value={inputText}
                        onChangeText={(val) => setInputText(val)}
                    />
                    <View style={style.ModelBtn}>
                        <TouchableOpacity
                            style={style.ModelBtn1}
                            onPress={() => setShowModel(false)}
                        >
                            <Text style={style.ModelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.ModelBtn2}
                            onPress={() => handleJoinGroupApi()}
                        >
                            <Text style={style.ModelBtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );

    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                margin: 20,
                padding: 25,
                borderWidth: 3,
                borderColor: "whiite",
                borderRadius: 17,
                backgroundColor: colourArray[i % 5],
            }}
            onPress={handleCardClick}
        >
            <Text style={style.cardLeft}>{name}</Text>
            <View style={style.cardRight}>
                <Image source={img}/>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    card: {
        flexDirection: "row",
        margin: 20,
        padding: 25,
        borderWidth: 3,
        borderColor: "whiite",
        borderRadius: 17,
    },
    cardLeft: {
        fontSize: 20,
        width: "90%",
        fontWeight: "500",
    },
    Model: {
        position: "relative",
        backgroundColor: "#13c3f6",
        height: 150,
    },
    ModelTitle: {
        fontSize: 20,
        margin: 30,
    },
    ModelInput: {
        margin: 30,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 20,
        padding: 15,
        fontSize: 20,
    },
    ModelBtn: {
        flexDirection: "row",
        left: 30,
    },
    ModelBtnText: {
        textAlign: "center",
        fontSize: 20,
    },
    ModelBtn1: {
        padding: 20,
        width: 140,
        backgroundColor: "#f85656",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 25,
        justifyContent: "center",
        marginRight: 20,
    },
    ModelBtn2: {
        padding: 20,
        width: 140,
        backgroundColor: "#eff9fa",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 25,
        justifyContent: "center",
        marginRight: 20,
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
export default Card;
