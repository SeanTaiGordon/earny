import styled from "styled-components/native";
import React, { ReactNode } from "react";

interface Props {
	onPress?: () => void;
	children?: ReactNode;
	centered?: boolean;
}

export const Profile = ({ onPress, children, centered = false }: Props) => {
	return (
		<Container centered={centered}>
			<ProfilePlaceholder
				onPress={onPress}
				children={children}
				centered={centered}
			/>
		</Container>
	);
};

const Container = styled.View<{ centered: boolean }>`
	display: flex;
	padding: 30px ${({ centered }) => (centered ? "0" : "30")}px 57px 0px;
`;

const ProfilePlaceholder = styled.TouchableOpacity<{ centered: boolean }>`
	width: 70px;
	height: 70px;
	background: #d9d9d9;
	border-radius: 50%;
	display: flex;
	align-self: ${({ centered }) => (centered ? "center" : "flex-end")};
`;
