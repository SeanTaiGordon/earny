import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

interface Props {
	label: string;
	defaultTrue?: boolean;
	onChange?: (newValue: boolean) => void;
}

export const FormCheckboxLabelInput = ({
	label,
	defaultTrue = false,
	onChange,
}: Props) => {
	const [toggleCheckBox, setToggleCheckBox] = useState(defaultTrue);

	useEffect(() => {
		onChange && onChange(toggleCheckBox);
	}, [toggleCheckBox]);
	return (
		<Container
			onPress={() => {
				setToggleCheckBox(!toggleCheckBox);
			}}
		>
			<StyledCheckbox
				color="#8e4dff"
				disabled={false}
				value={toggleCheckBox}
				onValueChange={(newValue) => setToggleCheckBox(newValue)}
				style={{ width: 20 }}
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

const Container = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding-top: 20px;
	padding-bottom: 20px;
`;

const StyledCheckbox = styled(Checkbox)`
	width: 20px;
`;
