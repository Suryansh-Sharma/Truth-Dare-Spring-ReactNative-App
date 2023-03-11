import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from '../components/Card';
import Loader from '../components/Loader'
import blackAddButton from "../images/blackAddButton.png";
import forwardIcon2 from "../images/forwardIcon2.png";

const GroupDetails = ({route, navigation}) => {
    const {itemId} = route.params;
    const [data, setData] = useState(null);
    const [isPageLoading, setIsLoading] = useState(true);
    const [lastSelect, setLastSelect] = useState("");
    const handleButtonClick = (value) => {
        if (lastSelect === "") {
            value === "members" ? handleApi("members") : handleApi("quizes");
            setLastSelect(value);
        } else if (value === "members") {
            if (lastSelect === value) {
                setData(null);
                setLastSelect("");
            } else {
                handleApi("members")
                setLastSelect(value);
            }
        } else if (value === "quizes") {
            if (lastSelect === value) {
                setData(null);
                setLastSelect("");
            } else {
                handleApi("quizes")
                setLastSelect(value);
            }
        } else
            alert("Else")
    }
    const [groupData, setgroupData] = useState(
        {
            "id": 1,
            "name": "",
            "createdOn": "",
            "code": 0
        }
    );
    useEffect(() => {
        axios.get(`http://192.168.0.192:8080/api/group/getById/${itemId}`)
            .then(function (response) {
                setgroupData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        setIsLoading(false);
    }, []);

    if (isPageLoading) return <Loader></Loader>


    const handleApi = (type) => {
        setIsLoading(true);
        if (type === "RefreshCode") {
            axios.post(`http://192.168.0.192:8080/api/group/changeGroupCode/${itemId}`)
                .then(response => {
                    setgroupData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            let url = ""
            if (type === "members")
                url = "getUsers"
            else
                url = "getQuizzes"
            axios.get(`http://192.168.0.192:8080/api/group/${url}/${itemId}`)
                .then(function (response) {
                    setData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    return (
        <View style={style.GroupDetails}>
            {/* Top Section */}
            <View style={style.GroupDetailsTop}>
                <Text style={style.GroupDetailsHeading}>GROUP PAGE</Text>
                <Text style={style.GroupDetailsTitle}>{groupData.name}</Text>
                <Text style={style.GroupDetailsTopDetails}>Created on: {groupData.createdOn}.</Text>
                <Text style={style.GroupDetailsTopDetails}>Group Join Code: {groupData.code}</Text>
                <Text onPress={() => handleApi("RefreshCode")} style={style.GroupDetailsTopDetails}>Refresh Group join
                    code</Text>
            </View>
            {/* Middle Section */}
            <View style={style.GroupDetailsMiddle}>
                <TouchableOpacity style={style.GroupDetailsMiddleBtn}
                                  onPress={() => handleButtonClick("members")}
                >
                    <Text style={{color: 'white', top: '3%', margin: 2}}
                    >Members</Text>
                    <Image source={blackAddButton}/>
                </TouchableOpacity>
                <TouchableOpacity style={style.GroupDetailsMiddleBtn2}
                                  onPress={() => handleButtonClick("quizes")}
                >
                    <Text style={{color: 'white', top: '3%', margin: 2}}>All Quizes</Text>
                    <Image source={blackAddButton}/>
                </TouchableOpacity>
            </View>
            {/* Bottom Section */}
            <View style={style.GroupDetailsBottom}>
                {
                    data !== null ?
                        <ScrollView>
                            {
                                data.map((val, i) => (
                                    <Card name={lastSelect === "members" ? val.username : val.quizName}

                                          i={i} img={lastSelect === "members" ? "" : forwardIcon2} key={val.id}
                                          id={val.id}

                                          route={lastSelect !== "members" ? "ViewQuiz" : ""} navigation={navigation}
                                    />
                                ))
                            }
                        </ScrollView>

                        :
                        <Text style={{
                            textAlign: 'center', fontSize: 25
                            , color: 'black', fontStyle: 'italic'
                        }}>Please select any option.</Text>
                }
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    GroupDetails: {
        height: '100%'
    },

    GroupDetailsTop: {
        backgroundColor: 'black',
        height: '30%',
    },
    GroupDetailsHeading: {
        top: '15%',
        color: 'white',
        textAlign: 'center'
    },
    GroupDetailsTitle: {
        top: "20%",
        color: 'white',
        fontSize: 30,
        left: '4%',
        fontStyle: 'italic'
    },
    GroupDetailsTopDetails: {
        top: "23%",
        color: 'white',
        left: '4%',
        opacity: 0.6
    },
    GroupDetailsMiddle: {
        top: '-5%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        padding: 30,
    },
    GroupDetailsMiddleBtn: {
        top: '20%',
        backgroundColor: 'black',
        borderRadius: 19,
        padding: 10,
        flexDirection: 'row'
    },
    GroupDetailsMiddleBtn2: {
        top: '20%',
        marginLeft: '25%',
        backgroundColor: 'black',
        borderRadius: 19,
        padding: 10,
        flexDirection: 'row'
    },
    GroupDetailsBottom: {
        height: '58%'
    }
});
export default GroupDetails