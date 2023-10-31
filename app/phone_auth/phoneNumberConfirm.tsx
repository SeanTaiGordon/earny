import React from "react";
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
import styled from "styled-components/native";
import ArrowRepeatIcon from "react-native-bootstrap-icons/icons/arrow-repeat";
import { router } from "expo-router";

const data: { label: String; value: String }[] = [
	{ label: "🇬🇧 +44", value: "44" },
	{ label: "🇮🇪 +353", value: "353" },
];

const PhoneNumberConfirm = () => (
	<ScreenContainer>
		<KeyboardDismissableView>
			<PaddedContainer>
				<NavBackButton />
				<Title>☎️ Check your phone </Title>
				<Subtitle>We just texted you a confirmation code.</Subtitle>

				<Container>
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
				</Container>

				<MainButton
					text="Confirm"
					onPress={() => {
						router.push({
							pathname: "page2",
						});
					}}
				/>
			</PaddedContainer>
		</KeyboardDismissableView>
	</ScreenContainer>
);

const Container = styled.View`
	margin-top: 50px;
	margin-bottom: 50px;
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

export default PhoneNumberConfirm;
