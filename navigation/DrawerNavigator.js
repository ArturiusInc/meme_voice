import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./../screens/HomeScreen";
import AddNewScreen from "./../screens/AddNewScreen";
import DrawerContent from "./../screens/AddNewScreen";

const Drawer = createDrawerNavigator();

export function DrawerNavigator({ navigation }) {
	return (
		<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
			<Drawer.Screen name="Meme voice" component={HomeScreen} />
			<Drawer.Screen name="Add new" component={AddNewScreen} />
		</Drawer.Navigator>
	);
}
