import "react-native-gesture-handler";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import AddNewScreen from "./screens/AddNewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

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
};

const customHeaderElements = (nav) => ({
	headerRight: () => (
		<TouchableOpacity style={styles.menuButton} onPress={() => nav.openDrawer()}>
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
			<Drawer.Navigator
				initialRouteName="HomeScreen"
				/*drawerContent={(props) => <DrawerContent {...props} />}*/
			>
				<Drawer.Screen name="Home" component={StackNavigatorHome} />
				<Drawer.Screen name="Add new" component={StackNavigatorAdd} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
