import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddNewScreen from "./../screens/AddNewScreen";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerNavigator } from "./DrawerNavigator";
import styles from "../styles";
const Stack = createStackNavigator({
	navigationOptions: ({ navigation }) => ({
		headerLeft: () => (
			<TouchableOpacity onPress={() => navigation.openDrawer()}>
				<Icon name={"menu"} size={28} color={"white"} style={{ marginRight: 10 }} />
			</TouchableOpacity>
		),
		navigationOptions: {
			tabBarVisible: false,
		},
	}),
});
/*
const headerView = (navigation) => {
	return (
		<TouchableOpacity style={styles.menuButton} onPress={() => navigation.toggleDrawer()}>
			<FontAwesome5 name="bars" size={24} color="#fff" />
		</TouchableOpacity>
	);
};
*/
export function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: "#009387",
				},
				headerTintColor: "#fff",
			}}
		>
			<Stack.Screen
				name="Home"
				component={DrawerNavigator}
				options={(props) => {
					return {
						navigationOptions: {
							tabBarVisible: false,
						},
						// headerRight: () => (
						// 	<TouchableOpacity style={styles.menuButton} onPress={() => props.navigation.openDrawer()}>
						// 		<FontAwesome5 name="bars" size={24} color="#fff" />
						// 	</TouchableOpacity>
						// ),
					};
				}}
			/>
			<Stack.Screen name="Add new" component={AddNewScreen} />
		</Stack.Navigator>
	);
}
