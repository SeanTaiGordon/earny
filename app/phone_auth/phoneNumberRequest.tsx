import React from "react";
import {
	FormTextInput,
	PaddedContainer,
	ScreenContainer,
	Subtitle,
	Title,
} from "../../components";
import { Dropdown } from "react-native-element-dropdown";
import styled from "styled-components/native";

const data: { label: String; value: String }[] = [
	{ label: "🇬🇧 +44", value: "44" },
	{ label: "🇮🇪 +353", value: "353" },
];

const PhoneNumberRequest = () => (
	<ScreenContainer>
		<PaddedContainer>
			<Title>☎️ What's your phone number </Title>
			<Subtitle>We're helping you keep your account in your hands.</Subtitle>
			<Container>
				<CountryDropdown
					data={data}
					labelField="label"
					valueField="value"
					onChange={function (item: string): void {}}
					placeholder={data[0].label}
					fontFamily="Jost_400Regular"
				/>

				<TelInput
					placeholder="Phone number"
					keyboardType="phone-pad"
					autoComplete="tel"
				/>
			</Container>
		</PaddedContainer>
	</ScreenContainer>
);

const CountryDropdown = styled(Dropdown)`
	border: 2px #8e4dff solid;
	border-radius: 5px;
	font-family: Jost_400Regular;
	width: 110px;
	padding-left: 20px;
`;

const Container = styled.View`
	gap: 10px;
	flex-direction: row;
	width: 100%;
	margin-top: 50px;
`;

const TelInput = styled(FormTextInput)`
	flex: 1;
	height: 100%;
	margin-top: 0;
`;
export default PhoneNumberRequest;
