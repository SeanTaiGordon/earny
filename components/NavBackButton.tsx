import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import BackButton from "react-native-bootstrap-icons/icons/chevron-left";

const NavBackButton = () => (
	<TouchableOpacity onPress={() => router.back()}>
		<BackButton
			color="#000"
			height="32"
			width="32"
			viewBox="0 0 16 16"
			style={{ flex: 1 }}
		/>
	</TouchableOpacity>
);

export default NavBackButton;
