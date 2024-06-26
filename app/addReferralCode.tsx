import React, { useState } from "react";
import {
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
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddReferralCode = () => {
	const { emoji, color, name, email, date } = useLocalSearchParams();
	const [referralCode, setReferralCode] = useState<string>("");

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<KeyboardAwareScrollView>
					<ScrollView showsVerticalScrollIndicator={false}>
						<PaddedContainer>
							<NavBackButton onPress={() => router.back()} />
							<Title>👯 Referral code </Title>
							<Subtitle>
								If your friend has pointed you our way, enter their referral
								code.
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
					</ScrollView>
				</KeyboardAwareScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

const MainButtonContainer = styled.View`
	padding-top: 30px;
`;

export default AddReferralCode;
