import React from "react";
import styled from "styled-components/native";
import TickIcon from "react-native-bootstrap-icons/icons/check2";

interface Props {
	title: string;
	onPress?: () => void;
	backgroundColor?: string;
	selected?: boolean;
}

export const SelectableButton = ({
	title,
	onPress,
	backgroundColor,
	selected,
}: Props) => {
	return (
		<Container onPress={onPress} backgroundColor={backgroundColor}>
			<Header>
				<Title>{title}</Title>
			</Header>
			{selected && (
				<TickIcon color="#000" height="20" width="20" viewBox="0 0 16 16" />
			)}
		</Container>
	);
};

const Container = styled.TouchableOpacity<{ backgroundColor?: string }>`
	display: flex;
	padding: 10px 14px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 17px;
	align-self: stretch;
	border-radius: 10px;
	background-color: ${({ backgroundColor }) => backgroundColor || "#eaeaea"};
`;

const Header = styled.View`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: center;
`;

const Title = styled.Text`
	display: flex;
	justify-content: center;
	color: #000;
	font-family: Jost_400Regular;
	font-size: 17px;
	font-weight: 400;
`;
