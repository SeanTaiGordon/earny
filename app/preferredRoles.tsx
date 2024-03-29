import React, { useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { gql, useMutation } from "@apollo/client";

const SET_PREFERRED_ROLES = gql`
	mutation Mutation($customerSlider: Int!, $availableHoursPerWeek: Int!) {
		setSliders(
			customerSlider: $customerSlider
			availableHoursPerWeek: $availableHoursPerWeek
		)
	}
`;

const PreferredRoles = () => {
	const { initialHoursSliderValue, initialCustomerFacingSliderValue } =
		useLocalSearchParams();
	const [hoursSliderValue, setHoursSliderValue] = useState<number>(0);
	const [customerFacingSliderValue, setCustomerFacingSliderValue] =
		useState<number>(0);
	const [setSliders] = useMutation(SET_PREFERRED_ROLES);

	function nearestValue(value: number) {
		if (value <= 25) {
			return 0;
		} else if (value <= 75) {
			return 50;
		} else {
			return 100;
		}
	}

	const handleSubmitPreferredRoles = async () => {
		await setSliders({
			variables: {
				customerSlider: parseInt(customerFacingSliderValue.toString()),
				availableHoursPerWeek: parseInt((hoursSliderValue / 2).toFixed(0)),
			},
		});

		initialCustomerFacingSliderValue ? router.back() : router.replace("");
	};

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton />
					<Title>🕵️ Preferred roles</Title>
					<Subtitle>
						We'll help you find roles closer to what you prefer.
					</Subtitle>

					<Container>
						<Subtitle>
							I have time to work{" "}
							<Bold>{(hoursSliderValue / 2).toFixed(0)}</Bold> hours a week
						</Subtitle>

						<Slider
							onValueChange={(value) => {
								setHoursSliderValue(value);
							}}
							numIntervals={1}
							defaultInterval={1}
							initialValue={
								initialHoursSliderValue
									? parseInt(initialHoursSliderValue.toString()) * 2
									: 50
							}
						/>
					</Container>

					<Container>
						<Subtitle>
							{
								{
									0: (
										<>
											I'm <Bold>not fond</Bold> of customer facing roles
										</>
									),
									50: (
										<>
											I'm <Bold>indifferent</Bold> to customer facing roles
										</>
									),
									100: (
										<>
											I <Bold>enjoy</Bold> customer facing roles
										</>
									),
								}[nearestValue(customerFacingSliderValue)]
							}
						</Subtitle>

						<Slider
							onValueChange={(value) => {
								setCustomerFacingSliderValue(value);
							}}
							numIntervals={2}
							defaultInterval={1}
							initialValue={
								initialCustomerFacingSliderValue
									? parseInt(initialCustomerFacingSliderValue.toString())
									: 50
							}
						/>
					</Container>
					<MainButtonContainer>
						<MainButton
							text="Next"
							onPress={() => handleSubmitPreferredRoles()}
						/>
					</MainButtonContainer>
				</PaddedContainer>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};
const MainButtonContainer = styled.View`
	padding-top: 90px;
`;

const Bold = styled.Text`
	font-family: Jost_500Medium;
`;

const Container = styled.View`
	margin-top: 30px;
`;

export default PreferredRoles;
