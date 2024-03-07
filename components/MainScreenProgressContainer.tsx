import React, { ReactNode } from "react";
import styled from "styled-components/native";

interface Props {
	filled?: Boolean;
	children?: ReactNode;
}

export const MainScreenProgressContainer = ({ filled, children }: Props) => {
	return filled ? (
		<Filled>{children}</Filled>
	) : (
		<Container>{children}</Container>
	);
};

const Container = styled.View`
	border-color: #8e4dff;
	border-width: 4px;
	border-radius: 15px;
	padding: 20px;
`;

const Filled = styled.View`
	background: #dbc6ff;
	padding: 20px;
	border-radius: 15px;
`;
