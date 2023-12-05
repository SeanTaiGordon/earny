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
import { app, auth } from "../../config";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import styled from "styled-components/native";
import { router } from "expo-router";

const data: { label: String; value: String }[] = [
	{ label: "🇮🇪 +353", value: "353" },
	{ label: "🇬🇧 +44", value: "44" },
];

const PhoneNumberRequest = () => {
	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState();
	const [verificationId, setVerificationId] = useState<string>();
	const [verificationCode, setVerificationCode] = useState<string>();
	const [message, showMessage] = useState();
	const handlePhoneNumberSubmit = async () => {
		try {
			const phoneProvider = new PhoneAuthProvider(auth);
			const verificationId = await phoneProvider.verifyPhoneNumber(
				"+447804661333",
				recaptchaVerifier.current
			);
			setVerificationId(verificationId);

			console.log(verificationId);
			router.push({
				pathname: "/phone_login/phoneNumberConfirm",
			});
		} catch (err) {
			alert("Please enter a valid phone number");
		}
	};

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton />
					<Title>☎️ Login with your phone number </Title>
					<Subtitle>We'll send you a login code.</Subtitle>
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
							returnKeyType="done"
						/>
					</Container>
					<MainButton text="Send me a text" onPress={handlePhoneNumberSubmit} />
					<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={app.options}
					/>
				</PaddedContainer>
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
