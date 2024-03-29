import React, { useRef, useState } from "react";
import {
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
import { app } from "../../config";
import {
	ConfirmationResult,
	getAuth,
	signInWithPhoneNumber,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import styled from "styled-components/native";
import ArrowRepeatIcon from "react-native-bootstrap-icons/icons/arrow-repeat";
import { router } from "expo-router";
import { View } from "react-native";
import { phonePrefixes } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PhoneNumberRequest = () => {
	const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [areaCode, setAreaCode] = useState<string>(
		`+${phonePrefixes[0].value}`
	);
	const [verifier, setVerifier] = useState<ConfirmationResult>();
	const [verificationCode, setVerificationCode] = useState<string>("");
	const [inputCodeScreen, setInputCodeScreen] = useState<boolean>(false);
	const handlePhoneNumberSubmit = async () => {
		if (recaptchaVerifier.current) {
			const authentication = getAuth();
			signInWithPhoneNumber(
				authentication,
				`${areaCode}${phoneNumber}`,
				recaptchaVerifier.current
			)
				.then((confirmationResult) => {
					setVerifier(confirmationResult);
					setInputCodeScreen(true);
				})
				.catch((error) => {
					if (error.code === "auth/too-many-requests") {
						alert("😢 Too many attempts. Please try again later.");
					} else {
						alert("📞 Please enter a valid phone number.");
					}
				});
		}
	};

	const handlePhoneCodeSubmit = async () => {
		try {
			verifier
				?.confirm(verificationCode)
				.then((result) => {
					router.push({
						pathname: "",
					});
				})
				.catch(() => {
					alert("Wrong code 😪");
				});
		} catch (err) {}
	};

	return inputCodeScreen ? (
		<ScreenContainer>
			<KeyboardDismissableView>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<PaddedContainer>
						<NavBackButton onPress={() => setInputCodeScreen(false)} />
						<Title>☎️ Check your phone </Title>
						<Subtitle>We just texted you a confirmation code.</Subtitle>

						<View>
							<FormTextInput
								placeholder="Confirmation code"
								autoComplete="one-time-code"
								onChangeText={setVerificationCode}
							/>

							<RefreshButtonContainer
								onPressOut={() => setInputCodeScreen(false)}
							>
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
									handlePhoneCodeSubmit();
								}}
							/>
						</MainButtonContainer>
					</PaddedContainer>
				</KeyboardAwareScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	) : (
		<ScreenContainer>
			<KeyboardDismissableView>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<PaddedContainer>
						<NavBackButton />
						<Title>☎️ Login with your phone number </Title>
						<Subtitle>We'll send you a login code.</Subtitle>
						<Container>
							<Dropdown
								style={styles.CountryDropdown}
								containerStyle={styles.CountryDropdownContainer}
								data={phonePrefixes}
								labelField="label"
								valueField="value"
								onChange={(value) => {
									setAreaCode(`+${value.value}`);
								}}
								placeholder={String(phonePrefixes[0].label)}
								fontFamily="Jost_400Regular"
							/>

							<TelInput
								placeholder="Phone number"
								keyboardType="phone-pad"
								autoComplete="tel"
								returnKeyType="done"
								onChangeText={setPhoneNumber}
							/>
						</Container>
						<MainButton
							text="Send me a text"
							onPress={handlePhoneNumberSubmit}
						/>
						<FirebaseRecaptchaVerifierModal
							ref={recaptchaVerifier}
							firebaseConfig={app.options}
						/>
					</PaddedContainer>
				</KeyboardAwareScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

export default PhoneNumberRequest;

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

const MainButtonContainer = styled.View`
	padding-top: 30px;
`;
