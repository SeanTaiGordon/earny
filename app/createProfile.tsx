import React, { useEffect, useState } from "react";
import {
	FormTextInput,
	KeyboardDismissableView,
	PaddedContainer,
	ScreenContainer,
	Title,
	ColorScrollSelector,
	EmojiScrollSelector,
	MainButton,
} from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { DatePicker } from "../components/DatePicker";
import { router } from "expo-router";

export const CreateProfile = () => {
	const [selectedColor, setSelectedColor] = useState<string>("#d9d9d9");
	const [selectedIcon, setSelectedIcon] = useState<string>("🧑‍💻");
	const [date, setDate] = useState<Date>();
	const [name, onChangeName] = useState<string>("");
	const [email, onChangeEmail] = useState<string>("");
	const [formValidated, setFormValidate] = useState<boolean>(false);

	const submit = ({
		name,
		email,
		date,
	}: {
		name: string;
		email: string;
		date: string | undefined;
	}) => {
		router.push({
			pathname: "/phone_auth/phoneNumberRequest",
			params: { emoji: selectedIcon, color: selectedColor, name, email, date },
		});
	};

	const addReferral = ({
		name,
		email,
		date,
	}: {
		name: string;
		email: string;
		date: string | undefined;
	}) => {
		router.push({
			pathname: "/addReferralCode",
			params: { emoji: selectedIcon, color: selectedColor, name, email, date },
		});
	};

	useEffect(() => {
		// Update form validation
		if (name.length > 1 && email.length > 1 && date) {
			setFormValidate(true);
		} else {
			setFormValidate(false);
		}
	}, [name, email, date]);

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
					<PaddedContainer>
						<Title>📝 Let’s create your profile</Title>
						<EmojiScrollSelector
							selectorColor={selectedColor as string}
							getSelectedIcon={selectedIcon}
							onIconSelect={setSelectedIcon}
							getColor={selectedColor}
						/>
						<ColorScrollSelector
							onColorChange={setSelectedColor}
							getColor={selectedColor}
							getSelectedIcon={selectedIcon}
						/>
						<FormTextInput
							placeholder="Full name*"
							autoComplete="name"
							inputMode="text"
							onChangeText={(text) => onChangeName(text)}
							value={name}
						/>
						<DatePicker getDate={(date) => setDate(date)} />
						<FormTextInput
							placeholder="Email*"
							autoComplete="email"
							inputMode="email"
							keyboardType="email-address"
							onChangeText={(text) => onChangeEmail(text)}
							value={email}
						/>
						<ReferralButton
							onPress={() => {
								if (formValidated) {
									addReferral({
										name,
										email,
										date: date?.toDateString(),
									});
								} else {
									alert("✍️ Please fill out the form first");
								}
							}}
						>
							<ReferralCodeText>I have a referral code</ReferralCodeText>
						</ReferralButton>

						<MainButtonContainer>
							<MainButton
								text="Next"
								disabled={!formValidated}
								onPress={() =>
									submit({ name, email, date: date?.toDateString() })
								}
							/>
						</MainButtonContainer>

						<LoginButton
							onPress={() =>
								router.push({
									pathname: "/phone_login/phoneNumberRequest",
								})
							}
						>
							<LoginButtonText>
								Already have an account? Login here
							</LoginButtonText>
						</LoginButton>
					</PaddedContainer>
				</KeyboardAwareScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

const MainButtonContainer = styled.View`
	padding-top: 30px;
`;

const LoginButton = styled.TouchableOpacity`
	padding-top: 30px;
`;

const ReferralButton = styled.TouchableOpacity``;

const ReferralCodeText = styled.Text`
	color: #8e4dff;
	font-family: Jost_400Regular;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 33px;
	text-decoration: underline;
	text-decoration-color: #8e4dff;
`;

const LoginButtonText = styled.Text`
	color: #8e4dff;
	font-family: Jost_400Regular;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 33px;
	text-align: center;
`;

export default CreateProfile;
