import React, { useCallback } from "react";
import {
	Button,
	KeyboardDismissableView,
	MainScreenProgressContainer,
	PaddedContainer,
	Profile,
	ScreenContainer,
} from "../components";
import styled from "styled-components/native";
import { RefreshControl, ScrollView } from "react-native";
import { router } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import CameraIcon from "react-native-bootstrap-icons/icons/camera-reels-fill";
import { ACCOUNT_SETUP_STATUS } from "../constants";

const USER_QUERY_SELF = gql`
	query Self {
		self {
			profile {
				emoji
				color
			}
			accountSetupStatus
			videoUrl
		}
	}
`;

const Main = () => {
	const userQuery = useQuery(USER_QUERY_SELF);

	const { accountSetupStatus, videoUrl } = userQuery.data?.self || {};
	const { color, emoji } = userQuery.data?.self?.profile || {};
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		userQuery.refetch().then(() => {
			setRefreshing(false);
		});
	}, []);

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<Profile
						onPress={() => {
							router.push({
								pathname: "profile",
							});
						}}
					>
						<Item background={color}>
							<ProfileText>{emoji}</ProfileText>
						</Item>
					</Profile>

					<PaddedContainer>
						<MainScreenProgressContainer
							title="One last thing..."
							text={
								"Record a short clip answering the question - 'Would you choose a beach, city or mountain break- and why?'"
							}
							button={
								<Button
									title={videoUrl ? "Re-record video" : "Record a video"}
									Icon={CameraIcon}
									onPress={() => {
										router.push({
											pathname: "/recordVideo",
										});
									}}
								/>
							}
							filled={
								accountSetupStatus !== null &&
								accountSetupStatus !== ACCOUNT_SETUP_STATUS.RECORD_VIDEO
							}
						/>

						<DottedLine />
						<MainScreenProgressContainer
							title="Matching you with a job..."
							text="🔎 We'll keep you updated! This can take up to a few days."
							filled={accountSetupStatus !== ACCOUNT_SETUP_STATUS.JOB_MATCHING}
						/>

						<DottedLine />

						<MainScreenProgressContainer
							title="Next step: matched"
							text="Once we find the perfect job match for you, we'll send you a notification and you can decide to see whether it's a good fit!"
							filled={accountSetupStatus !== ACCOUNT_SETUP_STATUS.INTERVIEWING}
						/>
						<DottedLine />

						<MainScreenProgressContainer
							title="Take it or leave it"
							text="You'll have the option to take the opportunity or leave it for someone else."
							filled={accountSetupStatus !== ACCOUNT_SETUP_STATUS.COMPLETE}
						/>
					</PaddedContainer>
				</ScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

export default Main;

const DottedLine = styled.View`
	border-style: dotted;
	border-width: 5px;
	height: 50px;
	width: 2px;
	border-color: #dbc6ff;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const ProfileText = styled.Text`
	font-size: 40px;
`;

const Item = styled.View<{ background: string }>`
	background-color: ${({ background }) => background};
	margin-left: 5px;
	margin-right: 5px;
	width: 70px;
	height: 70px;
	align-self: center;
	align-items: center;
	justify-content: center;
	flex: 1;
	border-radius: 50%;
`;
