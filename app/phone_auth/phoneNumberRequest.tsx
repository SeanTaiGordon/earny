import React, { useRef, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { phonePrefixes } from "../../constants";
import { View } from "react-native";
import ArrowRepeatIcon from "react-native-bootstrap-icons/icons/arrow-repeat";
import {
	ConfirmationResult,
	getAuth,
	signInWithPhoneNumber,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { gql, useMutation } from "@apollo/client";
import { app } from "../../config";

const SIGNUP = gql`
	mutation Signup(
		$profile: Profile!
		$fullName: String!
		$email: String!
		$dateOfBirth: Date!
		$phone: PhoneNumber!
		$contactPermissions: ContactPermissions!
	) {
		signup(
			profile: $profile
			fullName: $fullName
			email: $email
			dateOfBirth: $dateOfBirth
			phone: $phone
			contactPermissions: $contactPermissions
		)
	}
`;

const PhoneNumberRequest = () => {
	const { emoji, color, name, email, date } = useLocalSearchParams();
	const [signup] = useMutation(SIGNUP);

	const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [areaCode, setAreaCode] = useState<string>(`${phonePrefixes[0].value}`);
	const [verifier, setVerifier] = useState<ConfirmationResult>();
	const [verificationCode, setVerificationCode] = useState<string>("");
	const [inputCodeScreen, setInputCodeScreen] = useState<boolean>(false);
	const [canCallApplicant, setCanCallApplicant] = useState<boolean>(true);
	const [canTextApplicant, setCanTextApplicant] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const handlePhoneNumberSubmit = async () => {
		setLoading(true);
		signup({
			variables: {
				profile: {
					emoji,
					color,
				},
				fullName: name,
				email,
				dateOfBirth: date,
				phone: {
					areaCode: areaCode,
					phoneNumber: phoneNumber,
				},
				contactPermissions: {
					phone: {
						sms: canTextApplicant,
						call: canCallApplicant,
					},
				},
			},
		})
			.then(({ data }) => {
				const { signup: signupSuccess } = data;
				if (!signupSuccess) {
					alert(
						"😢 Signup unsuccessful. An account may already exist for these credentials."
					);
					setLoading(false);
				} else {
					recaptchaSignIn();
				}
			})
			.catch((error) => {
				alert("😢 Signup unsuccessful. Please try again later.");
				setLoading(false);
			});
	};

	const recaptchaSignIn = async () => {
		if (recaptchaVerifier.current) {
			const authentication = getAuth();
			signInWithPhoneNumber(
				authentication,
				`+${areaCode}${phoneNumber}`,
				recaptchaVerifier.current
			)
				.then((confirmationResult) => {
					setVerifier(confirmationResult);
					setInputCodeScreen(true);
					setLoading(false);
				})
				.catch((error) => {
					if (error.code === "auth/too-many-requests") {
						alert("😢 Too many attempts. Please try again later.");
					} else {
						alert("📞 Please enter a valid phone number.");
					}
					setLoading(false);
				});
		}
	};

	const handlePhoneCodeSubmit = async () => {
		setLoading(true);
		try {
			verifier
				?.confirm(verificationCode)
				.then(() => {
					setLoading(false);
					router.replace("preferredRoles");
				})
				.catch(() => {
					alert("Wrong code 😪");
					setLoading(false);
				});
		} catch (err) {
			setLoading(false);
		}
	};

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
							disabled={loading}
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
							onChange={(value) => {
								setAreaCode(`${value.value}`);
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
					<CheckboxContainer>
						<FormCheckboxLabelInput
							label="Text me about my applications"
							defaultTrue
							onChange={setCanTextApplicant}
						/>
						<FormCheckboxLabelInput
							label="Call me about my applications"
							defaultTrue
							onChange={setCanCallApplicant}
						/>
					</CheckboxContainer>
					<MainButton
						text="Send me a text"
						onPress={() => {
							handlePhoneNumberSubmit();
						}}
						disabled={loading}
					/>
					<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={app.options}
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
