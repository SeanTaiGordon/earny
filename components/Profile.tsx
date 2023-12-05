import styled from "styled-components/native";
import React, { ReactNode } from "react";

interface Props {
	onPress?: () => void;
	children?: ReactNode;
}

export const Profile = ({ onPress, children }: Props) => {
	return (
		<Container>
			<ProfilePlaceholder onPress={onPress} children={children} />
		</Container>
	);
};

const Container = styled.View`
	display: flex;
	padding: 30px 30px 57px 0px;
	justify-content: flex-end;
	align-items: flex-start;
	align-self: stretch;
`;

const ProfilePlaceholder = styled.TouchableOpacity`
	width: 70px;
	height: 70px;
	background: #d9d9d9;
	border-radius: 50%;
	display: flex;
	margin-left: auto;
`;
