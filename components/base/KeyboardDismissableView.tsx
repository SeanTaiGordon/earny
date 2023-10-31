import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const KeyboardDismissableView = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
