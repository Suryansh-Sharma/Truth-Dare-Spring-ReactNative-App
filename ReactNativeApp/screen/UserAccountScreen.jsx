import axios from 'axios';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../components/Card';
import blackAddButton from "../images/blackAddButton.png";
import maleUser from "../images/maleUser.png";
const UserAccountScreen = ({navigation}) => {
  const [data,setData]=useState([]);
  const [lastSelect,setLastSelect]=useState("");
  const handleButtonClick=(value)=>{
    if(lastSelect===""){
      value==="members"?handleFetchDataApi("members"):handleFetchDataApi("quizes");
      setLastSelect(value);
    }
    else if(value==="members"){
      if(lastSelect===value){
        setData([]);
        setLastSelect("");
      }else{
        handleFetchDataApi("members")
        setLastSelect(value);
      }
    }
    else if(value==="quizes"){
      if(lastSelect===value){
        setData([]);
        setLastSelect("");
      }else{
        handleFetchDataApi("quizes")
        setLastSelect(value);
      }
    }
    else
      alert("Else")
  }
  const handleFetchDataApi=(val)=>{
    let url=``;
    if(val==="members")
      url=`groups`;
    else if(val==="quizes")
      url=`quizzes`;
    axios.get(`http://192.168.0.192:8080/api/user/${url}/suryanshsharma1942@gmail.com`)
    .then(response=>{
      setData(response.data);
      if(response.data.length===0)alert("No data found !!");
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const handleChangePasswordApi=()=>{

  }
  return (
    <View>
      <View style={styles.UserDetailsTopSection}>
        <View>
          <Image source={maleUser}/>
        </View>
        <View style={styles.UserDetailsTopSectionLeft}>
          <Text style={styles.UserDetailsTopSectionText}>Hello , </Text>
          <Text style={styles.UserDetailsTopSectionText2}>Suryansh Sharma.</Text>
        </View>
      </View>
      <View style={styles.UserDetailsMiddle}>
          <TouchableOpacity style={styles.UserDetailsMiddleBtn}
            onPress={()=>handleButtonClick("members")}
          >
            <Text style={{color:'white',top:'3%',margin:2}}>Your Groups</Text>
            <Image source={blackAddButton}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.UserDetailsMiddleBtn2}
            onPress={()=>handleButtonClick("quizes")}
          >
            <Text style={{color:'white',top:'3%',margin:2}}>All Quizes</Text>
            <Image source={blackAddButton}/>
          </TouchableOpacity>
      </View>
      <View >
      {
          data.length!==0?
          <ScrollView style={styles.UserDetailsResultSection}>
            {
              data.map((val,i)=>(
                <Card name={lastSelect==="members"?val.name:val.quizName} 
                i={i} img={""} key={val.id} id={val.id}
                  navigation={navigation} 
                  route={lastSelect==="members"?"Groups":"ViewQuiz"}
                />
              ))
            }
          </ScrollView>
          
            :
            <Text style={{textAlign:'center',fontSize:25
            ,color:'black',fontStyle:'italic'}}>Please select any option.</Text>
        }
      </View>
      <View >
        <TouchableOpacity style={styles.ChangePassword}
          onPress={handleChangePasswordApi}
        >
          <Text style={{color:'white'}}>Change Password.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  UserDetailsTopSection:{
    backgroundColor:'black',
    flexDirection:'row',
    padding:40
  },
  UserDetailsTopSectionLeft:{
    padding:20,
  },
  UserDetailsTopSectionText:{
    color:'white',
    fontSize:20
  },

  UserDetailsTopSectionText2:{
    color:'white',
    fontSize:20
  },
  UserDetailsMiddle:{
    top:'-5%',
    backgroundColor:'white',
    borderUserDetailsTopLeftRadius:30,
    flexDirection:'row',
    padding:30,
  },
  UserDetailsMiddleBtn:{
    top:'20%',
    backgroundColor:'black',
    borderRadius:19,
    padding:10,
    flexDirection:'row'
  },
  UserDetailsMiddleBtn2:{
    top:'20%',
    marginLeft:'25%',
    backgroundColor:'black',
    borderRadius:19,
    padding:10,
    flexDirection:'row'
  },
  UserDetailsResultSection:{
    position:'relative',
    height:'50%'
  },
  ChangePassword:{
    backgroundColor:'black',
    width:'40%',
    borderRadius:20,
    marginLeft:'7 %',
    padding:10
  }
});
export default UserAccountScreen;