import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation/RootNavigator";

export default function App(props) {
	return (
		<NavigationContainer>
			<RootNavigator props={props} />
		</NavigationContainer>
	);
}
