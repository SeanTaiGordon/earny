import React from "react";
import styled from "styled-components/native";

interface Props {
	title: string;
	onPress?: () => void;
	Icon: any;
}

export const Button = ({ title, onPress, Icon }: Props) => {
	return (
		<Container onPress={onPress}>
			<Icon color="#000" height="20" width="20" viewBox="0 0 16 16" />

			<Header>
				<Title>{title}</Title>
			</Header>
		</Container>
	);
};

const Container = styled.TouchableOpacity`
	display: flex;
	padding: 14px 18px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 17px;
	align-self: stretch;
	border-radius: 10px;
	background-color: #eaeaea;
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
	font-size: 19px;
	font-weight: 400;
`;
