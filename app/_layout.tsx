import React from "react";
import {
	useFonts,
	DelaGothicOne_400Regular,
} from "@expo-google-fonts/dela-gothic-one";
import { Jost_400Regular } from "@expo-google-fonts/jost";

import { Stack } from "expo-router";

const Layout = () => {
	let [fontsLoaded] = useFonts({
		DelaGothicOne_400Regular,
		Jost_400Regular,
	});

	if (!fontsLoaded) {
		return null;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
};

export default Layout;
