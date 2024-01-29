import React from "react";
import {
	PaddedContainer,
	ScreenContainer,
	Title,
	NavBackButton,
	Subtitle,
} from "../components";
import { ScrollView, Share } from "react-native";
import styled from "styled-components/native";
import ShareIcon from "react-native-bootstrap-icons/icons/box-arrow-in-up";
import { gql, useQuery } from "@apollo/client";

const USER_QUERY_SELF = gql`
	query Self {
		self {
			referral {
				referrer
				referralCode
			}
		}
	}
`;

export const ReferUser = () => {
	const userQuery = useQuery(USER_QUERY_SELF);
	const { referrer, referralCode } = userQuery.data?.self?.referral || {};

	return (
		<ScreenContainer>
			<ScrollView showsVerticalScrollIndicator={false}>
				<PaddedContainer>
					<NavBackButton />
					<Title>Refer a user</Title>
					<Subtitle>
						Earning and learning is better with friends! For each user you sign
						up, you can earn a referral bonus once both you and your friend have
						completed at least one shift.
					</Subtitle>
					<Padding />
					{referrer && <Subtitle>You joined with a referral code.</Subtitle>}
				</PaddedContainer>
				<PaddedContainer>
					<FilledContainer>
						<Title>Share your referral code</Title>
						<WhiteFilledContainer>
							<GreyTitle>{referralCode || "------"}</GreyTitle>
							<ShareButton
								onPress={() =>
									Share.share({
										message:
											"Flexibly earn money on your own terms. Sign up with my referral code XXX to get started.",
									})
								}
							>
								<ShareIcon
									color="#fff"
									height="28"
									width="28"
									viewBox="0 0 16 16"
								/>
							</ShareButton>
						</WhiteFilledContainer>
					</FilledContainer>
				</PaddedContainer>
			</ScrollView>
		</ScreenContainer>
	);
};

const FilledContainer = styled.View`
	background: #dbc6ff;
	padding: 20px;
	border-radius: 15px;
	padding-top: 0px;
`;

const Padding = styled.View`
	padding-top: 20px;
`;

const ShareButton = styled.TouchableOpacity`
	background: #8e4dff;
	padding: 10px;
	border-radius: 15px;
	margin-left: 10px;
	flex-direction: row;
	align-items: center;
	align-content: center;
`;

const GreyTitle = styled(Title)`
	color: #636363;
	flex-grow: 1;
	text-align: center;
`;

const WhiteFilledContainer = styled.View`
	background: #fff;
	padding: 20px;
	border-radius: 15px;
	display: flex;
	flex-direction: row;
`;

export default ReferUser;
