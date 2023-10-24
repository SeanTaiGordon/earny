import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
	label: string;
}

export const FormCheckboxLabelInput = ({ label }: Props) => {
	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	return (
		<View>
			<CheckBox
				disabled={false}
				value={toggleCheckBox}
				onValueChange={(newValue) => setToggleCheckBox(newValue)}
			/>
			<Label>{label}</Label>
		</View>
	);
};

const Label = styled.Text`
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 14px;
	font-family: Jost_400Regular;
	border-radius: 10px;
`;
