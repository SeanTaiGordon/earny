import React, { useEffect, useState } from "react";
import {
	FormCheckboxLabelInput,
	FormTextInput,
	PaddedContainer,
	ScreenContainer,
	Title,
} from "../components/base";
import {
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
			<KeyboardAwareScrollView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<PaddedContainer>
						<Title>📝 Let’s create your profile</Title>
						<EmojiScrollSelector
							selectorColor={selectedColor}
							getSelectedIcon={selectedIcon}
							onIconSelect={setSelectedIcon}
						/>
						<ColorScrollSelector
							onColorChange={setSelectedColor}
							getColor={selectedColor}
						/>
						<FormTextInput
							placeholder="Full name*"
							autoComplete="given-name"
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

						<CheckboxContainer>
							<FormCheckboxLabelInput
								label={"Email me about my applications"}
								defaultTrue
							/>
							<FormCheckboxLabelInput
								label={"Phone me about my applications"}
								defaultTrue
							/>
							<FormCheckboxLabelInput
								label={"Agree to privacy policy"}
								defaultTrue
							/>
						</CheckboxContainer>

						<MainButton
							text="Next"
							disabled={!formValidated}
							onPress={submit}
						/>
					</PaddedContainer>
				</ScrollView>
			</KeyboardAwareScrollView>
		</ScreenContainer>
	);
};

const CheckboxContainer = styled.View`
	padding-top: 10px;
	padding-bottom: 30px;
`;

export default Home;
