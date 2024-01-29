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
} from "../components";
import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const AddReferralCode = () => {
	const { emoji, color, name, email, date } = useLocalSearchParams();
	const [referralCode, setReferralCode] = useState<string>("");

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<PaddedContainer>
					<NavBackButton onPress={() => router.back()} />
					<Title>👯 Referral code </Title>
					<Subtitle>
						If your friend has pointed you our way, enter their referral code.
					</Subtitle>

					<View>
						<FormTextInput
							placeholder="Referral code"
							onChangeText={setReferralCode}
						/>
					</View>

					<MainButtonContainer>
						<MainButton
							text="Confirm"
							onPress={() => {
								router.push({
									pathname: "/phone_auth/phoneNumberRequest",
									params: {
										emoji,
										color,
										name,
										email,
										date,
										referralCode,
									},
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

export default AddReferralCode;
