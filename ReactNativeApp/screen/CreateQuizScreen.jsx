import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Loader from "../components/Loader";
import Toast from "react-native-root-toast";
import crownImg from "../images/crown.png";
import {TruthDareContext} from "../context/Context";

const CreateQuizScreen = ({navigation}) => {
    const [data, setData] = useState({
        groupName: "",
        quizName: "",
        noOfQuestion: 0,
        showResult: false,
    });
    const [name, setName] = useState([]);
    const [isGroupPresent, setGroupPresent] = useState(true);
    const [userGroups, setGroups] = useState([]);
    const [loading, isLoading] = useState(false);
    const {email,jwt,baseUrl} = useContext(TruthDareContext);
    const handleNavigation = () => {
        if (data.groupName === "") return alert("Group Can't be empty");
        if (!isGroupPresent) return handleCreateGroup();
        if (data.quizName === "") return alert("Quiz name can't be empty");
        if (data.noOfQuestion === 0 || data.noOfQuestion > 10)
            return alert("Enter no of Questions from 1-10 range");

        navigation.navigate("Quiz", {
            noOfQuestion: data.noOfQuestion,
            quizName: data.quizName,
            showResult: data.showResult,
            groupName: data.groupName,
        });
    };
    const handleCreateGroup = async () => {
        axios
            .post(`${baseUrl}/api/group/addNewGroup/${data.groupName}/${email}`,{},{
                headers:{
                    Authorization: `Bearer `+jwt,
                }
            })
            .then(() => {
                let toast = Toast.show(
                    <View style={styles.ToastCard}>
                        <Image source={crownImg} style={styles.ToastCardImg}/>
                        <Text style={styles.ToastCardTxt}>Group Added Successfully</Text>
                    </View>,
                    {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.TOP,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    }
                );
                setGroupPresent(true);
            })
            .catch((error) => {
                console.log(error);
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
            });
    };
    const handleSearchApi = (search) => {
        if (search === "") {
            setName([]);

        } else {
            setGroupPresent(false);
            let filterData = userGroups.filter((item) => {
                const searchItem = search.toLowerCase();
                const currItem = item.name.toLowerCase();
                return searchItem && currItem.includes(searchItem);
            });
            setName(filterData);
        }
    };
    useEffect(() => {
        isLoading(true);
        loadNavData();
        isLoading(false);
    }, []);
    const loadNavData = async () => {
        axios.get(`${baseUrl}/api/user/groups/${email}`
        ,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            })
            .then(response => {
                setGroups(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    if (loading) return <Loader></Loader>;
    return (
        <View>
            <View style={styles.SearchGroup}>
                <Text>
                    Don't select any option for creating new group. Leave name only
                </Text>
                <TextInput
                    style={styles.SearchGroupInput}
                    placeholder={"Search Group. Here"}
                    value={data.groupName}
                    onChangeText={(text) => {
                        setData({...data, groupName: text});
                        handleSearchApi(text);
                    }}
                />
                <ScrollView style={styles.SearchResultSection}>
                    <TouchableOpacity>
                        {name.length > 0
                            ? name.map((val) => (
                                <Text
                                    style={styles.SearchResult}
                                    key={val.id}
                                    onPress={() => {
                                        setData({...data, groupName: val.name});
                                        setGroupPresent(true);
                                        setName([]);
                                    }}
                                >
                                    {val.name}
                                </Text>
                            ))
                            : null}
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.CreateQuizBottomSec}>
                <View style={styles.SelectNoOfQuestion}>
                    <Text>Enter the name of quiz.</Text>
                    <TextInput
                        style={styles.QuizNameInput}
                        onChangeText={(text) => setData({...data, quizName: text})}
                    />
                    <Text>Enter no of Question's </Text>
                    <TextInput
                        keyboardType="number-pad"
                        style={styles.SetNoOfQuestion}
                        value={data.noOfQuestion}
                        onChangeText={(text) => setData({...data, noOfQuestion: text})}
                    />
                    <Text>Show result to all.</Text>
                </View>
                <Switch
                    value={data.showResult}
                    style={{flexDirection: "row", alignItems: "center"}}
                    onChange={() => {
                        if (data.showResult) setData({...data, showResult: false});
                        else setData({...data, showResult: true});
                    }}
                />
                <TouchableOpacity
                    style={styles.CreateQuizBtn}
                    onPress={handleNavigation}
                >
                    <Text>{isGroupPresent ? "Create Quiz." : "Create Group"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    SearchGroup: {
        top: "20%",
        flexDirection: "column",
        height: 250,
        left: "10%",
        width: "80%",
    },
    SearchGroupInput: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        fontSize: 20,
    },
    SearchResultSection: {},
    SearchResult: {
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    SelectNoOfQuestion: {
        // position:'absolute',
        left: "10%",
        marginTop: 100,
    },
    QuizNameInput: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        fontSize: 20,
        width: "80%",
    },
    SetNoOfQuestion: {
        marginTop: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        fontSize: 20,
        width: 50,
        borderRadius: 10,
    },
    CreateQuizBtn: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        padding: 10,
        width: 120,
        marginTop: 30,
        left: "10%",
    },
    CreateQuizBottomSec: {
        marginTop: 100,
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
export default CreateQuizScreen;
