import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import accountIcon from "../images/accountIcon.png";
import addIcon from "../images/addIcon.png";
import homeIcon from "../images/homeIcon.png";
import reverseIcon from "../images/reverseIcon.png";
import searchIcon from "../images/searchIcon.png";
import CreateQuizScreen from "./CreateQuizScreen";
import HomeScreen from "./HomeScreen";
import PreviousQuizScreen from "./PreviousQuizScreen";
import SearchScreen from "./SearchScreen";
import UserAccountScreen from "./UserAccountScreen";
const Tab = createBottomTabNavigator();
function Tabs() {
  const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
});
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#e0dbff",
          width: "90%",
          left: "5%",
          height: "8%",
          marginBottom: "1.5%",
          borderRadius: 25,
          shadowColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image source={homeIcon} style={{ height: "80%", width: "80%" }} />
          ),
          unmountOnBlur:true
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image
              source={searchIcon}
              // style={{ height: "50%", width: "20%" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Image
              source={addIcon}
              style={{
                position: "absolute",
                bottom: 0, // space from bottombar
                height: "180%",
                width: 80,
                // borderRadius: 68,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Image>
          ),
          tabBarStyle:{
            display:'none'
          }
        }}
        component={CreateQuizScreen}
      />
      <Tab.Screen
        name="previous"
        component={PreviousQuizScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image
              source={reverseIcon}
              // style={{ height: "50%", width: "20%" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={UserAccountScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image
              source={accountIcon}
              style={{ height: "50%", width: "20%" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Tabs;
