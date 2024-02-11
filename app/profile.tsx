import React from "react";
import {
	ScreenContainer,
	NavBackButton,
	PaddedContainer,
	Profile as ProfileComponent,
	Title,
	Button,
} from "../components";
import { auth } from "../config";
import { router, useFocusEffect } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import LogoutIcon from "react-native-bootstrap-icons/icons/box-arrow-right";
import SettingsIcon from "react-native-bootstrap-icons/icons/gear-fill";
import ReferralIcon from "react-native-bootstrap-icons/icons/person-plus";
import { ScrollView } from "react-native";

const USER_QUERY_SELF = gql`
	query Query {
		self {
			dateOfBirth
			email
			fullName
			phone {
				areaCode
				phoneNumber
			}
			profile {
				emoji
				color
			}
			customerSlider
			availableHoursPerWeek
		}
	}
`;

export const Profile = () => {
	const { data, refetch } = useQuery(USER_QUERY_SELF);

	const {
		dateOfBirth,
		email,
		fullName,
		phone,
		profile,
		customerSlider,
		availableHoursPerWeek,
	} = data?.self || {};

	const { emoji, color } = profile || {};

	useFocusEffect(() => {
		refetch();
	});

	return (
		<ScreenContainer>
			<ScrollView showsVerticalScrollIndicator={false}>
				<PaddedContainer>
					<NavBackButton />
					<Title>Your profile</Title>
					<ProfileComponent centered>
						<Item background={color}>
							<ProfileText>{emoji}</ProfileText>
						</Item>
					</ProfileComponent>
					<SecondaryHeader>
						<Bold>{fullName}</Bold>
					</SecondaryHeader>
					<SecondaryHeader>📬 {email}</SecondaryHeader>
					<SecondaryHeader>
						📞 +{phone?.areaCode} {phone?.phoneNumber}
					</SecondaryHeader>
					<SecondaryHeader>
						🎂 {dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}
					</SecondaryHeader>

					<PaddedContainer>
						{availableHoursPerWeek && (
							<SecondaryHeader>
								I have time to work <Bold>{availableHoursPerWeek}</Bold> hours
								per week.
							</SecondaryHeader>
						)}
						{customerSlider !== null && (
							<SecondaryHeader>
								{
									{
										0: (
											<>
												I'm <Bold>not fond</Bold> of customer facing roles
											</>
										),
										50: (
											<>
												I'm <Bold>indifferent</Bold> to customer facing roles
											</>
										),
										100: (
											<>
												I <Bold>enjoy</Bold> customer facing roles
											</>
										),
									}[
										customerSlider as keyof {
											0: JSX.Element;
											50: JSX.Element;
											100: JSX.Element;
										}
									]
								}
							</SecondaryHeader>
						)}
					</PaddedContainer>
					<Button
						title={"Modify preferences"}
						onPress={() =>
							router.push({
								pathname: "/preferredRoles",
								params: {
									initialHoursSliderValue: availableHoursPerWeek,
									initialCustomerFacingSliderValue: customerSlider,
								},
							})
						}
						Icon={SettingsIcon}
					/>

					<Container>
						<Button
							title={"Refer someone"}
							onPress={() =>
								router.push({
									pathname: "/referUser",
								})
							}
							Icon={ReferralIcon}
						/>
					</Container>
				</PaddedContainer>
				<PaddedContainer>
					<Button
						title={"Logout"}
						onPress={() =>
							auth.signOut().then(() => {
								router.back();
							})
						}
						Icon={LogoutIcon}
					/>
				</PaddedContainer>
			</ScrollView>
		</ScreenContainer>
	);
};

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
	border-radius: 35px;
`;

const SecondaryHeader = styled.Text`
	text-align: center;
	font-family: Jost_400Regular;
	font-size: 18px;
	font-weight: 400;
`;

const Bold = styled.Text`
	font-family: Jost_500Medium;
`;

const Container = styled.View`
	padding-top: 30px;
	padding-bottom: 30px;
`;

export default Profile;
