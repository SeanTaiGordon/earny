import React, { useState } from "react";
import { Text } from "react-native";
import {
	KeyboardDismissableView,
	MainButton,
	NavBackButton,
	PaddedContainer,
	ScreenContainer,
	Slider,
	Subtitle,
	Title,
} from "../components";
import styled from "styled-components/native";
import { router } from "expo-router";
import { View } from "react-native";

const PreferredRoles = () => {
	const [sliderValue, setSliderValue] = useState<number>(0);

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton />
					<Title>🕵️ Preferred roles</Title>
					<Subtitle>
						We'll help you find roles closer to what you prefer.
					</Subtitle>

					<Subtitle>
						I have time to work <Bold>{(sliderValue * 0.5).toFixed(0)}</Bold>{" "}
						hours a week
					</Subtitle>

					<View>
						<Slider
							onValueChange={(value) => {
								setSliderValue(value);
							}}
							numIntervals={50}
						/>
					</View>

					<MainButtonContainer>
						<MainButton
							text="Next"
							onPress={() => {
								router.push({
									pathname: "page2",
								});
							}}
						/>
					</MainButtonContainer>
				</PaddedContainer>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};
const MainButtonContainer = styled.View`
	padding-top: 30px;
`;

const Bold = styled.Text`
	font-family: Jost_500Medium;
`;

export default PreferredRoles;
