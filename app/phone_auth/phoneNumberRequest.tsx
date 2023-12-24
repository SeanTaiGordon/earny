import React, { useState } from "react";
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
import { phonePrefixes } from "../../constants";
import { View } from "react-native";
import ArrowRepeatIcon from "react-native-bootstrap-icons/icons/arrow-repeat";

const PhoneNumberRequest = () => {
	const [inputCodeScreen, setInputCodeScreen] = useState<boolean>(false);
	// Create account using phone number and verify it when send me a text is pressed
	return inputCodeScreen ? (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton onPress={() => setInputCodeScreen(false)} />
					<Title>☎️ Check your phone </Title>
					<Subtitle>We just texted you a confirmation code.</Subtitle>

					<View>
						<FormTextInput
							placeholder="Confirmation code"
							autoComplete="one-time-code"
						/>

						<RefreshButtonContainer>
							<ArrowRepeatIcon
								color="#000"
								height="21"
								width="21"
								viewBox="0 0 16 16"
								style={{ flex: 1 }}
							/>
							<ButtonText>Request new code</ButtonText>
						</RefreshButtonContainer>
					</View>

					<MainButtonContainer>
						<MainButton
							text="Confirm"
							onPress={() => {
								router.replace("preferredRoles");
							}}
						/>
					</MainButtonContainer>
				</PaddedContainer>
			</KeyboardDismissableView>
		</ScreenContainer>
	) : (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton />
					<Title>☎️ What's your phone number </Title>
					<Subtitle>
						We're helping you keep your account in your hands.
					</Subtitle>
					<Container>
						<Dropdown
							style={styles.CountryDropdown}
							containerStyle={styles.CountryDropdownContainer}
							data={phonePrefixes}
							labelField="label"
							valueField="value"
							onChange={function ({ label, value }): void {}}
							placeholder={String(phonePrefixes[0].label)}
							fontFamily="Jost_400Regular"
						/>

						<TelInput
							placeholder="Phone number"
							keyboardType="phone-pad"
							autoComplete="tel"
							returnKeyType="done"
						/>
					</Container>
					<CheckboxContainer>
						<FormCheckboxLabelInput
							label="Text me about my applications"
							defaultTrue
						/>
						<FormCheckboxLabelInput
							label="Call me about my applications"
							defaultTrue
						/>
					</CheckboxContainer>
					<MainButton
						text="Send me a text"
						onPress={() => {
							setInputCodeScreen(true);
						}}
					/>
				</PaddedContainer>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

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
	color: #676767;
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

const MainButtonContainer = styled.View`
	padding-top: 30px;
`;

const RefreshButtonContainer = styled.TouchableOpacity`
	margin-top: 10px;
	display: flex;
	padding: 14px 18px;
	flex-direction: row;
	gap: 17px;
	border-radius: 10px;
	background: #eaeaea;
	align-self: center;
`;

const ButtonText = styled.Text`
	color: #000;
	font-family: Jost_400Regular;
	font-size: 17px;
	font-weight: 500;
	align-self: center;
`;

export default PhoneNumberRequest;
