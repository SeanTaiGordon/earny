import React from "react";
import {
	FormCheckboxLabelInput,
	FormTextInput,
	PaddedContainer,
	ScreenContainer,
	Title,
} from "../components/base";
import { MainButton, NavBackButton } from "../components";
import {
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Page = () => {
	return (
		<ScreenContainer>
			<PaddedContainer>
				<KeyboardAvoidingView>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View>
							<NavBackButton />
							<ScrollView>
								<Title>📝 Let’s create your profile</Title>
								<FormTextInput placeholder="Full name*" />
								<FormTextInput placeholder="Date of birth*" />
								<FormTextInput placeholder="Email*" />
								<FormTextInput placeholder="Phone Number*" />
								<FormCheckboxLabelInput />
								<MainButton text="Next" disabled={true} />
							</ScrollView>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</PaddedContainer>
		</ScreenContainer>
	);
};

export default Page;
