import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { Subtitle, Title } from "./base";

interface Props {
	filled: boolean;
	text?: String;
	title?: String;
	button?: ReactNode;
}

export const MainScreenProgressContainer = ({
	filled,
	title,
	text,
	button,
}: Props) => {
	return (
		<Container filled={filled}>
			<Title>{title}</Title>
			<Text purple={filled}>{text}</Text>
			{button}
		</Container>
	);
};

const Container = styled.View<{ filled: boolean }>`
	border-color: #8e4dff;
	border-width: ${({ filled }) => (filled ? "0px" : "4px")};
	border-radius: 15px;
	padding: 20px;
	background: ${({ filled }) => (filled ? "#dbc6ff" : "#fff")};
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
