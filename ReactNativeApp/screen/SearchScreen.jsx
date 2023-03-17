import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useContext, useState} from "react";
import searchIcon from "../images/searchIcon2.png";
import Card from "../components/Card";
import Loader from "../components/Loader";
import axios from "axios";
import { TruthDareContext } from "../context/Context";

const SearchScreen = ({navigation}) => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [isLoading, setLoading] = useState(false);
    const {jwt,baseUrl} = useContext(TruthDareContext);
    const handleSearchOption = () => {
        if (search === "") return setData(null);
        setLoading(true);
        axios.get(`${baseUrl}/api/group/getForNavSearch/${search}`,
        {
            headers:{
                Authorization: `Bearer `+jwt,
            }
        })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    };
    if (isLoading) return <Loader></Loader>
    return (
        <View style={style.searchScreen}>
            <View style={style.searchScreenTop}>
                <Text style={style.searchScreenHeading}>GROUP SEARCH PAGE</Text>
                <Text style={{textAlign: "center", color: "white"}}>
                    Search groups here.
                </Text>
            </View>
            <View style={style.searchScreenMiddle}>
                <View style={style.searchScreenMiddleTop}>
                    <TextInput
                        style={style.searchScreenInput}
                        placeholder="Enter group name here."
                        value={search}
                        onChangeText={val => setSearch(val)}
                    />
                    <TouchableOpacity onPress={() => handleSearchOption()}>
                        <Image
                            source={searchIcon}
                            style={{left: "45%", right: "45%", top: "-15%"}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={style.searchScreenMiddleResult}>
                    <ScrollView>
                        {data !== null ? (
                            data.map((group, i) => (
                                <Card
                                    key={group.id}
                                    name={group.name}
                                    id={group.id}
                                    i={i}
                                    route={"JoinGroup"}
                                />
                            ))
                        ) : (
                            <Text style={{textAlign: "center"}}>THE RESULT IS EMPTY.</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
    searchScreen: {
        backgroundColor: "#3d287c",
        height: "100%",
    },
    searchScreenTop: {
        backgroundColor: "#5600ff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    searchScreenHeading: {
        color: "white",
        textAlign: "center",
        marginTop: "15%",
        height: "15%",
        fontSize: 22,
    },
    searchScreenMiddle: {
        top: "-4%",
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "#fbfbfb",
        borderRadius: 10,
        height: "100%",
    },
    searchScreenInput: {
        margin: "10%",
        backgroundColor: "#e9e9e9",
        borderRadius: 20,
        height: 50,
        color: "black",
        padding: 10,
    },
    searchScreenMiddleTop: {},
    searchScreenMiddleResult: {
        height: "40%",
    },
});
export default SearchScreen;
