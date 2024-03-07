import React, { useCallback } from "react";
import {
	Button,
	KeyboardDismissableView,
	MainScreenProgressContainer,
	PaddedContainer,
	Profile,
	ScreenContainer,
	Subtitle,
	Title,
} from "../components";
import styled from "styled-components/native";
import { RefreshControl, ScrollView } from "react-native";
import { router } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import CameraIcon from "react-native-bootstrap-icons/icons/camera-reels-fill";

const USER_QUERY_SELF = gql`
	query Self {
		self {
			profile {
				emoji
				color
			}
		}
	}
`;

const Main = () => {
	const userQuery = useQuery(USER_QUERY_SELF);

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
						<MainScreenProgressContainer>
							<Title>One last thing...</Title>
							<Text centered>
								Record a short clip answering the question{" "}
								<Text bold>
									"Would you choose a beach, city or mountain break- and why?"
								</Text>
							</Text>
							<Button
								title="Record a video"
								Icon={CameraIcon}
								onPress={() => {
									router.push({
										pathname: "/recordVideo",
									});
								}}
							/>
						</MainScreenProgressContainer>

						<DottedLine />

						<MainScreenProgressContainer filled>
							<Title>Matching you with a job...</Title>
							<CenterEmoji>🔎</CenterEmoji>
							<Text centered purple>
								We'll keep you updated! This can take up to a few days.
							</Text>
						</MainScreenProgressContainer>

						<DottedLine />

						<MainScreenProgressContainer filled>
							<Title>Next step: matched</Title>
							<Text purple>
								Once we find the perfect job match for you, we'll send you a
								notification and you can decide to see whether it's a good fit!
							</Text>
						</MainScreenProgressContainer>

						<DottedLine />

						<MainScreenProgressContainer filled={true}>
							<Title>Take it or leave it</Title>
							<Text purple>
								You'll have the option to take the opportunity or leave it for
								someone else.
							</Text>
						</MainScreenProgressContainer>
					</PaddedContainer>
				</ScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

export default Main;

const CenterEmoji = styled(Subtitle)`
	text-align: center;
`;

const Text = styled(Subtitle)<{
	centered?: boolean;
	purple?: boolean;
	bold?: boolean;
}>`
	text-align: ${({ centered }) => (centered ? "center" : "left")};
	margin-top: 10px;
	margin-bottom: 30px;
	${({ purple }) => purple && "color: #8e4dff;"};
	${({ bold }) => bold && "font-family:Jost_500Medium;"};
`;

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
