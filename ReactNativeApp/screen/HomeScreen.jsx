import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Card from "../components/Card";
import Loader from "../components/Loader";
import forwardIcon from "../images/forwardIcon.png";
import forwardIcon2 from "../images/forwardIcon2.png";
import maleUser from "../images/maleUser.png";
import {TruthDareContext} from "../context/Context";

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState(null);
    const [lastSelect, setLastSelect] = useState("");
    const [isPageLoading, setIsLoading] = useState(false);
    const {username, email,jwt,baseUrl} = useContext(TruthDareContext);
    useEffect(() => {
    }, [])
    const handleTopCardClick = (value) => {
        if (lastSelect === "") {
            value === "groups" ? handleApi("groups") : handleApi("quizes");
            setLastSelect(value);
        } else if (value === "groups") {
            if (lastSelect === value) {
                setData(null);
                setLastSelect("");
            } else {
                handleApi("groups");
                setLastSelect(value);
            }
        } else if (value === "quizes") {
            if (lastSelect === value) {
                setData(null);
                setLastSelect("");
            } else {
                handleApi("quizes");
                setLastSelect(value);
            }
        }
    };
    const handleApi = async (type) => {
        setIsLoading(true);
        let url = ``;
        if (type === "groups") url = `user/groups/${email}`;
        else url = `user/getTopResults/${email}`;

        axios
            .get(`${baseUrl}/api/${url}`
            ,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            })
            .then(function (response) {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    if (isPageLoading) return <Loader></Loader>;
    return (
        <View style={style.HomeScreen}>
            <View style={style.HomeScreenTop}>
                <View style={style.HomeScreenUserInfo}>
                    <Image source={maleUser}/>
                    <Text style={style.HomeScreenUsername}>
                        Welcome back {username}
                    </Text>
                </View>
            </View>
            <View style={style.HomeScreenMiddle}>
                <TouchableOpacity
                    style={style.HomeScreenMiddleCard1}
                    onPress={() => handleTopCardClick("groups")}
                >
                    <Text style={{left: "10%", color: "white", fontSize: 20}}>
                        Your
                    </Text>
                    <Text style={{left: "10%", color: "white", fontSize: 28}}>
                        Groups
                    </Text>
                    <Image
                        source={forwardIcon}
                        style={{
                            justifyContent: "center",
                            left: "10%",
                            top: "8%",
                            borderRadius: 5,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.HomeScreenMiddleCard2}
                    onPress={() => handleTopCardClick("quizes")}
                >
                    <Text style={{left: "10%", color: "white", fontSize: 20}}>
                        Your Best
                    </Text>
                    <Text style={{left: "10%", color: "white", fontSize: 28}}>
                        Result's
                    </Text>
                    <Image
                        source={forwardIcon2}
                        style={{
                            justifyContent: "center",
                            left: "10%",
                            top: "8%",
                            borderRadius: 5,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={style.HomeScreenBottom}>
                {data !== null ? (
                    <ScrollView>
                        {data.map((val, i) => (
                            <Card
                                name={lastSelect === "groups" ? val.name : "Result " + val.id}
                                i={i}
                                img={forwardIcon2}
                                key={val.id}
                                id={lastSelect === "groups" ? val.id : val.quizId}
                                navigation={navigation}
                                route={lastSelect === "groups" ? "Groups" : "ViewQuiz"}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 25,
                            color: "white",
                            fontStyle: "italic",
                        }}
                    >
                        Please select any option.
                    </Text>
                )}
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    HomeScreen: {
        backgroundColor: "#4792ff",
        height: "100%",
    },
    HomeScreenTop: {
        // top:'1%',
        height: "30%",
        backgroundColor: "#495dde",
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    HomeScreenUserInfo: {
        flexDirection: "row",
        top: "10%",
        left: "5%",
        color: "white",
        width: "70%",
    },
    HomeScreenUsername: {
        top: "5%",
        color: "white",
        fontSize: 30,
    },
    HomeScreenMiddle: {
        flexDirection: "row",
        left: "5%",
    },
    HomeScreenMiddleCard1: {
        left: "3%",
        top: "-10%",
        backgroundColor: "#ff5d71",
        height: "138%",
        width: "30%",
        borderRadius: 10,
    },
    HomeScreenMiddleCard2: {
        top: "-10%",
        left: "70%",
        backgroundColor: "#726cfd",
        height: "138%",
        width: "30%",
        borderRadius: 10,
    },
    HomeScreenBottom: {
        marginTop: 10,
        height: "45%",
    },
});
export default HomeScreen;
