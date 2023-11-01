import React, { useEffect, useState } from "react";
import {
	FormCheckboxLabelInput,
	FormTextInput,
	KeyboardDismissableView,
	PaddedContainer,
	ScreenContainer,
	Title,
	ColorScrollSelector,
	EmojiScrollSelector,
	MainButton,
} from "../components";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { DatePicker } from "../components/DatePicker";
import { router } from "expo-router";

export const Home = () => {
	const [selectedColor, setSelectedColor] = useState<String>("#d9d9d9");
	const [selectedIcon, setSelectedIcon] = useState<String>("🧑‍💻");
	const [date, setDate] = useState<Date>();
	const [name, onChangeName] = useState<string>("");
	const [email, onChangeEmail] = useState<string>("");
	const [formValidated, setFormValidate] = useState<boolean>(false);

	const submit = () => {
		console.log(date);
		router.push({
			pathname: "/phone_auth/phoneNumberRequest",
		});
	};

	useEffect(() => {
		// Update form validation
		if (name.length > 1 && email.length > 1 && date) {
			setFormValidate(true);
		} else {
			setFormValidate(false);
		}
	}, [name, email, date]);

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<KeyboardAwareScrollView>
					<ScrollView showsVerticalScrollIndicator={false}>
						<PaddedContainer>
							<Title>📝 Let’s create your profile</Title>
							<EmojiScrollSelector
								selectorColor={selectedColor}
								getSelectedIcon={selectedIcon}
								onIconSelect={setSelectedIcon}
								getColor={selectedColor}
							/>
							<ColorScrollSelector
								onColorChange={setSelectedColor}
								getColor={selectedColor}
							/>
							<FormTextInput
								placeholder="Full name*"
								autoComplete="name"
								inputMode="text"
								onChangeText={(text) => onChangeName(text)}
								value={name}
							/>
							<DatePicker getDate={(date) => setDate(date)} />
							<FormTextInput
								placeholder="Email*"
								autoComplete="email"
								inputMode="email"
								keyboardType="email-address"
								onChangeText={(text) => onChangeEmail(text)}
								value={email}
							/>

							<MainButtonContainer>
								<MainButton
									text="Next"
									disabled={!formValidated}
									onPress={submit}
								/>
							</MainButtonContainer>
						</PaddedContainer>
					</ScrollView>
				</KeyboardAwareScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

const MainButtonContainer = styled.View`
	padding-top: 30px;
`;

export default Home;
