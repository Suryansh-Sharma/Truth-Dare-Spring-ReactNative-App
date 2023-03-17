import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Loader from "./components/Loader";
import LoginNavigation from "./navigation/LoginNavigation";
import Navigation from "./navigation/Navigation";
import Context, { TruthDareContext } from "./context/Context";
import * as SecureStore from "expo-secure-store";
import AccountVerification from "./components/AccountVerification";
function App() {
  const [isLoading, setLoading] = useState();
  const { isLogin, setLogin, setUsername, setEmail, setJwt, isVerified ,setIsVerified,baseUrl} =
    useContext(TruthDareContext);
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);
  useEffect(() => {}, [isLoading]);
  const getUserData = async () => {
    let Login = await SecureStore.getItemAsync("isLogin");
    if (Login === "true") {
      let username = await SecureStore.getItemAsync("username");
      let email = await SecureStore.getItemAsync("email");
      const jwtToken = await SecureStore.getItemAsync("jwt");

      let isVerified = await SecureStore.getItemAsync("isVerified");
      setEmail(email);
      setJwt(jwtToken);
      setUsername(username);
      setLogin(true);
      if(isVerified==="true")
        setIsVerified(true);
      else 
        setIsVerified(false);
    } 
    else{ 
      setLogin(false);
    }
    setLoading(false);
  };
  if (isLoading) return <Loader></Loader>;
  if(!isVerified && isLogin)return <AccountVerification/>
  return (
    // <AccountVerification/>
    <RootSiblingParent>
      <NavigationContainer independent={true}>
        {isLogin === true ? <Navigation /> : <LoginNavigation />}
      </NavigationContainer>
    </RootSiblingParent>
  );
}
export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
