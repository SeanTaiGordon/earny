import React from "react";
import styled from "styled-components/native";
import ArrowIcon from "react-native-bootstrap-icons/icons/arrow-right";

interface Props {
	text: string;
	onPress?: () => void;
	disabled?: boolean;
}

export const MainButton = ({ text, onPress, disabled }: Props) => {
	return (
		<Container onPress={onPress} disabled={disabled}>
			<Title>{text}</Title>
			<ArrowIcon
				color="#FFF"
				height="32"
				width="32"
				viewBox="0 0 16 16"
				style={{ flex: 1 }}
			/>
		</Container>
	);
};

const Container = styled.TouchableOpacity<{ disabled?: boolean }>`
	padding: 14px 18px;
	flex-direction: row;
	background: ${({ disabled }) => (disabled ? "#DBC6FF" : "#8E4DFF")};
`;

const Title = styled.Text`
	flex: 1 0 0;
	color: #fff;
	font-family: Jost_400Regular;
	font-size: 19px;
	font-weight: 500;
	align-self: center;
`;
