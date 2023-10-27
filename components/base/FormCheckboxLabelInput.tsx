import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import styled from "styled-components/native";

interface Props {
	label: string;
	defaultTrue?: boolean;
}

export const FormCheckboxLabelInput = ({
	label,
	defaultTrue = false,
}: Props) => {
	const [toggleCheckBox, setToggleCheckBox] = useState(defaultTrue);
	return (
		<Container>
			<Checkbox
				color="#8e4dff"
				disabled={false}
				value={toggleCheckBox}
				onValueChange={(newValue) => setToggleCheckBox(newValue)}
			/>
			<Label>{label}</Label>
		</Container>
	);
};

const Label = styled.Text`
	padding-left: 10px;
	font-size: 14px;
	font-family: Jost_400Regular;
	color: #676767;
`;

const Container = styled.View`
	flex: 1;
	flex-direction: row;
	padding-top: 10px;
	padding-bottom: 10px;
`;
