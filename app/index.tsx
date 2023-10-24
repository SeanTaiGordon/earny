import { Link, Stack, router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Home = () => {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Stack.Screen
				options={{
					title: "My home",
				}}
			/>
			<Text style={{ fontFamily: "DelaGothicOne_400Regular" }}>
				Home Screen
			</Text>
			<Button
				title="Go to Page 1"
				onPress={() => {
					router.push({
						pathname: "page1",
						params: { pageName: "Page 1" },
					});
				}}
			/>
			<Button
				title="Go to Page 2"
				onPress={() => {
					router.push({ pathname: "page2" });
				}}
			/>
		</View>
	);
};

export default Home;
