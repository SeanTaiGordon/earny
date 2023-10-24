import styled from "styled-components/native";
import React from "react";

interface Props {
	onPress?: () => void;
}

const Profile = ({ onPress }: Props) => {
	return (
		<Container>
			<ProfilePlaceholder onPress={onPress} />
		</Container>
	);
};

const Container = styled.View`
	display: flex;
	padding: 50px 0px 20px 0px;
	justify-content: flex-end;
	align-items: flex-start;
	align-self: stretch;
`;

const ProfilePlaceholder = styled.TouchableOpacity`
	width: 60px;
	height: 60px;
	background: #d9d9d9;
	border-radius: 50%;
	display: flex;
	margin-left: auto;
`;

export default Profile;
