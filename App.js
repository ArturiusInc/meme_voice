import "react-native-gesture-handler";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import AddNewScreen from "./screens/AddNewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
//import DrawerContent from "./components/header";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screensHeaderOprions = {
	headerStyle: {
		backgroundColor: "#f4511e",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "bold",
	},
	headerLeft: () => (
		<Image style={{ resizeMode: "cover", width: 45, height: 45 }} source={require("./assets/logo.png")} />
	),
};

const customHeaderElements = (navigation) => ({
	headerRight: () => (
		<TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
			<FontAwesome5 name="bars" size={24} color="#fff" />
		</TouchableOpacity>
	),
});

const StackNavigatorHome = ({ navigation }) => (
	<Stack.Navigator screenOptions={screensHeaderOprions}>
		<Stack.Screen name="Home" component={HomeScreen} options={customHeaderElements(navigation)} />
		<Stack.Screen name="Add new" component={AddNewScreen} options={customHeaderElements(navigation)} />
	</Stack.Navigator>
);

const StackNavigatorAdd = ({ navigation }) => (
	<Stack.Navigator initialRouteName="AddNewScreen" screenOptions={screensHeaderOprions}>
		<Stack.Screen name="Add new" component={AddNewScreen} options={customHeaderElements(navigation)} />
	</Stack.Navigator>
);

export default function App(props) {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="HomeScreen" /* drawerContent={(props) => <DrawerContent {...props} />}*/>
				<Drawer.Screen name="Home" component={StackNavigatorHome} />
				<Drawer.Screen name="Add new" component={StackNavigatorAdd} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
