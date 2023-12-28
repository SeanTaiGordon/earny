import React, { useContext } from "react";
import {
	ScreenContainer,
	AddButton,
	NavBackButton,
	EmojiScrollSelector,
	ColorScrollSelector,
	PaddedContainer,
	Subtitle,
	Profile as ProfileComponent,
	Title,
	Button,
} from "../components";
import { auth } from "../config";
import { router } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import LogoutIcon from "react-native-bootstrap-icons/icons/box-arrow-right";

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
	const { data } = useQuery(USER_QUERY_SELF);
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

	return (
		<ScreenContainer>
			<PaddedContainer>
				<NavBackButton />
				<Title>Your profile</Title>
				<ProfileComponent centered>
					<Item background={color}>
						<ProfileText>{emoji}</ProfileText>
					</Item>
				</ProfileComponent>
				<SecondaryHeader>{fullName}</SecondaryHeader>
				<SecondaryHeader>{email}</SecondaryHeader>
				<SecondaryHeader>
					+{phone?.areaCode} {phone?.phoneNumber}
				</SecondaryHeader>
				<SecondaryHeader>
					{dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}
				</SecondaryHeader>
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
		</ScreenContainer>
	);
};

const ProfileText = styled.Text`
	font-size: 40px;
`;

const Item = styled.View<{ background }>`
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

const SecondaryHeader = styled.Text`
	text-align: center;
	font-family: Jost_400Regular;
	font-size: 18px;
	font-weight: 400;
`;

export default Profile;
