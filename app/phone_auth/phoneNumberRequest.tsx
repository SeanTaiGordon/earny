import React from "react";
import {
	FormCheckboxLabelInput,
	FormTextInput,
	KeyboardDismissableView,
	MainButton,
	NavBackButton,
	PaddedContainer,
	ScreenContainer,
	Subtitle,
	Title,
} from "../../components";
import { Dropdown } from "react-native-element-dropdown";
import styled from "styled-components/native";
import { router } from "expo-router";

const data: { label: String; value: String }[] = [
	{ label: "🇮🇪 +353", value: "353" },
	{ label: "🇬🇧 +44", value: "44" },
];

const PhoneNumberRequest = () => (
	<ScreenContainer>
		<KeyboardDismissableView>
			<PaddedContainer>
				<NavBackButton />
				<Title>☎️ What's your phone number </Title>
				<Subtitle>We're helping you keep your account in your hands.</Subtitle>
				<Container>
					<Dropdown
						style={styles.CountryDropdown}
						containerStyle={styles.CountryDropdownContainer}
						data={data}
						labelField="label"
						valueField="value"
						onChange={function ({ label, value }): void {}}
						placeholder={String(data[0].label)}
						fontFamily="Jost_400Regular"
					/>

					<TelInput
						placeholder="Phone number"
						keyboardType="phone-pad"
						autoComplete="tel"
					/>
				</Container>
				<CheckboxContainer>
					<FormCheckboxLabelInput
						label="Email me about my applications"
						defaultTrue
					/>
				</CheckboxContainer>
				<MainButton
					text="Send me a text"
					onPress={() => {
						router.push({
							pathname: "/phone_auth/phoneNumberConfirm",
						});
					}}
				/>
			</PaddedContainer>
		</KeyboardDismissableView>
	</ScreenContainer>
);

const styles = {
	CountryDropdown: {
		fontFamily: "Jost_400Regular",
		width: 110,
		paddingLeft: 20,
	},
	CountryDropdownContainer: {
		borderWidth: 2,
		borderColor: "#8E4DFF",
		borderRadius: 5,
	},
};

const CheckboxContainer = styled.View`
	padding-top: 10px;
	padding-bottom: 30px;
`;

const Container = styled.View`
	gap: 10px;
	flex-direction: row;
	width: 100%;
	margin-top: 50px;
	margin-bottom: 50px;
`;

const TelInput = styled(FormTextInput)`
	flex: 1;
	height: 100%;
	margin-top: 0;
`;
export default PhoneNumberRequest;
