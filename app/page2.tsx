import { Stack, router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Page = () => {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Stack.Screen
				options={{
					title: "Page 2",
				}}
			/>
			<Text>Page 2</Text>
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
				title="Go back"
				onPress={() => {
					router.back();
				}}
			/>
		</View>
	);
};

export default Page;
