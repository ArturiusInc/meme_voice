import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	item: { alignItems: "center", flexShrink: 1, marginBottom: 10 },
	image: { width: 160, height: 100, resizeMode: "cover" },
	text: {
		maxWidth: 160,
		position: "absolute",
		bottom: 0,
		color: "#fff",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		padding: 4,
		opacity: 0.7,
	},
});
