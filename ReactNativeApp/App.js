import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigation from "./navigation/Navigation";
export default function App() {
  return (
    // <AccountVerification/>
    <RootSiblingParent>
      <NavigationContainer independent={true}>
        <Navigation />
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
