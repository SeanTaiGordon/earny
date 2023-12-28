import React from "react";
import AddIcon from "react-native-bootstrap-icons/icons/plus-lg";
import { Button } from "./Button";

interface Props {
	title: string;
	onPress?: () => void;
}

export const AddButton = ({ title, onPress }: Props) => {
	return <Button title={title} onPress={onPress} Icon={AddIcon} />;
};
